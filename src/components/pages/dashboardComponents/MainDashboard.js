import React from 'react';
import { Fragment, useState, useContext} from 'react'; 
import MakeNewQuiz from './MakeNewQuiz';
import MostViewedQuiz from './MostViewedQuiz';
import WipSelect from './wipSelect';
import EditPublicModal from '../../modals/EditPublicModal';
import YourTopQuizModal from '../../modals/YourTopQuizModal';
import NewQuizModal from '../../modals/NewQuizModal';
import AreYouSure from '../../modals/AreYouSure';
import SeeStats from '../../modals/SeeStats';
import AllPublicQuizesContext from '../../../context/AllPublicQuizes/AllPublicQuizesContext';

const MainDashboard = ({publicQuizes}) => {
    const allPublicQuizesContext = useContext(AllPublicQuizesContext);

    const [modal, setModal] = useState(false);

    const [modalState, setModalState] = useState({
      state: ''
    });

    const [selectedPublicQuizToDelete, setSelectPublicQuizToDelete] = useState({
      publicQuizToDeleteID: null
    });

    const [areYouSure, setAreYouSure] = useState(false);

    const [newQuizModal, setNewQuizModal] = useState(false);

    const [seeStats, setSeeStats] = useState(false);

    const [selectedQuizStats, setSelectedQuizStats] = useState({
      selectedQuizName: null,
      views: null
    });

    const [topQuizModalState, setTopQuizModalState] = useState(false);

    const getViews = (id) => {
      let match = Object.assign( {}, allPublicQuizesContext.publicQuizes.filter(quiz => quiz.id === id));
      let statsObj = match[Object.keys(match)[0]];
      setSelectedQuizStats({...selectedQuizStats, views: statsObj.views});
    };

    return (
        <Fragment>
            <div className="quiz-dashboard-macros-container">
                <button className="quiz-dashboard-macros first-macro-button" onClick={() => {setModal(true); setModalState({state:'Quiz Stats'})}}>Quiz Stats</button>
                <button className="quiz-dashboard-macros middle-macro-button" onClick={() => {setModal(true); setModalState({state:'Delete Quiz'})}}>Delete Quiz</button>
                <button className="quiz-dashboard-macros middle-macro-button" onClick={() => {setModal(true); setModalState({state:'Edit Public Quizes'})}}>Edit Quiz</button>
                <button className="quiz-dashboard-macros last-macro-button" onClick={() => {setModal(true); setModalState({state:'Make Quiz Private'})}}>Make Quiz Private</button>
            </div>
            <div className="dashboard-grid-container">
                <MakeNewQuiz openModal={setNewQuizModal}/>
                <MostViewedQuiz openModal={setTopQuizModalState}/>
                <WipSelect />
            </div>
                { modal && <EditPublicModal quizToDel={setSelectPublicQuizToDelete} setAreYouSure={setAreYouSure} modalState={modalState} closeModal={setModal} publicQuizes={publicQuizes} setSeeStats={setSeeStats} setSelectedQuizStats={setSelectedQuizStats} getViews={getViews}/>}
                { areYouSure && <AreYouSure quizToDeletePublic={selectedPublicQuizToDelete.publicQuizToDeleteID} setAreYouSure={setAreYouSure} />}
                { seeStats && <SeeStats selectedQuizStats={selectedQuizStats} resetModal={setSeeStats}/>}
                { newQuizModal && <NewQuizModal closeModal={setNewQuizModal} />}
                { topQuizModalState && <YourTopQuizModal closeModal={setTopQuizModalState}/>}
        </Fragment>
    )             
};

export default MainDashboard;