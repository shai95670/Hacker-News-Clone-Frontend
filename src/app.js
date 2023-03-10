import LinksPage from './pages/linksPage/linksPage';
import LoginAndSignupForm from './pages/loginAndSignupForm/loginAndSignupForm';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <div className="App">  
      <BrowserRouter>
        <Routes>
              <Route
                path="/"
                element={<Navigate replace to="/new/1" />}
              />
              <Route
                path="/new/:page"
                element={<LinksPage/>}
              />
              <Route path="/top" element={<LinksPage/>} />
              <Route path="/past" element={<LinksPage/>} />
              <Route path="/user" element={<LoginAndSignupForm />}></Route>
              <Route path="*" element={<img src='https://i.pinimg.com/originals/b4/27/04/b427046d658034d58c3f866efa6cf467.gif' className='m-auto' alt='hackernews'></img>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
