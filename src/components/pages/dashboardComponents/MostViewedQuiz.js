import React from 'react';
import { useContext } from 'react';
import QuizPublicContext from '../../../context/QuizPublic/QuizPublicContext';
import useTopQuizCalc from '../../hooks/useTopQuizCalc';

const MostViewedQuiz = ({ openModal }) => {
    const quizPublicContext = useContext(QuizPublicContext);
    const { setTopQuizes, quizNamesOrganizedByViews } = quizPublicContext;
    // useTopQuizCalc();
    const onClick = () => {
        openModal(true);
        // setTopQuizes();    
    }; 

    return (
        <div className="your-top-quiz dashboard-grid-container-item" onClick={onClick}>
            <h1>Your Top Quiz</h1>
        </div>
    )
};

export default MostViewedQuiz;