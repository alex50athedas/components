import React, { useState, useRef, useForm, useEffect, Component } from 'react';
import { useParams, useSearchParams, useNavigate ,useLocation } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import FileService from '../../services/FileService';
import axios from "axios";

function UploadImageComponent() {
    const [files, setFiles] = useState([]);
    const [fileUploaded, setFileUploaded] = useState(null);
    const [uploaderName, setUploaderName] = useState("");
    let { routeid, pointid } = useParams();
    const API_URL = "http://localhost:8080/file";

    const onFileChange = (event) => {
        console.log(event.target.files);
        setFiles(event.target.files[0]);
    };

    const onUploaderNameChange = (event) =>{
       setUploaderName(event.target.value);
    };

  /*  const onUpload = (event) => {
        event.preventDefault();
        const formData = new FormData();

        for (const key of Object.keys(files)) {
            formData.append('files', files[key]);
        }
        formData.append('name', uploaderName);
        console.log(formData);
        
        FileService.uploadImage(formData).then((response) => {
            console.log(response.data);
            setFileUploaded({ fileUploaded: true });
        }).catch(error => {
            console.log(error);
        });*/

   const onFileChangeHandler = (e) => {
        e.preventDefault();
        console.log(uploaderName);
        console.log(files);
        console.log(routeid)
        console.log(pointid);
        const formData = new FormData();
        formData.append('files', files);
        formData.append('name', uploaderName);
        formData.append('routeid', routeid);
        formData.append('pointid', pointid);
        console.log(formData);
        /*fetch('http://localhost:8080/file/upload/', {
            method: 'post',
            body:  formData
            ,headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then(res => {
            if(res.ok) {
                console.log(res.data);
                alert("File uploaded successfully.")
            }
        });*/

        axios.post(API_URL+'/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then(res => {
            if(res.ok) {
                console.log(res.data);
                alert("File uploaded successfully.")
            }
        });
   
    

   /* render() {
        if(this.state.fileUploaded){
            return  <Navigate to="/my-images" replace={true} />;
        }*/

    };

        return (
            <div className='row'>
                <div className='card col-md-6 offset-md-3 mt-5'>
                    <h3 className='text-center'>Ανέβασμα εικόνας</h3>
                    <div className='card-body'>
                        <form onSubmit={onFileChangeHandler}>
                            <div>
                                <label>Επιλογή αρχείου:</label>
                                <input className='mx-2' type='file' label="Επιλογή" onChange={onFileChange}></input>
                            </div>

                            <div className="mt-3">
                                <label>Όνομα αρχείου:</label>
                                <input className='mx-2' type='text' name='uploaderName' value={uploaderName} onChange={onUploaderNameChange}></input>
                            </div>
                            <button className='btn btn-success btn-sm mt-3' type='submit' disabled={!files || !uploaderName}>Ανέβασμα αρχείου</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

export default UploadImageComponent;