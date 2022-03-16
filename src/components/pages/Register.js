import React from 'react';
import { Fragment, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import QuizWipContext from '../../context/QuizWip/QuizWipContext';

const Register = () => {
    const quizWipContext = useContext(QuizWipContext);
    const { setLoggedOff } = quizWipContext;

    useEffect(() => { 
      setLoggedOff();
        //eslint-disable-next-line
    }, []);

    return(
        <Fragment>
            <div className="register-form-reg">
                <div className='reg-form'>
                    <h4>Register</h4>
                    <div className='row'>
                        <div className='input-field'>
                            <input type='text' name='userName' placeholder="User Name"></input>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='input-field'>
                            <input type='Email' name='Email' placeholder="Email"></input>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='input-field'>
                            <input type='password' name='password' placeholder="Password"></input>         
                        </div>
                    </div>
                    <div className='row'>
                        <div className='input-field'>
                            <input type='password' name='re-password' placeholder="Retype Password"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="submit-btn"><Link to="/Dashboard">Register</Link></div>
                    </div>                  
                </div>
            </div>
        </Fragment>
    )
};

export default Register;