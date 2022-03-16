import React from 'react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInfoContext from '../../context/UserInfo/UserInfoContext';
import QuizWipContext from '../../context/QuizWip/QuizWipContext';

const NewQuizModal = ({ closeModal }) => {
    const userInfoContext = useContext(UserInfoContext);
    const { UserInfo } = userInfoContext;
    const { user, userName } = UserInfo;

    const quizWipContext = useContext(QuizWipContext);
    const { fillInNewQuiz } = quizWipContext;

    const nav = useNavigate();

    const [newQInfo, setNewQInfo] = useState({
        id: 'genByDB',
        user: user,
        userName: userName,
        quizName: '',
        isPublished: 'Unpublished',
        date: 'date',
        views: 0,
        quizQuestions: []
    });
    
    const onChange = e => setNewQInfo({...newQInfo, [e.target.name]: e.target.value});

    const submitQName = e => {
        e.preventDefault();
        if(newQInfo.quizName !== '') {
            fillInNewQuiz(newQInfo);
            nav(`/QuizEditor/${newQInfo.quizName}/${newQInfo.isPublished}`);
            closeModal(false); 
        }else{
            console.log('please give it a name');
        };
    };

    return ( 
        <div className='modal-background'>
            <div className='modal-border'>
                <div className='modal-container'>
                    <div className='modal-title'>
                        <h1>New Quiz Name</h1>
                    </div>
                    <div className='modal-selection-option'>
                        <input className="new-quiz-modal-input" onChange={onChange} type="text" placeholder="Quiz Name" value={newQInfo.quizName} name="quizName"/>
                        <button onClick={submitQName} className="modal-button">Create New Quiz</button>
                        <button className="modal-button-grey" onClick={() => {closeModal(false)}}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default NewQuizModal;
