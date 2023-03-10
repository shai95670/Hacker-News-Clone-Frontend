import React from 'react';
import { timeAgo } from '../../utils/time';
import { useMutation } from '@apollo/client';
import { VOTE_MUTATION } from '../../constants/gql';

const Link = (props) => {
  const { link, id } = props;
  const [voteByLinkId] = useMutation(
    VOTE_MUTATION,
    { 
      variables: { voteByLinkIdId: link.id }
    }
  );
  
  const apiKey = localStorage.getItem('apiKey');

  return (
    <div className='link-container flex flex-col text-[#9a9a9a] text-[0.8rem]'>
      <div className='flex flex-row ml-2 items-center gap-1'>
        {`${id}.`}
        {
          apiKey && (<span className='upvote cursor-pointer' onClick={() => voteByLinkId()}>▲</span>)
        }
        <span className='description text-black text-[1rem]'>{link.description} </span>
        ({link.url})
      </div>
      <div className='flex flex-row ml-[1.3rem]'>
        <p className='flex text-left'>{`${link.voters.length} points | by ${link.postedBy?.email}, posted at: ${timeAgo(link.createdAt)}`}</p>
      </div>
    </div>
  );
};

export default Link;