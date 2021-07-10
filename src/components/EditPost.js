import { useEffect, useState } from 'react'
import { Row, Col, Form, Button, Spinner, Modal, Alert } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars-2';

import axios from 'axios'

import Post from './Post'

const EditPost = ({p_id}) => {
    const [loading,setLoading] = useState(false)
    const [postData,setPostData] = useState(null)
    const [showHeader, setShowHeader] = useState(false);
    const [updateSuccess,setUpdateSuccess] = useState(false);

    useEffect(() => {
        getPostData()
    }, [])

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

    return (
        <div>
            <Scrollbars style={{ height: "80vh" }}>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} className="px-0 mt-2">
                        
                        {showHeader&&(
                            <div>
                                {updateSuccess?<Alert variant="success" className="text-center">Updated Successfully</Alert>:<Alert variant="danger" className="text-center">Update Failed</Alert>}
                            </div>
                        )}
                        
                        <Modal.Dialog>
                            <Modal.Body>
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
                                        <Form.Control as="textarea" rows={5} name="description" onChange={handleChange} className="py-0" type="text" value={postData&&postData.description} />
                                    </Form.Group>
                                     <Button className="mt-2" variant="primary" size="sm" block onClick={updatePostValues} >
                                        Update Post {loading&&(<Spinner className="ml-2" size="sm" animation="border" variant="dark" />)}
                                    </Button>
                                </Form>
                            </Modal.Body>
                        </Modal.Dialog>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} className="px-0 mt-2">
                        {postData&&<Post postData={postData} />}
                    </Col>
                </Row>
            </Scrollbars>
        </div>
    )
}

export default EditPost
