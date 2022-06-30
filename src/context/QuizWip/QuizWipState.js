import React, { useReducer } from 'react';
import {v4 as uuid} from 'uuid';
import quizWipContext from './QuizWipContext';
import quizWipReducer from './QuizWipReducer';
import axios from 'axios';
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
    CATCH_FILL_IN_NEW_QUIZ_FINISH_FALSE,
    QUIZWIP_ERROR,
    GET_QUIZ_WIPS,
    CLEAR_QUIZ_WIPS
} from '../types';


const QuizWipState = props => {
    const initialState = {
        loading: false,
        error: null,
        quizes: [
            // {
            //     id: 'test id 1',
            //     user: 'bunchOnumbers',
            //     userName: 'user1',
            //     quizName: 'Quiz 1',
            //     isPublished: 'Unpublished',
            //     date: '2022-02-04T22:54:22.461+00:00',
            //     views: 0,
            //     quizQuestions: [
            //         {
            //             title: "whats 2 + 2?",
            //             Answer: "4",
            //             WrongAnswer1: "5",
            //             WrongAnswer2: "6",
            //             WrongAnswer3: "8"
            //         },
            //         {
            //             title: "whats 3 + 2?",
            //             Answer: "5",
            //             WrongAnswer1: "6",
            //             WrongAnswer2: "7",
            //             WrongAnswer3: "8"
            //         }
            //     ]
            // },
            // {
            //     id: 'test id 2',
            //     user: 'bunchOnumbers',
            //     userName: 'user1',
            //     quizName: 'Quiz 2',
            //     isPublished: 'Unpublished',
            //     date: '2022-03-04T22:54:22.461+00:00',
            //     views: 0,
            //     quizQuestions:[
            //          {
            //             title: "whats 2 + 2?",
            //             Answer: "4",
            //             WrongAnswer1: "5",
            //             WrongAnswer2: "6",
            //             WrongAnswer3: "8"
            //         },
            //         {
            //             title: "whats 3 + 2?",
            //             Answer: "5",
            //             WrongAnswer1: "6",
            //             WrongAnswer2: "7",
            //             WrongAnswer3: "8"
            //         }
            //     ]
            // },
            // {
            //     id: 'test id 3',
            //     user: 'bunchOnumbers',
            //     userName: 'user1',
            //     quizName: 'Quiz 3',
            //     isPublished: 'Unpublished',
            //     date: '2022-04-04T22:54:22.461+00:00',
            //     views: 0,
            //     quizQuestions: [
            //         {
            //             title: "whats 2 + 2?",
            //             Answer: "4",
            //             WrongAnswer1: "5",
            //             WrongAnswer2: "6",
            //             WrongAnswer3: "8"
            //         },
            //         {
            //             title: "whats 3 + 2?",
            //             Answer: "5",
            //             WrongAnswer1: "6",
            //             WrongAnswer2: "7",
            //             WrongAnswer3: "8"
            //         }
            //     ]
            // }
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
    // GET_QUIZ_WIPS 
    const getQuizWips = async () => {
        setLoading();
        try {
            const res = await axios.get('/api/userData');

            dispatch({ type: GET_QUIZ_WIPS, payload: res.data });
        } catch (err) {
            dispatch({ type: QUIZWIP_ERROR, payload: err.response.msg });
        };
    };
    // CLEAR_QUIZ_WIPS
    const clearQuizWIPS = () => {
        dispatch({ type: CLEAR_QUIZ_WIPS })
    }
    // 
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

    const deleteQuestion = questionID => {
        setLoading();
        dispatch({ type: DELETE_QUESTION, payload: questionID});
    }

    // This adds to the private list of quizes from the public list. To add a new quiz from the UI, fillInNewQuiz is called and then
    // updateQuizWIP is called which will add it to the database by default if it doesn't already exist there. 
    const addQuizToWip = async question => {
        // let id = uuid();
        // console.log(id)

        // Also add quiz to backend 

        setLoading();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/userData', question, config);

            dispatch({ type: ADD_QUIZ, payload: res.data });
        } catch (err) {
            dispatch({ type: QUIZWIP_ERROR, payload: err.response.msg });
        };
        // dispatch({ type: ADD_QUIZ, payload: question });
    };

    const deleteWipQuiz = async currentQuizID => {

        try {
            await axios.delete(`/api/userData/${currentQuizID}`);

            dispatch({ type:  DELETE_QUIZ_WIP, payload: currentQuizID });
        } catch (err) {
            dispatch({ type: QUIZWIP_ERROR, payload: err.response.msg });
        };

        // dispatch({ type: DELETE_QUIZ_WIP, payload: currentQuizID})
    }

    const updatePrivateQuiz = async quizToUpdate => {
        setLoading();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.put(`/api/userData/${quizToUpdate._id}`, quizToUpdate, config);

            dispatch({ type: UPDATE_PRIVATE_QUIZ, payload: res.data });
        } catch (err) {
            dispatch({ type: QUIZWIP_ERROR, payload: err.response.msg });
        };
        // Add quiz to backend
        // dispatch({ type: UPDATE_PRIVATE_QUIZ, payload: quizToUpdate})
    }

    const fillInNewQuiz = userAndTitleInfo => {
        // let newId = uuid();
        // userAndTitleInfo.id = newId;
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
            error: state.error,
            currentQuestionEdit: state.currentQuestionEdit,
            loggedIn: state.loggedIn,
            newQuizFill: state.newQuizFill,
            FillInNewQuizFinish: state.FillInNewQuizFinish,
            getQuizWips,
            clearQuizWIPS,
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