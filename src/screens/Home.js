import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars-2';
import axios from 'axios'

import SchoolNotifications from '../components/SchoolNotifications'
import Post from '../components/Post'
import Profile from '../components/Profile'
import Search from '../components/Search'
import SmallProfile from '../components/SmallProfile'
import Login from '../components/Login'
import CreatePost from '../components/CreatePost';
import EditPost from '../components/EditPost';
import EditPage from '../components/EditPage';
import EditLab from '../components/EditLab';
import SchoolSendNotifications from '../components/SchoolSendNotifications';
import SchoolSearchItems from '../components/SchoolSearchItems';

const Home = ({user,userCheck}) => {
    
    const [posts,setPosts] = useState([])
    const [requests,setRequests] = useState([])
    const [myFriends,setMyFriends] = useState([])
    const [notifications,setNotifications] = useState([])
    const [refresh, doRefresh] = useState(0)
    const [showPopup, setShowPopup] = useState(true)
    const [showEditPost,setShowEditPost] = useState(false)
    const [postId,setPostId] = useState(null)
    const [showEditPage,setShowEditPage] = useState(false)
    const [pageId,setPageId] = useState(null)
    const [myPages,setMyPages] = useState([])
    const [followingPages,setFollowingPages] = useState([])
    const [myLabs, setMyLabs] = useState([])
    const [showEditLab,setShowEditLab] = useState(false)
    const [labId,setLabId] = useState(null)

    useEffect(() => {
        userCheck();
        getAllPosts();
        getPersonalDatas()
        setShowPopup(true)
    },[])

    const getPersonalDatas = ()=>{
        getMyRequests()
        getMyFriends()
        getMyPages()
        getMyLabs()
        getFollowingPages()
        getMyNotifications()
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

    const getMyNotifications = ()=>{
        axios({
            method:"GET",
            url:'http://localhost:5000/user/my_notifications',
            headers: {"Authorization" : `Bearer ${getToken()}`},
        }).then((response)=>{
            setNotifications(response.data)
        })
    }

    const getFollowingPages = ()=>{
        axios({
            method:"GET",
            url:'http://localhost:5000/user/following-pages',
            headers: {"Authorization" : `Bearer ${getToken()}`},
        }).then((response)=>{
            setFollowingPages(response.data)
        })
    }

    const getMyPages = ()=>{
        axios({
            method:"GET",
            url:'http://localhost:5000/page/my-pages',
            headers: {"Authorization" : `Bearer ${getToken()}`},
        }).then((response)=>{
            setMyPages(response.data)
        })
    }

    const getMyLabs = ()=>{
        axios({
            method:"GET",
            url:'http://localhost:5000/lab',
            headers:{"Authorization" : `Bearer ${getToken()}`}
        }).then((res)=>{
            setMyLabs(res.data)
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

    const popEditPost = (p_id)=>{
        setPostId(p_id)
        setShowPopup(false)
        setShowEditPost(true)
    }

    const popEditPage = (p_id)=>{
        setPageId(p_id)
        setShowPopup(false)
        setShowEditPage(true)
    }

    const popEditLab = (p_id)=>{
        setLabId(p_id)
        setShowPopup(false)
        setShowEditLab(true)
    }

    const openPageEdit = ()=>{
        axios({
            method:"GET",
            url:'http://localhost:5000/page/create',
            headers: {"Authorization" : `Bearer ${JSON.parse(localStorage.getItem("user")).token}`}
        }).then((response)=>{
            popEditPage(response.data._id)
        }).catch((err)=>{
            
        })
    }

    const openLabEdit = ()=>{
        axios({
            method:"GET",
            url:'http://localhost:5000/lab/create',
            headers: {"Authorization" : `Bearer ${JSON.parse(localStorage.getItem("user")).token}`}
        }).then((response)=>{
            popEditLab(response.data._id)
        }).catch((err)=>{
       
        })
    }

    return (
        <div style={{height:'100vh'}}>
            <Modal size="lg" className="px-0" show={showEditPost} onHide={() => {setShowEditPost(false); setShowPopup(true)}} centered>
                <Modal.Header className="py-0 pt-2" closeButton>
                    {/* <Modal.Title >Post</Modal.Title> */}
                </Modal.Header>
                    <EditPost user={user} p_id={postId} />
            </Modal>
            <Modal className="px-0" show={showEditPage} onHide={() => {setShowEditPage(false); setShowPopup(true)}} centered>
                <Modal.Header className="py-0 pt-2" closeButton>
                    <Modal.Title >Page</Modal.Title>
                </Modal.Header>
                    <EditPage p_id={pageId} />
            </Modal>
            <Modal className="px-0" show={showEditLab} onHide={() => {setShowEditLab(false); setShowPopup(true)}} centered>
                <Modal.Header className="py-0 pt-2" closeButton>
                    <Modal.Title >Lab</Modal.Title>
                </Modal.Header>
                    <EditLab l_id={labId} />
                    {/* <EditPage p_id={pageId} /> */}
            </Modal>
            <Container style={{height:'100%'}} fluid>
                <Row className="pt-5">

                    <Col className="d-none d-md-block pr-0" md={4} lg={3} >
                        {user && user.user ? 
                            (<Profile notifications={notifications} followingPages={followingPages} myPages={myPages} myLabs={myLabs} openPageEdit={openPageEdit} openLabEdit={openLabEdit} user={user} userCheck={userCheck} requests={requests} myFriends={myFriends} requestAction={requestAction} getMyRequests={getMyRequests} setShowPopup={setShowPopup}/>) 
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
                                <SmallProfile notifications={notifications} followingPages={followingPages} myPages={myPages} myLabs={myLabs} user={user} openPageEdit={openPageEdit} openLabEdit={openLabEdit} userCheck={userCheck} requests={requests} myFriends={myFriends} requestAction={requestAction} getMyRequests={getMyRequests} refresh={refresh} setShowPopup={setShowPopup}/> 
                                {user.user&&user.user.updated && (<>
                                {user.user.userType != "School" ? (
                                    <SchoolNotifications notifications={notifications} />
                                ):(
                                    <>
                                        <SchoolSendNotifications />
                                        <SchoolSearchItems />
                                    </>
                                )}
                                <CreatePost popEditPost={popEditPost} />
                                </>)}
                            </> )
                            : 
                            (<div className="mx-2 mb-1 d-block d-md-none">
                                <Login getAllPosts={getAllPosts} userCheck={userCheck} getPersonalDatas={getPersonalDatas}/>
                            </div>)}

                            {posts.length?posts.map((post)=>(<Post key={post._id} postData={post} user={user} updatePosts={updatePosts} showPopup={showPopup} popEditPost={popEditPost}/>)):""}
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
