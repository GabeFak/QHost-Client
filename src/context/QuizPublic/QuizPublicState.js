import React, { useReducer } from 'react';
import {v4 as uuid} from 'uuid';
import quizPublicContext from './QuizPublicContext';
import quizPublicReducer from './QuizPublicReducer';
import axios from 'axios';
import {
    FILL_IN_QUIZ_EDIT_PUBLIC,
    SET_LOADING_PUBLIC,
    CURRENT_PUBLIC_Q_EDIT,
    CLEAR_CURRENT_PUBLIC_Q_EDIT,
    ADD_QUESTION_PUBLIC,
    DELETE_QUESTION_PUBLIC,
    UPDATE_QUESTION_PUBLIC,
    DELETE_QUIZ_PUBLIC,
    ADD_PUBLIC_QUIZ,
    UPDATE_PUBLIC_QUIZ,
    FILTER_PUBLIC_QUIZES,
    CLEAR_FILTER,
    SET_TOP_QUIZ,
    QUIZPUB_ERROR,
    GET_QUIZ_PUB,
    CLEAR_QUIZ_PUB,
    ADD_TO_PUBLIC, 
    GET_FROM_PUBLIC,
    DELETE_FROM_PUBLIC,
    UPDATE_PUBLIC
} from '../types';


const QuizPublicState = props => {
    const initialState = {
        loadingPublic: false,
        publicQuizes: [            
        //     {
        //     id: '3',
        //     user: 'bunchOnumbers',
        //     userName: 'userX',
        //     quizName: 'Public Quiz 1',
        //     isPublished: 'Published',
        //     date: '2022-03-04T22:54:22.461+00:00',
        //     views: 1,
        //     quizQuestions:[
        //         {
        //             title: "whats my name?",
        //             Answer: "bongo",
        //             WrongAnswer1: "undefined",
        //             WrongAnswer2: "idk",
        //             WrongAnswer3: "something dumb probably"
        //         },
        //         {
        //             title: "what day is it",
        //             Answer: "could be anyday",
        //             WrongAnswer1: "tuesday",
        //             WrongAnswer2: "chewsday",
        //             WrongAnswer3: "donnerstag"
        //         }
        //     ]
        // },
        // {
        //     id: '4',
        //     user: 'bunchOnumbers',
        //     userName: 'userx',
        //     quizName: 'Public Quiz 2',
        //     isPublished: 'Published',
        //     date: '2022-04-04T22:54:22.461+00:00',
        //     views: 5,
        //     quizQuestions: [
        //         {
        //             title: "How are you today?",
        //             Answer: "Good",
        //             WrongAnswer1: "Not-a-so-good",
        //             WrongAnswer2: "red",
        //             WrongAnswer3: "sky"
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
        quizEditPublic: {
            id: '',
            user: '',
            userName: '',
            quizName: '',
            isPublished: '',
            date: '',
            views: '',
            quizQuestions: [],
            postId: ''
        },
        error: null,
        quizNamesOrganizedByViews: null,
        currentQuestionEditPublic: null,
        filtered: null
    };

    const [state, dispatch] = useReducer(quizPublicReducer, initialState);

    //Actions go here.
    // GET_QUIZ_PUB
    const getQuizPub = async () => {
        setLoading();
        try {
            const res = await axios.get('/api/quizes');

            dispatch({ type: GET_QUIZ_PUB, payload: res.data });
        } catch (err) {
            dispatch({ type: QUIZPUB_ERROR, payload: err.response.msg });
        };
    };
    // CLEAR_QUIZ_PUB
    const clearQuizPub = () => {
        dispatch({ type: CLEAR_QUIZ_PUB })
    }

    const fillInQuizEditStatePublic = urlParam => {
        setLoading();
        dispatch({ type: FILL_IN_QUIZ_EDIT_PUBLIC, payload: urlParam});
    };

    const setLoading = () => dispatch({ type: SET_LOADING_PUBLIC });

    const clearCurrentQuestionEditPublic = () => dispatch({ type: CLEAR_CURRENT_PUBLIC_Q_EDIT});

    const setCurrentQuestionEditPublic = questionName => {
        dispatch({ type: CURRENT_PUBLIC_Q_EDIT, payload: questionName})
    };

    const updateQuestionPublic = (currentQ, questionToUpdate) => {
        setLoading();
        let payloadNew = state.quizEditPublic; 

        payloadNew.quizQuestions.forEach((question, index) => {
            if(question.title === currentQ) {
                payloadNew.quizQuestions[index] = questionToUpdate;
            };
        });

        dispatch({ type: UPDATE_QUESTION_PUBLIC, payload: payloadNew});
        clearCurrentQuestionEditPublic();
    };

    const deleteQuestionPublic = questionTitle => {
        setLoading();
        dispatch({ type: DELETE_QUESTION_PUBLIC, payload: questionTitle});
    };

    const addQuestionPublic = newQuestion => {
        setLoading();
        dispatch({ type: ADD_QUESTION_PUBLIC, payload: newQuestion});
    };

    const addQuizPublic = async newPublicQuiz => {
        // console.log(newPublicQuiz)
        setLoading();
        newPublicQuiz.postId = newPublicQuiz._id
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/quizes', newPublicQuiz, config);

            dispatch({ type: ADD_PUBLIC_QUIZ, payload: res.data });
        } catch (err) {
            dispatch({ type: QUIZPUB_ERROR, payload: err.response.msg });
        };

        try {
           await axios.post('/api/public', newPublicQuiz, config);
            console.log('add to public ')
            // dispatch({ type: ADD_PUBLIC_QUIZ, payload: res.data });
        } catch (err) {
            dispatch({ type: QUIZPUB_ERROR, payload: err.response.msg });
        };
        // dispatch({ type: ADD_PUBLIC_QUIZ, payload: newPublicQuiz });
    };

    const deletePublicQuiz = async (currentQuizID, postId) => {
        try {
            await axios.delete(`/api/quizes/${currentQuizID}`);
            dispatch({ type:  DELETE_QUIZ_PUBLIC, payload: currentQuizID });
        } catch (err) {
            dispatch({ type: QUIZPUB_ERROR, payload: err.response.msg });
        };
        try {
            console.log(postId)
            await axios.delete(`/api/public/${postId}`);
            // dispatch({ type:  DELETE_QUIZ_PUBLIC, payload: currentQuizID });
        } catch (err) {
            dispatch({ type: QUIZPUB_ERROR, payload: err.response.msg });
        };
    };

    const updatePublicQuiz = async quizToUpdate => {
        setLoading();
        console.log(quizToUpdate)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.put(`/api/quizes/${quizToUpdate._id}`, quizToUpdate, config);

            dispatch({ type: UPDATE_PUBLIC_QUIZ, payload: res.data });
        } catch (err) {
            dispatch({ type: QUIZPUB_ERROR, payload: err.response.msg });
        };
    };

    //filter public quizes search
    const filterPublicQuizes = input => {
        dispatch({ type: FILTER_PUBLIC_QUIZES, payload: input})
    };

    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER})
    };

    const setTopQuizes = () => {
        dispatch({ type: SET_TOP_QUIZ })
    };
    //SetState will set the state from the currently selected quiz wip to edit
    //if id = null (the user pressed new quiz) then create id and blank template.
    ///////////////////////
    /////////////////////
    ////////////////////
    //////////////////////
    // Public Public stuff

    // // ADD_TO_PUBLIC
    // const addToPublic = async addToPublicAccess => {
    //     console.log(addToPublicAccess)
    //     setLoading();
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }

    //     try {
    //         const res = await axios.post('/api/public', addToPublicAccess, config);

    //         dispatch({ type: ADD_PUBLIC_QUIZ, payload: res.data });
    //     } catch (err) {
    //         dispatch({ type: QUIZPUB_ERROR, payload: err.response.msg });
    //     };
    // }



    return (
        <quizPublicContext.Provider
            value={{
                loadingPublic: state.loading,
                publicQuizes: state.publicQuizes,
                quizEditPublic: state.quizEditPublic,
                quizNamesOrganizedByViews: state.quizNamesOrganizedByViews,
                currentQuestionEditPublic: state.currentQuestionEditPublic,
                filtered: state.filtered,
                error: state.error,
                getQuizPub,
                clearQuizPub,
                setLoading,
                fillInQuizEditStatePublic,
                clearCurrentQuestionEditPublic,
                setCurrentQuestionEditPublic,
                updateQuestionPublic,
                deleteQuestionPublic,
                addQuestionPublic,
                deletePublicQuiz,
                addQuizPublic,
                updatePublicQuiz,
                filterPublicQuizes,
                clearFilter,
                setTopQuizes
            }}>
        { props.children }
        </quizPublicContext.Provider>
    )
};

export default QuizPublicState;