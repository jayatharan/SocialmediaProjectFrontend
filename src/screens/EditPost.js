import { useEffect, useState } from 'react'
import { Container ,Row, Col, Form, Button, Spinner, Modal, Alert, Card } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars-2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useDrivePicker from 'react-google-drive-picker'
import { useParams } from 'react-router-dom';
import { MdDelete } from "react-icons/md";

import Post from '../components/Post'

import axios from 'axios'

const EditPost = () => {
    const [openPicker, data, authResponse] = useDrivePicker(); 
    const [loading,setLoading] = useState(false)
    const [postData,setPostData] = useState(null)
    const [showHeader, setShowHeader] = useState(false);
    const [updateSuccess,setUpdateSuccess] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        getPostData()
    }, [id])

    useEffect(() => {
        if(data){
            if(postData){
                var files = [...postData.files]
                data.docs.map((file)=>{
                    files.push({
                        "drive_id":file.id,
                        "icon_url":file.iconUrl,
                        "preview_url":file.embedUrl,
                        "view_url":file.url,
                        "name":file.name
                    })
                })
            }
            setPostData({...postData,["files"]:files})
        }
    }, [data])

    const handleChange = (e)=>{
        var name = e.target.name
        var value = e.target.value
        setPostData({...postData,[name]:value})
    }

    const youtube_parser = (url)=>{
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length===11)? match[7] : false;
    }

    const setYoutubeId = (e)=>{
        var youtube_id = youtube_parser(e.target.value)
        setPostData({...postData,youtubeId:youtube_id})
    }

    const getYoutubeUrl = ()=>{
        var url = `https://www.youtube.com/watch?v=${postData&&postData.youtubeId}`
        if(url === "https://www.youtube.com/watch?v=undefined" || url === "https://www.youtube.com/watch?v=false")  return ""
        else return url
    }

    const getPostData = ()=>{
        axios({
            method:"GET",
            url:`http://localhost:5000/post/${id}`,
        }).then((response)=>{
            setPostData(response.data)
        })
    }

    const updatePostValues = ()=>{
        setLoading(true)
        axios({
            method:"POST",
            url:`http://localhost:5000/post/update/${id}`,
            headers: {"Authorization" : `Bearer ${JSON.parse(localStorage.getItem("user")).token}`},
            data: postData,
        }).then((response)=>{
            showAlert(true)
        }).catch((err)=>{
            showAlert(false)
        })
    }

    const showAlert = (msg)=>{
        setLoading(false)
        if(msg){
            setUpdateSuccess(true)
        }else{
            setUpdateSuccess(false)
        }
        setShowHeader(true)
        setTimeout(() => setShowHeader(false), 2000);
    }

    const handleQuill = (e)=>{
        if(postData){
            setPostData({...postData,["description"]:e})
        }
    }

    const handleOpenPicker = () => {
        openPicker({
          clientId: "1024970411628-b4s6qus2bui9efecamg85p7e1t9unnsg.apps.googleusercontent.com",
          developerKey: "AIzaSyDm8H4Ag5f_XzbJajprwejMij6V8LSmRGo",
          viewId: "DOCS",
          // token: token, // pass oauth token in case you already have one
          showUploadView: true,
          showUploadFolders: true,
          supportDrives: true,
          multiselect: true,
          disableDefaultView:false,
          // customViews: customViewsArray, // custom view
        })
    }

    const removeFile = (i)=>{
        var files = [...postData.files]
        files.splice(i,1)
        setPostData({...postData,["files"]:files})
    }

    return (
        <div className="mt-5" style={{height:'100vh'}}>
            <Container>
            <Row>
                <Col xs={12} sm={12} md={12} lg={6} className="mt-2">
                    <div className="p-2">
                    {showHeader&&(
                        <div>
                            {updateSuccess?<Alert variant="success" className="text-center">Updated Successfully</Alert>:<Alert variant="danger" className="text-center">Update Failed</Alert>}
                        </div>
                    )}

                    <Form>
                        <Form.Group controlId="postTitle" className="mb-0">
                            <Form.Label className="mb-0">Post Title</Form.Label>
                            <Form.Control name="title" onChange={handleChange} className="py-0" type="text" value={postData&&postData.title} />
                        </Form.Group>
                        <Form.Group controlId="postYoutubeId" className="mb-0">
                            <Form.Label className="mb-0">Youtube URL</Form.Label>
                            <Form.Control onChange={setYoutubeId} className="py-0" type="text" value={getYoutubeUrl()} />
                        </Form.Group>
                        <Form.Group controlId="postDescription" className="mb-0">
                            <Form.Label className="mb-0">Description</Form.Label>
                            {/* <Form.Control as="textarea" rows={5} name="description" onChange={handleChange} className="py-0" type="text" value={postData&&postData.description} /> */}
                            <ReactQuill theme="snow" value={postData&&postData.description} onChange={handleQuill} />
                        </Form.Group>
                        {/* <Button className="mt-2" variant="primary" size="sm" block onClick={handleOpenPicker} >
                            OpenPicker
                        </Button> */}
                        <Form.Group controlId="postFiles" className="mt-2 mb-0">
                            <Form.Label className="mb-0">Pick Files From Google Drive</Form.Label>
                            <Button className="ml-2" variant="success" size="sm" onClick={handleOpenPicker} >
                                Add Files
                            </Button>
                        </Form.Group>
                        <Form.Group controlId="postFilesView" className="mt-2 mb-0">
                            <Form.Label className="mb-0">Files</Form.Label>
                            <Card>
                                {postData&&postData.files.map((file,idx)=>(
                                    <div key={idx}>
                                        <small className="mx-2">{file.name}</small>
                                        <span className="text-danger"><MdDelete onClick={()=>removeFile(idx)} /></span>
                                    </div>
                                ))}
                            </Card>
                        </Form.Group>
                        <Form.Group controlId="postDescription" className="mb-0">
                            <Button className="mt-2" variant="primary" size="sm" block onClick={updatePostValues} >
                                Update Post {loading&&(<Spinner className="ml-2" size="sm" animation="border" variant="dark" />)}
                            </Button>
                        </Form.Group>
                    </Form>
                    </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} className="mt-2">
                    {postData?<Post postData={postData} />:""}
                </Col>
            </Row>
            </Container>
        </div>
    )
}

export default EditPost
