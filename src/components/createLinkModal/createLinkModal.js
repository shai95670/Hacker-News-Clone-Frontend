import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { CREATE_LINK_MUTATION } from '../../constants/gql';
import './createLinkModal.css';

const CreateLinkModal = ({ isShowModal, setIsShowModal }) => {
  const [formState, setFormState] = useState({
    description: "",
    url: ""
  });

  const navigate = useNavigate();

  const [errorObject, setErrorObject] = useState({ isError: false, message: "" });

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      description: formState.description,
      url: formState.url  
    },
    onCompleted: () => navigate('/'),
    onError: (error) => setErrorObject({ isShow: true, message: error.message })
  });

  const handleSetFormState = (e) => {
    setFormState({
        ...formState,
        [e.target.name]: e.target.value
    });
  };

  const handleModalClosingActions = () => {
    setFormState({ description: "", url: "" });
    setErrorObject({ isError: false, message: "" });
    setIsShowModal(false);
  };
  
  return (
    <>
        <div className={`modal-overlay ${isShowModal ? '' : 'closed'}`} id="modal-overlay" onClick={handleModalClosingActions}></div>

        <div className={`modal ${isShowModal ? '' : 'closed'} block w-96 max-w-full h-80 max-h-full fixed z-50 top-2/4 left-2/4`}>
          <div className="modal-guts">
              <img className='site-icon-img border-2 border-white absolute top-2 right-2 w-8 h-8' src="https://news.ycombinator.com/y18.gif" alt='hackernews'/>
              <button onClick={handleModalClosingActions} className='bg-black text-white rounded px-3'>X</button>
              <form onSubmit={(e) => {
                e.preventDefault();
                createLink();
              }} className="flex flex-col gap-4 mt-6">
                <div className='flex flex-col gap-1'>
                  <label htmlFor="description" className='font-semibold'>Description:</label>
                  <input value={formState.description} type="text" name="description" placeholder='Enter a description' onChange={handleSetFormState} className='rounded p-2'/>
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="url" className='font-semibold'>Url:</label>
                  <input value={formState.url} type="text" name="url" placeholder='Enter a url' onChange={handleSetFormState} className='rounded p-2'/>
                </div>
                <button type='submit' disabled={!formState.description && !formState.url} className='bg-black	text-white rounded p-2 cursor-pointer'>Submit</button>
                {errorObject.isError && <p className="text-red-900 font-bold">{errorObject.message}</p>}     
              </form>
          </div>
        </div>
    </>
  );
};

export default CreateLinkModal;