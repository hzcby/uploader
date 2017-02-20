import * as types from '../constants/ActionTypes'

const initialState={
    userid:0,
};


export default function user(state=initialState,action){
    switch (action.type) {
        case types.LOGIN:
            return Object.assign({},state,{userid:action.userid});
        case types.LOGOUT:
            return initialState;
        default:
            return initialState;
    }
}