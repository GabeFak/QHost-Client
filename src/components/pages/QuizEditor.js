import React from 'react';
import { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import QuizNameAndQuestionsBox from './quizEditorComponents/QuizNameAndQuestionsBox';
import QuestionEditor from './quizEditorComponents/QuestionEditor';
import QuestionEditorPublic from './quizEditorComponents/QuestionEditorPublic';
import QuizWipContext from '../../context/QuizWip/QuizWipContext';
import QuizPublicContext from '../../context/QuizPublic/QuizPublicContext';
import AuthContext from '../../context/Auth/AuthContext';

const QuizEditor = () => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;

    const quizContext = useContext(QuizWipContext);
    const { fillInQuizEditState, loading, setLoggedIn, catchFillInNewQuizFinishFalse, FillInNewQuizFinish, quizEdit, clearQuizEdit } = quizContext;

    const quizPublicContext = useContext(QuizPublicContext);
    const { fillInQuizEditStatePublic, loadingPublic, quizEditPublic} = quizPublicContext;
    
    const quizParam = useParams();

    // const nav = useNavigate();

    useEffect(() => {
        loadUser();
        
        if(FillInNewQuizFinish === true) {
            catchFillInNewQuizFinishFalse();
        }else if(quizParam.isPub === 'Unpublished') { 
            // clearQuizEdit();
            console.log(quizParam.quizName)
            fillInQuizEditState(quizParam.quizName);
        }else if(quizParam.isPub === 'Published') {
            // clearQuizEdit();
            fillInQuizEditStatePublic(quizParam.quizName);
        };
    
        setLoggedIn();
        //eslint-disable-next-line
    }, []);

    if(loading || loadingPublic) { return <Spinner />;}else{

    return (
        <div className="dashboard-container">
            <div className="left-elements-quiz-creator">
                <QuizNameAndQuestionsBox />
            </div>
            <div className="right-elements">
                { quizParam.isPub === 'Unpublished' ? 
                        <QuestionEditor /> 
                    :
                        <QuestionEditorPublic />
                }
                {/* make if else and write another question editor out for public quizes as it would be too much code on one page otherwise */}
            </div>
        </div>
    )
            }
};

export default QuizEditor;