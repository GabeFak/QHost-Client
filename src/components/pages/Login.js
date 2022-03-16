import React from 'react';
import { Fragment, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import QuizWipContext from '../../context/QuizWip/QuizWipContext';

const Login = () => {
    const quizWipContext = useContext(QuizWipContext);
    const { setLoggedOff } = quizWipContext;

    useEffect(() => { 
        setLoggedOff();
        //eslint-disable-next-line
    }, []);

    return ( 
        <Fragment>
            <div className="login-form-log">
                <div className='log-form'>
                    <h4>Login</h4>
                    <div className='row'>
                        <div className='input-field'>
                            <input type='text' name='userName' placeholder="User Name"></input>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='input-field'>
                            <input type='password' name='password' placeholder="Password"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="submit-btn"><Link to="/Dashboard">Log In</Link></div>
                    </div>
                </div>
            </div>
            <div className="link-to-reg-login">
                <div className='reg-from-login-link'>
                    <h4>Need an Account?</h4>
                    <div className="row">
                        <div className="submit-btn"><Link to="/Register">Register Today</Link></div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default Login;      