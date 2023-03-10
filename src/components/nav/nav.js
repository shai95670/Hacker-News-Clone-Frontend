import React from 'react';
import { Link, useNavigate  } from 'react-router-dom';


const Nav = () => {
  
  const navigate = useNavigate();
  const apiKey = localStorage.getItem('apiKey');
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className='nav-container flex flex-wrap gap-3 p-2 mb-2 bg-[#ff6600] justify-between'>
      <div>
        <Link to="/" className='flex gap-2'>
          <img className='site-icon-img border-2 border-white' src="https://news.ycombinator.com/y18.gif" alt='hackernews'/>
          <h3 className='font-bold'>Hacker News</h3>
        </Link> 
      </div>
      <ul className='flex flex-wrap gap-4 mr-4'>
        <Link to="/">New</Link> 
        |
        <Link to="/top">Top</Link> 
        |
        <Link to="/past">Past</Link> 
        {
          apiKey ? (
            <>
                |
                <Link to="/user" onClick={() => {
                      localStorage.removeItem('apiKey');
                      localStorage.removeItem('user');
                      navigate('/user');
                    }}>
                    Logout
                </Link>
                |
                <li><span>{user.email}</span></li>
            </>
          ) : (
            <>
              |
              <Link to="/user">
                  <li>
                    Login
                  </li>
              </Link>
            </>
          )
        }
      </ul>
    </div>
  );
};

export default Nav;