import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
// import AllPublicQuizes from './components/pages/AllPublicQuizes';
import Footer from "./components/layout/Footer";
import Dashboard from './components/pages/Dashboard';
import QuizEditor from './components/pages/QuizEditor';
import QuizPreview from './components/pages/QuizPreview';
import ActiveQuiz from './components/pages/ActiveQuiz';
import QuizWipState from './context/QuizWip/QuizWipState';
import QuizPublicState from './context/QuizPublic/QuizPublicState';
import UserInfoState from './context/UserInfo/UserInfoState';
import AllPublicQuizesState from './context/AllPublicQuizes/AllPublicQuizesState';

function App() {
  return (
    <UserInfoState>
      <AllPublicQuizesState>
          <QuizPublicState>
            <QuizWipState>
              <Router >
                <Fragment>
                  <Navbar />
                    <div className="container">
                      <Routes>
                        <Route path="/" element= {<Home />}/>
                        <Route path="/login" element= {<Login />}/>
                        <Route path="/Register" element= {<Register />}/>
                        {/* <Route path="/AllPublicQuizes" element= {<AllPublicQuizes />}/> */}
                        <Route path="/Dashboard" element= {<Dashboard />}/>
                        <Route path="/QuizEditor/:quizName/:isPub" element= {<QuizEditor />}/>
                        <Route path="/QuizPreview/:quizName/:isPub" element= { <QuizPreview />}/> 
                        <Route path="/ActiveQuiz/:quizName" element= { <ActiveQuiz />}/> 
                      </Routes>
                    </div>
                  <Footer />
                </Fragment>
              </Router>
            </QuizWipState>
          </QuizPublicState>
      </AllPublicQuizesState>
    </UserInfoState>
  )
};

export default App;
