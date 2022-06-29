import React, { Fragment, useState, useContext} from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AreYouSure from '../../../modals/AreYouSure';
import SeeStatsModalPublicQuizEdit from '../../../modals/SeeStatsModalPublicQuizEdit';
import QuizWipContext from '../../../../context/QuizWip/QuizWipContext';
import QuizPublicContext from '../../../../context/QuizPublic/QuizPublicContext';
import AllPublicQuizesContext from '../../../../context/AllPublicQuizes/AllPublicQuizesContext';

const QuestionEditorMacroButtons = () => {
    const nav = useNavigate();

    const quizWipContext = useContext(QuizWipContext);
    const { quizEdit, quizes, deleteWipQuiz, updatePrivateQuiz } = quizWipContext;

    const quizPublicContext = useContext(QuizPublicContext);
    const { quizEditPublic, addQuizPublic, updatePublicQuiz} = quizPublicContext;

    const allPublicQuizesContext = useContext(AllPublicQuizesContext);
    const { addPublicQuizToPublicDatabase, updatePublicQuizToPublicDatabase } = allPublicQuizesContext;

    const isQuizPublished = useParams();

    const [areYouSure, setAreYouSure] = useState({
        openModal: false,
        isNotPublished: null
    });

    const [seeStatsModal, setSeeStatsModal] = useState(false);

    const setAreYouSureState = () => {
        if(isQuizPublished.isPub === "Unpublished") {
            setAreYouSure({
                openModal: true,
                isNotPublished: true
            });
        }else if(isQuizPublished.isPub === "Published") {
            setAreYouSure({
                openModal: true,
                isNotPublished: false 
            });
        };
    };

    const publish = () => {
        const addToPrivate = quizes.filter(quiz => quiz.quizName === quizEdit.quizName);
        const addPrivate = addToPrivate[Object.keys(addToPrivate)[0]];
        addPrivate.isPublished = "Published";
        addQuizPublic(addPrivate);
        addPublicQuizToPublicDatabase(addPrivate);
        deleteWipQuiz(quizEdit.quizName);
        nav('../../Dashboard');
    };

    const saveQuiz = () => {
        if(isQuizPublished.isPub === "Unpublished") {
            updatePrivateQuiz(quizEdit);
        }else if(isQuizPublished.isPub === "Published") {
            updatePublicQuizToPublicDatabase(quizEditPublic);
            updatePublicQuiz(quizEditPublic);
        }
        nav('../../Dashboard');
    };

    const linkToPreview = () => {
        nav(`/QuizPreview/${isQuizPublished.quizName}/${isQuizPublished.isPub}`);
    };

    const seeStats = () => {
        setSeeStatsModal(true);
    };

  return (
        <Fragment>
            <button className="quiz-editor-macros first-macro-button" onClick={saveQuiz}>Save Quiz</button> 
            { isQuizPublished.isPub === "Unpublished" ? 
                <button className="quiz-editor-macros middle-macro-button" onClick={publish}>Publish Quiz</button> 
            :
                <button className="quiz-editor-macros middle-macro-button" onClick={seeStats}>Quiz Stats</button> 
            }
            {/* <button className="quiz-dashboard-macros">Set Theme</button> */}
            <button className="quiz-editor-macros middle-macro-button" onClick={linkToPreview}>Preview Quiz</button>
            <button className="quiz-editor-macros last-macro-button" onClick={() => setAreYouSureState()}>Delete Quiz</button>
            { areYouSure.openModal && areYouSure.isNotPublished && 
                <AreYouSure quizName={quizEdit.quizName} setAreYouSure={setAreYouSure} isPublished={isQuizPublished.isPub} />}

            { areYouSure.openModal && !areYouSure.isNotPublished && 
                <AreYouSure quizToDeletePublic={quizEditPublic.id} setAreYouSure={setAreYouSure} isPublished={isQuizPublished.isPub} />}
            {seeStatsModal && <SeeStatsModalPublicQuizEdit resetModal={setSeeStatsModal} views={quizEditPublic.views} quizName={quizEditPublic.quizName}/>}
        </Fragment>
  )
};

export default QuestionEditorMacroButtons;