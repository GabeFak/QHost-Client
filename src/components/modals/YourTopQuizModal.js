import React from 'react';
// import { useEffect} from 'react';
import { useContext } from 'react';
import QuizPublicContext from '../../context/QuizPublic/QuizPublicContext';
// import YourTopQuizModalItem from './YourTopQuizModalItem';

const YourTopQuizModal = ({ closeModal }) => {
    const quizPublicContext = useContext(QuizPublicContext);
    const { quizNamesOrganizedByViews } = quizPublicContext;
    // const { setTopQuizes } = quizPublicContext;

    // useEffect (() => {
    //     setTopQuizes();
    // }, []);

    return (
        <div className='modal-background'>
            <div className='modal-border'>
                <div className='modal-container'>
                    <div className='modal-title'>
                        <h3>Most Viewed Quiz</h3>
                    </div>
                    <div className='modal-selection-option'>
                        {/* {quizNamesOrganizedByViews.forEach(quizes => {
                            <YourTopQuizModalItem quizViews={quizes[0]} quizNames={quizes[1]}/>
                        })} */}
                        <div className='stats-views-2'><b>Quiz Name:</b> {quizNamesOrganizedByViews[0][1]}</div>
                        <div className='stats-views-view-number'><b>Views:</b> {quizNamesOrganizedByViews[0][0]}</div>
                        <button className="modal-button-grey" onClick={() => closeModal(false)} >Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default YourTopQuizModal;