import React, { useReducer } from 'react';
// import uuid from 'uuid';
import UserInfoContext from './UserInfoContext';
import UserInfoReducer from './UserInfoReducer';
// import {

// } from '../types';

const UserInfoState = props => {
    const initialState = {
        UserInfo: {
            user: 'UniqueID12341234',
            userName: 'userX',
        }
    };

const [state] = useReducer(UserInfoReducer, initialState); //add dispatch when needed
    return (
        <UserInfoContext.Provider
            value={{
                UserInfo: state.UserInfo
            }}>
        { props.children }
        </UserInfoContext.Provider>
    )
};

export default UserInfoState;