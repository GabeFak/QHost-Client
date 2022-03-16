import React from 'react'
import { Fragment, useEffect, useContext  } from 'react'; 
import PublishedQuizesList from './dashboardComponents/PublishedQuizesList';
import MainDashboard from './dashboardComponents/MainDashboard';
import QuizWipContext from '../../context/QuizWip/QuizWipContext';
import QuizPublicContext from '../../context/QuizPublic/QuizPublicContext';

const Dashboard = () => {
    const quizWipContext = useContext(QuizWipContext);
    const { setLoggedIn } = quizWipContext;

    const quizPublicContext = useContext(QuizPublicContext);
    const { publicQuizes } = quizPublicContext;
    
    useEffect(() => { 
        setLoggedIn();
        //eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <div className="dashboard-container">
                <div className="left-elements">
                    <PublishedQuizesList publicQuizes={publicQuizes}/>
                </div>
                <div className="right-elements">
                    <MainDashboard publicQuizes={publicQuizes}/>
                </div>
            </div>
        </Fragment>
    )
};

export default Dashboard;
