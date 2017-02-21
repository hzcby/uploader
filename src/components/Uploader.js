import React, {Component, PropTypes} from 'react'
import FlatButton from 'material-ui/FlatButton';
import {createContract} from '../actions/contract';
import crypto from 'crypto';
import fs from 'fs';


class Uploader extends Component {
    constructor (props) {
        super(props)
        this.setContractFile=this.setContractFile.bind(this)
        this.setContractName=this.setContractName.bind(this)
        this.upLoad=this.upLoad.bind(this)
    }

/*
    componentWillMount () {

    }

    componentDidMount () {

    }

    componentWillReceiveProps (nextProps) {

    }

    shouldComponentUpdate (nextProps, nextState) {

    }

    componentWillUpdate (nextProps, nextState) {

    }

    componentDidUpdate (prevProps, prevState) {

    }

    componentWillUnmount () {

    }
*/
    setContractName(e){
        this.setState({setContractName:e.target.value})
    }
    setContractFile(){
        const file = document.getElementById("uploadfile").files[0];
        let sha="";
        let h = crypto.createHash("md5");
        let reader = new FileReader();
        let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
        let chunkSize=1024;
        let currentChunk=0;
        let chunks=Math.ceil(file.size / chunkSize);
        let ext = (file.name).substring(file.name.lastIndexOf('.')+1);
        
        reader.onload=function(e) {
                h=h.update(e.target.result)
                currentChunk++;
                if (currentChunk<chunks){
                    loadNext();
                }else{
                    console.log("finished");
                    sha=h.digest("hex");
                    
                    console.log(sha);
                }
        };

        reader.onloadend=()=>{
            console.log(sha);
            this.setState({Sha256Vaule:sha});
        }
        reader.onerror=function(){
            console.warn("oops something went wrong");
        };
        
        function loadNext(){
            let start=currentChunk*chunkSize;
            let end = ((start+chunkSize)>file.size)?file.size:start+chunkSize;
            reader.readAsArrayBuffer(blobSlice.call(file,start,end))
        };

        loadNext(); 
        console.log(file)
        this.setState({file:file})
        
    }
    upLoad(){
        const {dispatch} = this.props;
        const {file,Sha256Vaule}= this.state;
        console.log(Sha256Vaule);
        //const file = document.getElementById("uploadfile").files[0];
        createContract(file,Sha256Vaule)
    }
    render () {
        return (
            <div>
                <input name="输入合同名称" type="text" onChange={this.setContractName}/>
                <input id="uploadfile" type="file" name="合同文件"  onChange={this.setContractFile}/>
                <FlatButton name="上传文件" label="确定" onClick={this.upLoad}/>
            </div>
        )
    }
}

Uploader.propTypes = {
    dispatch:PropTypes.func.isRequired,
}

export default Uploader