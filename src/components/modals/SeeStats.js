import React from 'react';

const SeeStats = ({selectedQuizStats, resetModal}) => {
    const { views, selectedQuizName } = selectedQuizStats;

    return (
        <div className='modal-background'>
            <div className='modal-border'>
                <div className='modal-container'>
                    <div className='modal-title'>
                        <h3>{selectedQuizName} Stats</h3>
                    </div>
                    <div className='modal-selection-option'>
                        <div className='stats-views'>{views}</div>
                        <button className="modal-button-grey" onClick={() => resetModal(false)} >Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SeeStats;