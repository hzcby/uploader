import * as types from '../constants/ActionTypes';
import crypto from 'crypto';
import fs from 'browserify-fs'
import {PutObject } from '../utils/aliyunoss/client';

export function createContract(file,sha){
    return (dispatch,getState)=>{
         let ext = (file.name).substring(file.name.lastIndexOf('.')+1);
        let myheaders = new Headers();
        let myInit = {
                method:"POST",
                headers:myheaders,
                body:JSON.stringify({ContractName:file.name,Sha256Value:sha,Ext:ext}),
        }
        fetch("/v1/contracts?userid=1",myInit)
        .then(response=>{
            let data =response.json()
            if (data['Code']===0){
                let res=PutObject("idealcity","/users/1/"+sha+"."+ext,"oss-cn-shanghai",data.Credentials.AccessKeyId,data.Credentials.AccessKeySecret,data.Credentials.SecurityToken,file)
                
                if (res){
                    alert("upload success")
                }              
            }
        })
        .catch(err =>{console.log(err)})
    }
}