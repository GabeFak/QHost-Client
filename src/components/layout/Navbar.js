import React, { Fragment } from 'react';
import { useContext } from 'react';
import { Link } from "react-router-dom";
import QuizWipContext from '../../context/QuizWip/QuizWipContext';
import UserInfoContext from '../../context/UserInfo/UserInfoContext';
import AuthContext from '../../context/Auth/AuthContext';
import QuizPublicContext from '../../context/QuizPublic/QuizPublicContext';

const Navbar = () => {
const authContext = useContext(AuthContext);
const { isAuthenticated, logout, user, loading } = authContext;

const userInfoContext = useContext(UserInfoContext);
const { UserInfo } = userInfoContext;

const quizContext = useContext(QuizWipContext);
const { loggedIn, clearQuizWIPS } = quizContext;

const quizPublicContext = useContext(QuizPublicContext);
const { clearQuizPub } = quizPublicContext;

const onLogout = () => {
    logout();
    clearQuizWIPS();
    clearQuizPub();
}; 

if(loading) {
    return ''
} else {
  return (
    <header className='browser-default'>
        <div className="header-logo">
            <h1>QUIZTIME</h1>
        </div>
        <div className={`header-user-name ${loggedIn ? '' : "hide"}`}>{user !== null ? user.name : ''}</div>
            {/* <div className={`header-links ${loggedIn ? 'hide' : ''}`}>
                <Link to="/AllPublicQuizes" >All Quizes |</Link>
            </div> */}
            <div className="space"></div>
            { loggedIn ? 
                <Fragment>
                    <div className="header-links">
                        <Link to="/Dashboard">| Dashboard</Link>
                        {/* <Link to="/">| User Settings</Link> */}
                    </div> 
                    <div className='pipe'></div>
                    <div className="header-link-blue">
                        <a onClick={onLogout} href='#!'>| Log Out</a>
                    </div> 
                </Fragment> 
            : 
                <div className="header-links">
                    <Link to="/">| Home</Link>
                    <Link to="/login">| Log In</Link>
                </div>
            }
            {/* switch the conditional that changes the nav bar above to isAuthenticated ? */}
    </header>
  )
        };
};

export default Navbar;