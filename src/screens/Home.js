import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars-2';
import axios from 'axios'

import SchoolNotifications from '../components/SchoolNotifications'
import Post from '../components/Post'
import Profile from '../components/Profile'
import Search from '../components/Search'
import SmallProfile from '../components/SmallProfile'
import Login from '../components/Login'
import CreatePost from '../components/CreatePost';

const Home = ({user,userCheck}) => {
    const [posts,setPosts] = useState([])

    useEffect(() => {
        userCheck();
        getAllPosts();
    },[])

    const updatePosts = (update)=>{
        const index = posts.findIndex(post => post._id === update._id)
        posts[index] = update
        setPosts(posts)
    }

    const getToken = ()=>{
        const user = JSON.parse(localStorage.getItem("user"))
        if(user){
            return user.token
        }
        return ""
    }

    const getAllPosts = ()=>{
        getToken()
        axios({
            method:"GET",
            url:'http://localhost:5000/post/',
            headers: {"Authorization" : `Bearer ${getToken()}`},
        }).then((response)=>{
            if(typeof(response.data) != "string") setPosts(response.data)
        })
    }

    
    return (
        <div>
            <Container fluid>
                <Row className="mt-5">
                    <Col className="d-none d-md-block pr-0" md={4} lg={3} >
                        {user && user.user ? <Profile user={user} userCheck={userCheck} /> : <Login getAllPosts={getAllPosts} userCheck={userCheck} />}
                    </Col>
                    <Col className="px-0" md={8} lg={6}>
                        <Scrollbars autoHide autoHideTimeout={100} autoHideDuration={100} style={{ height: "100vh" }} className="mt-3">
                            {user && user.user ? <><SmallProfile user={user} userCheck={userCheck} /> {user.user&&user.user.updated && <><SchoolNotifications /><CreatePost /></>}</> : <div className="mx-2 mb-1 d-block d-md-none"><Login getAllPosts={getAllPosts} userCheck={userCheck} /></div>}

                            {posts.length?posts.map((post)=>(<Post key={post._id} postData={post} user={user} updatePosts={updatePosts} />)):""}
                        </Scrollbars>
                    </Col>
                    <Col className="d-none d-lg-block px-0" lg={3}>
                        <Search />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home
