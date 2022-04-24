import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Modal, Tabs, Tab, Form, Card, Media, Image, Button } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars-2';
import axios from 'axios';
import PersonProfile from '../smallComponents/PersonProfile';
import Post from '../components/Post'

const ReportedPosts = ({user}) => {
    const [posts,setPosts] = useState([])
    const [users,setUsers] = useState([])

    const getReportedPosts = ()=>{
        axios({
            method: "GET",
            url: "http://localhost:5000/post/reported_post"
        }).then((res)=>{
            setPosts(res.data.posts)
            setUsers(res.data.users)
        })
    }

    const resolveReport = (post_id, status) => {
        axios({
            method:"POST",
            url:`http://localhost:5000/post/report/${post_id}/resolve`,
            data:{
                delete:status
            }
        }).then((res)=>{
            getReportedPosts()
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(() => {
        getReportedPosts()
    }, []);
    
    const updatePosts = ()=>{

    }

    const popEditPost = ()=>{
        
    }

    return(
        <div style={{height:'100vh'}}>
            <Container style={{height:'100%'}} fluid>
                <Row className="pt-5">
                    <Col lg={3} >
                        <Scrollbars 
                        autoHide 
                        autoHideTimeout={100} 
                        autoHideDuration={100} 
                        style={{ height: "90vh" }} 
                        className="mt-3">
                            <Card className="mx-2 px-2 pb-2">
                                <Card.Title>Users</Card.Title>
                                <div>
                                    {users.map((u)=>(
                                        <div>
                                            <PersonProfile friend={u} />
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </Scrollbars>
                    </Col>
                    <Col lg={9}>
                    <Scrollbars 
                    autoHide 
                    autoHideTimeout={100} 
                    autoHideDuration={100} 
                    style={{ height: "90vh" }} 
                    className="mt-3">
                        {posts.length?posts.map((post)=>(
                            <Card className="pb-1">
                                <Post key={post._id} postData={post} user={user} updatePosts={updatePosts} showPopup={false} popEditPost={popEditPost}/>
                                <div className="d-flex justify-content-center">
                                    <div className="w-50">
                                        <Button className="w-50" variant="success" onClick={()=>resolveReport(post._id,false)}>Resolve</Button>
                                        <Button className="w-50" variant="danger" onClick={()=>resolveReport(post._id,true)}>Delete</Button>
                                    </div>
                                </div>
                            </Card>
                        )):""}
                    </Scrollbars>
                    </Col>
                </Row>
            </Container>
        </div>
    ) ;
};

export default ReportedPosts;
