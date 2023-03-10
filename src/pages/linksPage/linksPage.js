import React from 'react';
import Nav from '../../components/nav/nav';
import LinkList from '../../components/linkList/linkList';

const LinksPage = () => {
  return (
    <div className='w-11/12 flex flex-col m-auto gap-2 bg-[#f6f6ef] sm:w-full'>
      <Nav/>
      <LinkList/>
    </div>
  );
};

export default LinksPage;