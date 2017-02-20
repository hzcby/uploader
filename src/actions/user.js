import * as types from '../constants/ActionTypes';



export function login(user){
    return (dispatch,getState) =>{
        let header = new Headers();
        let myInit = {
            method:"POST",
            header:header,
            body:JSON.stringify(user),
        }
        fetch("/login",myInit)
        .then(response=>{response.json()})
        .then((data)=>{
            if (data.Code===0){
                dispatch(loginstate())
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

export function logout(){
    return (dispatch,getState)=>{
        let header = new Headers();
        let myInit={
            method:"POST",
            header:header,
        }
        fetch("/loginout",myInit)
        .then(response=>{response.json()})
        .then((data)=>{
            if (data.Code===0){
                dispatch(loginoutstate())
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

function loginstate(){
    return {
        type:types.LOGIN,
        userid:1,
    }
}

function loginoutstate(){
    return {
        type:types.LOGOUT,
        userid:0,
    }
}