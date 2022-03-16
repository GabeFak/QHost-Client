import {
    FILL_IN_QUIZ_EDIT_PUBLIC,
    SET_LOADING_PUBLIC,
    CLEAR_CURRENT_PUBLIC_Q_EDIT,
    CURRENT_PUBLIC_Q_EDIT,
    UPDATE_QUESTION_PUBLIC,
    DELETE_QUESTION_PUBLIC,
    ADD_QUESTION_PUBLIC,
    DELETE_QUIZ_PUBLIC,
    ADD_PUBLIC_QUIZ,
    UPDATE_PUBLIC_QUIZ,
    FILTER_PUBLIC_QUIZES,
    CLEAR_FILTER,
    SET_TOP_QUIZ
} from '../types';

const Reducer = (state, action) => {
    switch(action.type) {
        case FILL_IN_QUIZ_EDIT_PUBLIC:
            let newEditState = Object.assign( {}, state.publicQuizes.filter(quiz => quiz.quizName === action.payload));

            let editState = newEditState[Object.keys(newEditState)[0]];

            return {
                ...state,
                quizEditPublic: editState,
                loadingPublic: false
            };
        case SET_LOADING_PUBLIC:
            return {
                ...state,
                loadingPublic: true
            };
        case CLEAR_CURRENT_PUBLIC_Q_EDIT:
            return {
                ...state,
                currentQuestionEditPublic: null
            };
        case CURRENT_PUBLIC_Q_EDIT:
            return {
                ...state,
                currentQuestionEditPublic: action.payload
            };
        case UPDATE_QUESTION_PUBLIC:
            return {
                ...state,
                quizEditPublic: action.payload,
                loadingPublic: false
            };
        case DELETE_QUESTION_PUBLIC:
            let qToDelete = state.quizEditPublic;

            let toDelete = qToDelete.quizQuestions.filter(question => question.title !== action.payload);

            qToDelete.quizQuestions = toDelete;

            return {
                ...state,
                quizEditPublic: qToDelete,
                currentQuestionEditPublic: null,
                loadingPublic: false
            };
        case ADD_QUESTION_PUBLIC:
            let newQ = state.quizEditPublic;

            newQ.quizQuestions.push(action.payload);

            return {
                ...state,
                quizEditPublic: newQ,
                loadingPublic: false
            };
        case ADD_PUBLIC_QUIZ:
            return {
                ...state,
                publicQuizes: [action.payload, ...state.publicQuizes]
            };
        case DELETE_QUIZ_PUBLIC:
            let quizListMinusDeletedQuiz = state.publicQuizes.filter(quiz => quiz.id !== action.payload);

            return {
                ...state,
                publicQuizes: quizListMinusDeletedQuiz 
            };
        case UPDATE_PUBLIC_QUIZ:
            let publicQuizToUpdate = state.publicQuizes.filter(quiz => quiz.id !== action.payload.id);

            publicQuizToUpdate.push(action.payload);

            return {
                ...state,
                publicQuizes: publicQuizToUpdate
            };
        case FILTER_PUBLIC_QUIZES:
            return {
                ...state,
                filtered: state.publicQuizes.filter(quiz => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return quiz.quizName.match(regex) || quiz.userName.match(regex);
                })
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };
        case SET_TOP_QUIZ:
            let quizesToBeArangedByViews = state.publicQuizes;

            let quizPopularityStats = [];
            let quizViews = [];
            let quizNames = [];
        
            quizesToBeArangedByViews.forEach((quiz, index) => {
                quizViews[index] = quiz.views;
                quizNames[index] = quiz.quizName;
            });

            for(let i = 0; i < quizViews.length; i++){
                    quizPopularityStats[i] = [quizViews[i], quizNames[i]];
            };

            let c = 0;
            quizPopularityStats.sort((a, b) => {
                if (a[c] === b[c]) {
                    return 0;
                }else {
                    return (a[c] < b[c]) ? 1 : -1;
                };
            });

            return {
                ...state,
                quizNamesOrganizedByViews: quizPopularityStats
            };
        default:
            return state;
    };
};

export default Reducer;