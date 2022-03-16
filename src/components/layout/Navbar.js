import React, { Fragment } from 'react';
import { useContext } from 'react';
import { Link } from "react-router-dom";
import QuizWipContext from '../../context/QuizWip/QuizWipContext';
import UserInfoContext from '../../context/UserInfo/UserInfoContext';

const Navbar = () => {
const userInfoContext = useContext(UserInfoContext);
const { UserInfo } = userInfoContext;

const quizContext = useContext(QuizWipContext);
const { loggedIn } = quizContext;

  return (
    <header className='browser-default'>
        <div className="header-logo">
            <h1>QUIZTIME</h1>
        </div>
        <div className={`header-user-name ${loggedIn ? '' : "hide"}`}>{UserInfo.userName}</div>
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
                        <Link to="/">| Log Out</Link>
                    </div> 
                </Fragment> 
            : 
                <div className="header-links">
                    <Link to="/">| Home</Link>
                    <Link to="/login">| Log In</Link>
                </div>
            }
    </header>
  )
};

export default Navbar;