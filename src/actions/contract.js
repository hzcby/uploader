import * as types from '../constants/ActionTypes';
import crypto from 'crypto';
import fs from 'browserify-fs'
import {PutObject } from '../utils/aliyunoss/client';

export function createContract(file,sha){
    //return (dispatch,getState)=>{
    let ext = (file.name).substring(file.name.lastIndexOf('.')+1);
    let myheaders = new Headers();
    let myInit = {
                method:"POST",
                headers:myheaders,
                body:JSON.stringify({ContractName:file.name,Sha256Value:sha,Ext:ext}),
    }
    let data = fetch("/v1/contracts?userid=1",myInit)
        .then(response=>{
            return response.json().then(data=>{
                console.log(data)
                data=data.Credentials
                let res=PutObject("idealcity","/users/1/"+sha+"."+ext,"oss-cn-shanghai",data.AccessKeyId,data.AccessKeySecret,data.SecurityToken,file)
                return data;
            })
        })
        .catch(err =>{console.log(err)})
    
    console.log(data)
   

    
}