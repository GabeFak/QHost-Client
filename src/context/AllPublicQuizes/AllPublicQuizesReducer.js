import {
FILTER_ALL_PUBLIC_QUIZES,
CLEAR_FILTER_ALL_PUBLIC_QUIZES,
FILL_IN_CURRENT_ACTIVE_QUIZ,
ADD_TO_VIEWS,
ADD_PUBLIC_QUIZ_TO_PUBLIC_DATABASE,
UPDATE_PUBLIC_QUIZ_PUBLIC_DATABASE,
DELETE_QUIZ_FROM_DATABASE,
GET_FROM_PUBLIC,
SET_LOADING_PUBLIC_ACCESS,
QUIZPUB_ERROR
} from '../types';

const Reducer = (state, action) => {
    switch(action.type) {
    case FILTER_ALL_PUBLIC_QUIZES:
        let filtered = state.publicQuizes.filter(quiz => {
            const regex = new RegExp(`${action.payload}`, 'gi');
            return quiz.quizName.match(regex) || quiz.userName.match(regex);
        });

        let newFiltered = filtered.splice(0, 6); //Limit of 6 quizes to be displayed 

        return {
            ...state,
            filtered: newFiltered
        };
    case CLEAR_FILTER_ALL_PUBLIC_QUIZES:
        return {
            ...state,
            filtered: null
        };
    case FILL_IN_CURRENT_ACTIVE_QUIZ:
        let newCurrentActive = Object.assign( {}, state.publicQuizes.filter(quiz => quiz.quizName === action.payload));

        let setNewCurrentActive = newCurrentActive[Object.keys(newCurrentActive)[0]];

        return {
            ...state,
            currentActiveQuiz: setNewCurrentActive
        };
    case ADD_TO_VIEWS:
        let viewCount = state.currentActiveQuiz;

        viewCount.views += 1;

        let publicQuizesMinusCurrent = state.publicQuizes.filter(quiz => quiz.id !== action.payload);

        publicQuizesMinusCurrent.push(viewCount);

        return {
            ...state,
            quizQuestions: publicQuizesMinusCurrent
        };
    case ADD_PUBLIC_QUIZ_TO_PUBLIC_DATABASE:
        return {
            ...state,
            publicQuizes: [action.payload, ...state.publicQuizes]
        };
    case UPDATE_PUBLIC_QUIZ_PUBLIC_DATABASE:
        let publicQuizToUpdateDB = state.publicQuizes.filter(quiz => quiz.id !== action.payload.id);

        publicQuizToUpdateDB.push(action.payload);

        return {
            ...state,
            publicQuizes: publicQuizToUpdateDB
        };
    case DELETE_QUIZ_FROM_DATABASE:
        let quizListMinusDeletedQuiz = state.publicQuizes.filter(quiz => quiz.id !== action.payload);

        return {
            ...state,
            publicQuizes: quizListMinusDeletedQuiz
        };
    case GET_FROM_PUBLIC: 
        return {
            ...state,
            publicQuizes: action.payload,
            loadingPublicAccessQuizes: false
        };
    case SET_LOADING_PUBLIC_ACCESS:
        return {
            ...state,
            loadingPublicAccessQuizes: true
        }
    case QUIZPUB_ERROR:
        return {
            ...state,
            error: action.payload,
            loadingPublicAccessQuizes: false  
        }
        default:
            return state;
    };

};

export default  Reducer;