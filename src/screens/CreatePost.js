import React,{ useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios'
import { Modal } from 'react-bootstrap';

import Post from '../components/Post'
    
const CreatePost = () => {
    const [loading,setLoading] = useState(false)
    const { id } = useParams();
    const [postData,setPostData] = useState(null)
    
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
        if(url === "https://www.youtube.com/watch?v=undefined")  return ""
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
            setLoading(false)
        })
    }

    return (
        <div>
            <Container>
                <Row className="mt-5">
                    <Col xs={12} sm={12} md={6} className="px-0 mt-2">
                        <Modal.Dialog>
                            <Modal.Header className="py-0">
                                <Modal.Title>Edit Post</Modal.Title>
                            </Modal.Header>
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
                                        <Form.Control as="textarea" rows={3} name="description" onChange={handleChange} className="py-0" type="text" value={postData&&postData.description} />
                                    </Form.Group>
                                     <Button className="mt-2" variant="primary" size="sm" block onClick={updatePostValues} >
                                        Update Post {loading&&(<Spinner className="ml-2" size="sm" animation="border" variant="dark" />)}
                                    </Button>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Col>
                    <Col xs={12} sm={12} md={6} className="px-0 mt-2">
                        {postData&&<Post postData={postData} />}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CreatePost
