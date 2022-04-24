import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Post from '../components/Post'
import EditPost from '../components/EditPost';
import axios from 'axios'

import PageDetails from '../components/PageDetails';

const Page = ({user}) => {

    const [posts,setPosts] = useState([])
    const [postId,setPostId] = useState(null)
    const [page,setPage] = useState(null)
    const [showPopup, setShowPopup] = useState(true)
    const [showEditPost,setShowEditPost] = useState(false)

    const { id } = useParams();

    useEffect(() => {
        getPage()
        getAllPosts()
    }, [])

    const getToken = ()=>{
        const user = JSON.parse(localStorage.getItem("user"))
        if(user){
            return user.token
        }
        return ""
    }

    const updatePosts = (update)=>{
        const index = posts.findIndex(post => post._id === update._id)
        posts[index] = update
        setPosts(posts)
    }

    const getAllPosts = ()=>{
        getToken()
        axios({
            method:"GET",
            url:`http://localhost:5000/page/${id}/post`,
            headers: {"Authorization" : `Bearer ${getToken()}`},
        }).then((response)=>{
            if(typeof(response.data) != "string") setPosts(response.data)
        })
    }

    const getPage = ()=>{
        axios({
            method:"GET",
            url:`http://localhost:5000/page/${id}`,
            headers: {"Authorization" : `Bearer ${getToken()}`},
        }).then((response)=>{
            if(typeof(response.data) != "string") setPage(response.data)
        })
    }

    const createPost = ()=>{
        axios({
            method:"GET",
            url:`http://localhost:5000/page/${id}/post/create`,
            headers: {"Authorization" : `Bearer ${getToken()}`},
        }).then((response)=>{
            if(typeof(response.data) != "string") popEditPost(response.data._id)
        })
    }

    const popEditPost = (p_id)=>{
        setPostId(p_id)
        setShowPopup(false)
        setShowEditPost(true)
    }

    const isOwner = ()=>{
        if(user){
            if(page){
                if(user.user._id == page.userId){
                    return true
                }
            }
        }
        return false
    }

    return (
        <div style={{height:'100vh'}}>
            <Modal size="lg" className="px-0" show={showEditPost} onHide={() => {setShowEditPost(false); setShowPopup(true)}} centered>
                <Modal.Header className="py-0 pt-2" closeButton>
                    <Modal.Title >Post</Modal.Title>
                </Modal.Header>
                    <EditPost user={user} p_id={postId} />
            </Modal>
            <Container style={{height:'100%'}} fluid>
                <Row className="pt-5">
                    <Col className="d-none d-md-block pr-0" md={4} lg={3} >
                        <PageDetails setPage={setPage} user={user} page={page} />
                    </Col>
                    <Col className="px-0" md={8} lg={6}>
                        <Scrollbars 
                        autoHide 
                        autoHideTimeout={100} 
                        autoHideDuration={100} 
                        style={{ height: "90vh" }} 
                        className="mt-3">
                            <div className="d-flex justify-content-between mx-2">
                                {isOwner()&&(
                                    <div className="w-50 px-2">
                                        <Button className="w-100" size="sm" variant="outline-primary" onClick={createPost} >Create New Post</Button>
                                    </div>
                                )}
                            </div>
                            {posts.length?posts.map((post)=>(<Post key={post._id} postData={post} user={user} updatePosts={updatePosts} showPopup={showPopup} popEditPost={popEditPost}/>)):""}
                        </Scrollbars>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Page
