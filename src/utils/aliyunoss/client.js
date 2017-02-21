import debug from 'debug';
import crypto from 'crypto';
import path from 'path';
import querystring from 'querystring';
import copy from 'copy-to';

import xml from 'xml2js';
import ms from 'humanize-ms';
import urlutil from 'url';
import is from 'is-type-of';
import platform from 'platform';
import dateFormat from 'dateformat';
import bowser from 'bowser';
import AgentKeepalive from 'agentkeepalive';

const globalHttpAgent= new AgentKeepalive();


export function PutObject(bucket,object,region,ak,sk,token,file){
    //idealcity.oss-cn-shanghai.aliyuncs.com
    console.log(bucket,object,region,ak,sk,token,file)
    let headers=genHeaders(token,file);
    let auth = authorization("PUT",headers,bucket,region,object,ak,sk,file,'')
    let url=getUrl(bucket,object,region,false,false)
    let myInit={
        method:"PUT",
        body:file,
        header:headers,
    }
    fetch(url,myInit)
    .then(response=>{
        console.log(response)
        if (response.status!=200){
            throw(new Error("put object failed"))
        }
        return true;
    })
    .catch(err=>{throw err})
}

function genHeaders(token,file){
    let ua =userAgent();
    let reader = new FileReader()
    let headers = new Headers()

    headers['x-oss-date']=dateFormat(new Date(), 'UTC:ddd, dd mmm yyyy HH:MM:ss \'GMT\'');
    headers['x-oss-user-agent']=ua;
    headers['User-Agent']=ua;
    console.log(file)
    headers['Content-Type']=file.type;
    headers['x-oss-security-token']=token;
   
   if (file){
       /*headers['Content-Md5']=crypto
        .createHash('md5')
        .update(reader.readAsArrayBuffer(file))
        .digest('base64');*/
        headers['Content-Length']=file.size;
    }

    return headers;
}

function authorization(method,headers,bucket,region,object,accessKeyId,accessKeySecret,content,subres){
    
    let resource=getResource(bucket,object)
    var params = [
        method.toUpperCase(),
        headers['Content-Md5']||'',
        getHeader(headers,'Content-Type'),
        headers['x-oss-date']
    ];

    let ossHeaders ={};
    for ( let key in headers){
        let lkey = key.toLowerCase().trim();
        if (lkey.indexOf('x-oss-')===0){
            ossHeaders[lkey] = ossHeaders[lkey]||[];
            ossHeaders[lkey].push(String(headers[key]).trim());
        }
    }

    let ossHeadersList= [];
    Object.keys(ossHeaders).sort().forEach(function(key){
        ossHeadersList.push(key+':'+ossHeaders[key].join(','));
    });

    params = params.concat(ossHeadersList);

    let resourceStr ='';
    resourceStr+=resource;

    let subresList = [];
    if (subres){
        if ( is.string(subres)){
            subresList.push(subres);
        } else if (is.array(subres)){
            subresList=subresList.concat(subres);
        } else {
            for (let k in subres) {
                let item = subres[k]?k+'='+subres[k]:k;
                subresList.push(item);
            }
        }
    }

    if (subresList.length>0){
        resourceStr+='?'+subresList.join('&');
    }
    
    params.push(resourceStr);
    let stringToSign = params.join('\n');
    let auth = 'OSS '+accessKeyId+':';
    return auth+signature(stringToSign,accessKeySecret)
}


function signature(stringToSign,accessKeySecret){
    console.log(accessKeySecret)
    let signature = crypto.createHmac('sha1',accessKeySecret);
    signature = signature.update(stringToSign).digest('base64');
    return signature;
}


function getHeader(headers, name) {
  return headers[name] || headers[name.toLowerCase()];
}

function getUrl(bucket,object,region,secure,internal){
    let protocol = secure? 'https://':'http://';
    let suffix = internal ? '-internal.aliyuncs.com':'.aliyuncs.com';
    if (region.startsWith('vpc100-oss-cn-')){
        suffix = '.aliyuncs.com'
    }

    return protocol+bucket+"."+region+suffix+object;
}

function getResource(bucket,object){
    var resource="/";
    if (bucket) resource+=bucket+'/';
    if (object) resource+=object;
    return resource
}
//function getUrl(bucket,object,region)

function userAgent(){
    var agent =  (process && process.browser) ? 'js' : 'nodejs';
    var sdk = 'aliyun-sdk-' + agent + '/' + "4.8.0";
    var plat = platform.description;
    return sdk + ' ' + plat;
}