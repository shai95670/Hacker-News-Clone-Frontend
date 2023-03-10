import React, {useEffect, useMemo, useState} from 'react';
import { useQuery } from '@apollo/client';
import debouce from "lodash.debounce";
import { useLocation } from "react-router-dom";
import { LINKS_PER_PAGE } from '../../constants/constants';
import { GET_LINKS_QUERY } from '../../constants/gql';
import { useGetPageNumber } from '../../utils/pageNumber';
import PagnationButton from '../pagnationButton/pagnationButton';
import CreateLinkModal from '../createLinkModal/createLinkModal';
import Link from '../link/link';
import Filter from '../filter/filter';

const getQueryVariables = (isNewPage, page) => {
  if(!isNewPage) {
    return { skip: 0, take: 100 }
  };
  return { skip: (page - 1) * LINKS_PER_PAGE, take: LINKS_PER_PAGE };
};

const LinkList = () => {
  const location = useLocation();
  const page = useGetPageNumber();
  const [isShowModal, setIsShowModal] = useState(false);
  const isNewPage = location.pathname.includes('new');

  const { loading, error, data, refetch } = useQuery(
    GET_LINKS_QUERY,
    { 
      variables: getQueryVariables(isNewPage, page),
      fetchPolicy: 'cache-and-network',
      onCompleted: (data) => {localStorage.setItem('totalPages', Math.ceil(data.getLinks.linksCount/LINKS_PER_PAGE))}
    }
  );

  const handleChange = (e) => {
    refetch({filter: e.target.value});
  };

  const debouncedResults = useMemo(() => {
    return debouce(handleChange, 300);
  }, []);

  const getSortedLinks = (links) => {
    if(location.pathname.includes('top')) {
       return links.sort((previousLink, currentLink) => currentLink.voters.length - previousLink.voters.length);
    };
    if(location.pathname.includes('past')) {
       return links.sort((previousLink, currentLink) => currentLink.createdAt- previousLink.createdAt);
    };
  };

  const getLinksToRender = (links) => {
    let linksCopy = [...links];
    if(!isNewPage) {
      return getSortedLinks(linksCopy);
    };
    return linksCopy;
  };

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  if (loading) return <div className='text-center'>Loading...</div>;
  if (error) return <div>{`Sorry something went wrong ${error}`}</div>;

  const isShowPagnationButtons = isNewPage && page <= parseInt(localStorage.getItem('totalPages'));
  const isNextButtonActive = Math.ceil(data.getLinks.linksCount/LINKS_PER_PAGE) <= page;

  return (
    <>
      <Filter debouncedResults={debouncedResults}/>
      <div className='border-b-2 border-gray-300'></div>
      <button className='rounded font-bold bg-[#ff6600] w-28 mr-2 self-end' onClick={() => { setIsShowModal(true) }}>Create Link</button>
      { 
        getLinksToRender(data.getLinks.links).map((link, index) => <Link key={link.id} link={link} id={index + 1}/>)
      }
      {
        isShowPagnationButtons && (
          <div className='ml-2 flex gap-3 mt-3 mb-3'>
              <PagnationButton 
              isButtonActive={page === 1}
              name={'Prev'}
              page={page}
              />
              <PagnationButton 
              isButtonActive={isNextButtonActive}
              name={'Next'}
              page={page}
              />
          </div>
        )
      }
      <CreateLinkModal isShowModal={isShowModal} setIsShowModal={setIsShowModal}/>
    </>
  );
};

export default LinkList;