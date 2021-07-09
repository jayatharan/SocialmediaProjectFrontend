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
    const [requests,setRequests] = useState([])
    const [myFriends,setMyFriends] = useState([])
    const [refresh, doRefresh] = useState(0);

    useEffect(() => {
        userCheck();
        getAllPosts();
        getPersonalDatas()
    },[])

    const getPersonalDatas = ()=>{
        getMyRequests()
        getMyFriends()
        doRefresh(prev => prev + 1)
    }

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

    const getMyRequests = ()=>{
        axios({
            method:"GET",
            url:'http://localhost:5000/request/my_requests',
            headers: {"Authorization" : `Bearer ${getToken()}`},
        }).then((response)=>{
            setRequests(response.data)
        })
    }

    const getMyFriends = ()=>{
        axios({
            method:"GET",
            url:'http://localhost:5000/user/my_friends',
            headers: {"Authorization" : `Bearer ${getToken()}`},
        }).then((response)=>{
            setMyFriends(response.data)
        })
    }

    const requestAction = (action,r_id)=>{
        axios({
            method:"GET",
            url:`http://localhost:5000/request/${action}/${r_id}`,
            headers: {"Authorization" : `Bearer ${getToken()}`},
        }).then((response)=>{
            if(action === 'accept'){
                localStorage.setItem('user', JSON.stringify(response.data))
                getMyFriends()
            }
            getMyRequests()
        }).catch((err)=>{
            getMyRequests()
        })
    }
    
    return (
        <div style={{height:'100vh'}}>
            <Container style={{height:'100%'}} fluid>
                <Row className="pt-5">
                    <Col className="d-none d-md-block pr-0" md={4} lg={3} >
                        {user && user.user ? 
                            (<Profile user={user} userCheck={userCheck} requests={requests} myFriends={myFriends} requestAction={requestAction} getMyRequests={getMyRequests}/>) 
                            : 
                            (<Login getAllPosts={getAllPosts} userCheck={userCheck} getPersonalDatas={getPersonalDatas}/>
                        )}
                    </Col>
                    <Col className="px-0" md={8} lg={6}>
                        <Scrollbars 
                        autoHide 
                        autoHideTimeout={100} 
                        autoHideDuration={100} 
                        style={{ height: "90vh" }} 
                        className="mt-3">
                            {user && user.user ? 
                            (<>
                                <SmallProfile user={user} userCheck={userCheck} requests={requests} myFriends={myFriends} requestAction={requestAction} getMyRequests={getMyRequests} refresh={refresh}/> 
                                {user.user&&user.user.updated && <><SchoolNotifications /><CreatePost /></>}
                            </> )
                            : 
                            (<div className="mx-2 mb-1 d-block d-md-none">
                                <Login getAllPosts={getAllPosts} userCheck={userCheck} getPersonalDatas={getPersonalDatas}/>
                            </div>)}

                            {posts.length?posts.map((post)=>(<Post key={post._id} postData={post} user={user} updatePosts={updatePosts} />)):""}
                        </Scrollbars>
                    </Col>
                    <Col className="d-none d-lg-block px-0" lg={3}>
                        <Search user={user} refresh={refresh}/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home
