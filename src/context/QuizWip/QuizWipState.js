import React, { useReducer } from 'react';
// import uuid from 'uuid';
import quizWipContext from './QuizWipContext';
import quizWipReducer from './QuizWipReducer';
import {
    FILL_IN_QUIZ_EDIT,
    SET_LOADING,
    CURRENT_QUESTION_EDIT,
    CLEAR_CURRENT_QUESTION_EDIT,
    ADD_QUESTION,
    DELETE_QUESTION,
    UPDATE_QUESTION,
    SET_LOGGED_IN,
    SET_LOGGED_OFF,
    DELETE_QUIZ_WIP,
    ADD_QUIZ,
    UPDATE_PRIVATE_QUIZ,
    FILL_IN_NEW_QUIZ,
    CATCH_FILL_IN_NEW_QUIZ_FINISH,
    CATCH_FILL_IN_NEW_QUIZ_FINISH_FALSE
} from '../types';


const QuizWipState = props => {
    const initialState = {
        loading: false,
        quizes: [
            {
                id: 'test id 1',
                user: 'bunchOnumbers',
                userName: 'user1',
                quizName: 'Quiz 1',
                isPublished: 'Unpublished',
                date: '2022-02-04T22:54:22.461+00:00',
                views: 0,
                quizQuestions: [
                    {
                        title: "whats 2 + 2?",
                        Answer: "4",
                        WrongAnswer1: "5",
                        WrongAnswer2: "6",
                        WrongAnswer3: "8"
                    },
                    {
                        title: "whats 3 + 2?",
                        Answer: "5",
                        WrongAnswer1: "6",
                        WrongAnswer2: "7",
                        WrongAnswer3: "8"
                    }
                ]
            },
            {
                id: 'test id 2',
                user: 'bunchOnumbers',
                userName: 'user1',
                quizName: 'Quiz 2',
                isPublished: 'Unpublished',
                date: '2022-03-04T22:54:22.461+00:00',
                views: 0,
                quizQuestions:[
                     {
                        title: "whats 2 + 2?",
                        Answer: "4",
                        WrongAnswer1: "5",
                        WrongAnswer2: "6",
                        WrongAnswer3: "8"
                    },
                    {
                        title: "whats 3 + 2?",
                        Answer: "5",
                        WrongAnswer1: "6",
                        WrongAnswer2: "7",
                        WrongAnswer3: "8"
                    }
                ]
            },
            {
                id: 'test id 3',
                user: 'bunchOnumbers',
                userName: 'user1',
                quizName: 'Quiz 3',
                isPublished: 'Unpublished',
                date: '2022-04-04T22:54:22.461+00:00',
                views: 0,
                quizQuestions: [
                    {
                        title: "whats 2 + 2?",
                        Answer: "4",
                        WrongAnswer1: "5",
                        WrongAnswer2: "6",
                        WrongAnswer3: "8"
                    },
                    {
                        title: "whats 3 + 2?",
                        Answer: "5",
                        WrongAnswer1: "6",
                        WrongAnswer2: "7",
                        WrongAnswer3: "8"
                    }
                ]
            }
        ],
        quizEdit: {
            id: '',
            user: '',
            userName: '',
            quizName: '',
            isPublished: '',
            date: '',
            views: '',
            quizQuestions: []
        },
        newQuizFill: null,
        currentQuestionEdit: null,
        loggedIn: false,
        FillInNewQuizFinish: false
    };
    const [state, dispatch] = useReducer(quizWipReducer, initialState);

    //Actions go here.
    const fillInQuizEditState = urlParam => {
        setLoading();
        dispatch({ type: FILL_IN_QUIZ_EDIT, payload: urlParam});
    }
    const setLoading = () => dispatch({ type: SET_LOADING });

    const setLoggedOff = () => dispatch({ type: SET_LOGGED_OFF});

    const setLoggedIn = () => dispatch({ type: SET_LOGGED_IN });

    const setCurrentQuestionEdit = questionName => {
        dispatch({ type: CURRENT_QUESTION_EDIT, payload: questionName})
    }

    const clearCurrentQuestionEdit = () => {
        dispatch({ type: CLEAR_CURRENT_QUESTION_EDIT});
    }

    const addQuestion = newQuestion => {
        setLoading();
        dispatch({ type: ADD_QUESTION, payload: newQuestion});
    }

    const updateQuestion = (currentQ, questionToUpdate) => {
        setLoading();
        let payloadNew = state.quizEdit; 
        payloadNew.quizQuestions.forEach((question, index) => {
            if(question.title === currentQ){
                payloadNew.quizQuestions[index] = questionToUpdate;
            }
        });
        dispatch({ type: UPDATE_QUESTION, payload: payloadNew});
        clearCurrentQuestionEdit();
    }

    const deleteQuestion = questionTitle => {
        setLoading();
        dispatch({ type: DELETE_QUESTION, payload: questionTitle});
    }

    const addQuizToWip = question => {
        dispatch({ type: ADD_QUIZ, payload: question});
    }

    const deleteWipQuiz = currentQuizName => {
        dispatch({ type: DELETE_QUIZ_WIP, payload: currentQuizName})
    }

    const updatePrivateQuiz = quizToUpdate => {
        dispatch({ type: UPDATE_PRIVATE_QUIZ, payload: quizToUpdate})
    }

    const fillInNewQuiz = userAndTitleInfo => {
        setLoading();
        catchFillInNewQuizFinish();
        dispatch({ type: FILL_IN_NEW_QUIZ, payload: userAndTitleInfo});
    }

    const catchFillInNewQuizFinish = () => {
        dispatch({ type: CATCH_FILL_IN_NEW_QUIZ_FINISH});
    }

    const catchFillInNewQuizFinishFalse = () => {
        dispatch({ type: CATCH_FILL_IN_NEW_QUIZ_FINISH_FALSE});
    }


    return (
        <quizWipContext.Provider
        value={{
            quizes: state.quizes,
            quizEdit: state.quizEdit,
            loading: state.loading,
            currentQuestionEdit: state.currentQuestionEdit,
            loggedIn: state.loggedIn,
            newQuizFill: state.newQuizFill,
            FillInNewQuizFinish: state.FillInNewQuizFinish,
            setCurrentQuestionEdit,
            clearCurrentQuestionEdit,
            fillInQuizEditState,
            setLoading,
            setLoggedIn,
            setLoggedOff,
            addQuestion,
            deleteQuestion,
            updateQuestion,
            deleteWipQuiz,
            addQuizToWip,
            updatePrivateQuiz,
            fillInNewQuiz,
            catchFillInNewQuizFinish,
            catchFillInNewQuizFinishFalse
        }}>
            { props.children }
        </quizWipContext.Provider>
    )
};

export default QuizWipState;