import React from 'react';
import { Fragment, useContext, useRef, useEffect } from 'react';
import PublishedQuizesListItem from './PublishedQuizesListItem'; 
import QuizPublicContext from '../../../context/QuizPublic/QuizPublicContext';

const PublishedQuizesList= ({ publicQuizes }) => {
    const quizPublicContext = useContext(QuizPublicContext);
    const {filtered} = quizPublicContext;

    const text = useRef('');

    useEffect(() => {
        if(quizPublicContext.filtered === null) {
            text.current.value = '';
        }
    }, []);

    const onChange = (e) => {
        if(text.current.value !== '') {
            quizPublicContext.filterPublicQuizes(e.target.value);
        }else{
            quizPublicContext.clearFilter();
        };
    };

    return (
        <Fragment>
            <div className="dashboard-search">
                <input ref={text} type="text" placeholder="Search Quizes" onChange={onChange}/>
            </div>
            <div className="public-quizes-box">
                <h2>Public Quizes</h2>
                <div className="public-quizes">
                    { quizPublicContext.filtered !== null ? filtered.map(PQuiz => (<PublishedQuizesListItem key={PQuiz.id} publicQuizToList={PQuiz} />))
                        : 
                    <>
                        { publicQuizes[0] !== undefined ? 
                            publicQuizes.map(PQuiz => (<PublishedQuizesListItem key={PQuiz.id} publicQuizToList={PQuiz} />)) 
                        : 
                            <div className="quiz-element">Public Quizes Will Populate Here</div>
                        }
                    </> }
                </div>
            </div>
        </Fragment>
    )
};

export default PublishedQuizesList;