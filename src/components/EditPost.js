import { useEffect, useState } from 'react'
import { Row, Col, Form, Button, Spinner, Modal, Alert } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars-2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useDrivePicker from 'react-google-drive-picker'
import { Link } from 'react-router-dom';

import axios from 'axios'

import Post from './Post'

const EditPost = ({p_id}) => {
    const [openPicker, data, authResponse] = useDrivePicker(); 
    const [loading,setLoading] = useState(false)
    const [postData,setPostData] = useState(null)
    const [showHeader, setShowHeader] = useState(false);
    const [updateSuccess,setUpdateSuccess] = useState(false);
    const [choice, setChoice] = useState({
        "userType": [],
        "medium": [],
        "district": [],
        "grade": [],
        "subject": []
    })
    useEffect(() => {
        getPostData()
        getChoices()
    }, [])

    useEffect(() => {
        console.log(data)
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

    const getChoices = () => {
        axios({
            method: "GET",
            url: "http://localhost:5000/getChoices",
        }).then((response) => {
            setChoice(response.data)
        })
    }

    const getPostData = ()=>{
        axios({
            method:"GET",
            url:`http://localhost:5000/post/${p_id}`,
        }).then((response)=>{
            setPostData(response.data)
        })
    }

    const updatePostValues = ()=>{
        setLoading(true)
        axios({
            method:"POST",
            url:`http://localhost:5000/post/update/${p_id}`,
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
    //clientId:"359230376538-j79misgqm7inonvgpgfkvafa440li4fe.apps.googleusercontent.com"
    const handleOpenPicker = () => {

        openPicker({
          clientId:"359230376538-j79misgqm7inonvgpgfkvafa440li4fe.apps.googleusercontent.com",
          //clientId: "686177336588-qhhagupocke5qsclkt0n07h9s6c8bbpu.apps.googleusercontent.com",
          developerKey: "AIzaSyDQ_e-BYGipNfVI23oyqg2A9q4pKho68CI",
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

    return (
        <div>
            <Scrollbars style={{ height: "80vh" }}>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} className="mt-2">
                        
                        {showHeader&&(
                            <div>
                                {updateSuccess?<Alert variant="success" className="text-center">Updated Successfully</Alert>:<Alert variant="danger" className="text-center">Update Failed</Alert>}
                            </div>
                        )}
                        
                        <Modal.Dialog>
                            <Modal.Body>
                                <Form>
                                    <Form.Row className="align-items-center mb-1">
                                        <Col xs="auto" className="w-50">
                                            <Form.Label className="my-1 mr-2" htmlFor="mediumSelect">
                                                Medium
                                            </Form.Label>
                                        </Col>
                                        <Col xs="auto" className="w-50">
                                            <Form.Control
                                                size="sm"
                                                as="select"
                                                className="mr-sm-2"
                                                id="mediumSelect"
                                                name="medium"
                                                value={postData&&postData.medium}
                                                onChange={handleChange}
                                                custom  
                                            >
                                                <option value=""></option>
                                                {choice.medium.map((lan, idx) => (
                                                    <option key={idx} value={lan}>{lan}</option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                    </Form.Row>
                                    <Form.Row className="align-items-center mb-1">
                                        <Col xs="auto" className="w-50">
                                            <Form.Label className="my-1 mr-2" htmlFor="gradeSelect">
                                                Grade
                                            </Form.Label>
                                        </Col>
                                        <Col xs="auto" className="w-50">
                                            <Form.Control
                                                size="sm"
                                                as="select"
                                                className="mr-sm-2"
                                                id="gradeSelect"
                                                name="grade"
                                                value={postData&&postData.grade}
                                                onChange={handleChange}
                                                custom
                                            >
                                                <option value=""></option>
                                                {choice.grade.map((grd, idx) => (
                                                    <option size="sm" key={idx} value={grd}>{grd}</option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                    </Form.Row>
                                    <Form.Group controlId="postTitle" className="mb-0">
                                        <Form.Label className="mb-0">
                                            {postData&&postData.type == "post"?(
                                                <>Post Title</>
                                            ):(<>Subject</>
                                            )}
                                            
                                        </Form.Label>
                                        <Form.Control name="title" onChange={handleChange} className="py-0" type="text" value={postData&&postData.title} />
                                    </Form.Group>
                                    {postData&&postData.type == "post" && (
                                        <Form.Group controlId="postYoutubeId" className="mb-0">
                                            <Form.Label className="mb-0">Youtube URL</Form.Label>
                                            <Form.Control onChange={setYoutubeId} className="py-0" type="text" value={getYoutubeUrl()} />
                                        </Form.Group>
                                    )}
                                    <Form.Group controlId="postDescription" className="mb-0">
                                        <Form.Label className="mb-0">{postData&&postData.type == "post"?(
                                                <>Description</>
                                            ):(<>Question</>
                                            )}</Form.Label>
                                        {/* <Form.Control as="textarea" rows={5} name="description" onChange={handleChange} className="py-0" type="text" value={postData&&postData.description} /> */}
                                        <ReactQuill theme="snow" value={postData&&postData.description} onChange={handleQuill} />
                                    </Form.Group>
                                    {/* <Button className="mt-2" variant="primary" size="sm" block onClick={handleOpenPicker} >
                                        OpenPicker
                                    </Button> */}
                                    {postData&&postData.type == "post" && (
                                    <Form.Group controlId="postFiles" className="mt-2 mb-0">
                                        <Form.Label className="mb-0">Pick Files From Google Drive</Form.Label>
                                        <Link to={`/edit-post/${p_id}`}> OPEN </Link>
                                    </Form.Group>
                                    )}
                                    <Form.Group controlId="postDescription" className="mb-0">
                                        <Button className="mt-2" variant="primary" size="sm" block onClick={updatePostValues} >
                                        {postData&&postData.type == "post"?(
                                                <>Update Post</>
                                            ):(<>Update Question</>
                                            )} {loading&&(<Spinner className="ml-2" size="sm" animation="border" variant="dark" />)}
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                        </Modal.Dialog>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} className="mt-2">
                        {postData?<Post postData={postData} />:""}
                    </Col>
                </Row>
            </Scrollbars>
        </div>
    )
}

export default EditPost
