import { useEffect, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import './loginAndSignupForm.css';
import { LOGIN_MUTATION, SIGNUP_MUTATION } from '../../constants/gql';

const LoginAndSignupForm = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);
    
    const [userFormState, setUserFormState] = useState({
      email: '',
      password: ''
    });
    const navigate = useNavigate();

    const variables = {
      email: userFormState.email,
      password: userFormState.password  
    };

    const [login] = useMutation(LOGIN_MUTATION, { variables }); 
    const [signup] = useMutation(SIGNUP_MUTATION, { variables }); 
    const [errorMessage, setErrorMessage] = useState("");

    const handleSetUserFormState = (e) => {
      setUserFormState({
        ...userFormState,
        [e.target.name]: e.target.value
      })
    };

    const handleLoginOrSignup = async (e) => {
      e.preventDefault();
      if(!userFormState.email || !userFormState.password) {
        return;
      };
      const actionToRun = isLoginForm ? login : signup;
      const fieldName = isLoginForm ? 'login' : 'signup';

      try {
        const response = await actionToRun();
        const { token, user } = response.data[fieldName];
        localStorage.setItem("apiKey", token);
        localStorage.setItem("user", JSON.stringify(user));
        navigate('/');
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    const handleFormChange = (type) => {
      (type === 'login') ? setIsLoginForm(true) : setIsLoginForm(false);
      document.getElementById("login-form").reset();
    };

    useEffect(() => {
      setUserFormState({...userFormState, ...{ email: "", password: "" }});
      setErrorMessage("");
    }, [isLoginForm])

    return (
      <div className="login-body">
          <form className="login-form" id='login-form' onSubmit={handleLoginOrSignup}>
            <h1 className='form-title'>
            {
              isLoginForm ? 'Signin To Hacker News' : 'Signup To Hacker News'
            }
            </h1>
            <input className='form-input' type="text" placeholder="Email or username" onChange={handleSetUserFormState} name="email"></input>
            <input className='form-input' type="password" placeholder="Password" onChange={handleSetUserFormState} name="password"></input>
            {
              errorMessage && (
                <p className='flex items-center gap-2'>
                  <svg aria-hidden="true" className="stUf5b LxE1Id" fill="currentColor" focusable="false" width="16px" height="16px" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
                  </svg>
                  {errorMessage}
                </p>
              )
            }
            <button className='form-button' type='submit'>
            {
              isLoginForm ? 'Sign in' : 'Sign up'
            }
            </button>
            {
              isLoginForm ? 
              (<p className='font-semibold'>Still not signeup to hackernews? <a href="#" className='underline' onClick={() => handleFormChange('signup')}>Signup here</a></p>)
              :
              (<p className='font-semibold'>Already signedup to hackernews? <a href="#" className='underline' onClick={() => handleFormChange('login')}>Got To Login</a></p>)
            }
          </form>
      </div>
    );
  }
  
  export default LoginAndSignupForm;
  