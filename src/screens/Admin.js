import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Modal, Tabs, Tab, Form, Card, Media, Image } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars-2';
import axios from 'axios'

import PersonProfile from '../smallComponents/PersonProfile';
import Post from '../components/Post'

const Admin = ({user}) => {
    const [userData, setUserData] = useState(null)

    const [choice, setChoice] = useState({
        "userType": [],
        "medium": [],
        "district": [],
        "grade": [],
        "subject": []
    })

    const [posts,setPosts] = useState([])
    const [users,setUsers] = useState([])
    const [pages,setPages] = useState([])
    const [schools, setSchools] = useState([])

    const [userFilter,setUserFilter] = useState({
        userType:"",
        district:"",
        medium:"",
        grade:"",
        school:"",
        class:"",
        email:""
    })

    const getSchools = (dst) => {
        axios({
            method: "GET",
            url: "http://localhost:5000/user/filter_users",
            params: {
                "district":dst?dst:userFilter.district,
                "userType":"School"
            } 
        }).then((res)=>{
            setSchools(res.data)
        })
    }

    const getUsersItems = (u_id)=>{
        axios({
            method: "GET",
            url: `http://localhost:5000/user/user_data/${u_id}`,
        }).then((res)=>{
            console.log(res.data)
            setPosts(res.data.posts)
            setPages(res.data.pages)
        })
    }

    useEffect(() => {
        if(userData&&userData._id){
            getUsersItems(userData._id)
        }
    }, [userData]);
    

    const getFilteredUsers = ()=>{
        axios({
            method: "GET",
            url: "http://localhost:5000/user/filter_users",
            params: userFilter
        }).then((res)=>{
            setUsers(res.data)
        })
    }

    useEffect(() => {
      getFilteredUsers()
    }, [userFilter]);

    useEffect(() => {
        getSchools()
    }, []);

    const handleUserFilterChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setUserFilter({ ...userFilter, [name]: value })
        if(name == "district") getSchools(value)
    }

    useEffect(() => {
        getChoices()
    }, [])

    const getChoices = () => {
        axios({
            method: "GET",
            url: "http://localhost:5000/getChoices",
        }).then((response) => {
            setChoice(response.data)
        })
    }

    useEffect(() => {
      console.log(userData)
    }, [userData]);
    
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
                                <Form>
                                    <Form.Row className="align-items-center mb-1">
                                        <Col xs="auto" className="w-50">
                                            <Form.Label className="mr-2" htmlFor="inlineFormCustomSelectPref">
                                                User Type
                                            </Form.Label>
                                        </Col>
                                        <Col xs="auto" className="w-50">
                                            <Form.Control
                                                as="select"
                                                size="sm"
                                                className="mr-sm-2 py-0"
                                                id="inlineFormCustomSelectPref"
                                                name="userType"
                                                onChange={handleUserFilterChange}
                                                custom
                                                value={userFilter.userType}
                                            >
                                                <option value="">All</option>
                                                {choice.userType.map((typ, idx) => (<option key={idx} value={typ}>{typ}</option>)
                                                )}
                                                <option value="Admin">Admin</option>
                                            </Form.Control>
                                        </Col>
                                    </Form.Row>
                                    <Form.Row className="align-items-center mb-1">
                                        <Col xs="auto" className="w-50">
                                            <Form.Label className="my-1 mr-2" htmlFor="districtSelect">
                                                District
                                            </Form.Label>
                                        </Col>
                                        <Col xs="auto" className="w-50">
                                            <Form.Control
                                                size="sm"
                                                as="select"
                                                className="mr-sm-2"
                                                name="district"
                                                value={userFilter.district}
                                                onChange={handleUserFilterChange}
                                                id="districtSelect"
                                                custom
                                            >
                                                <option value=""></option>
                                                {choice.district.map((dst, idx) => (
                                                    <option size="sm" key={idx} value={dst}>{dst}</option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                    </Form.Row>
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
                                                onChange={handleUserFilterChange}
                                                custom
                                                value={userFilter.medium}
                                            >
                                                <option value="">All</option>
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
                                                value={userFilter.grade}
                                                onChange={handleUserFilterChange}
                                                custom
                                            >
                                                <option value="">All</option>
                                                {choice.grade.map((grd, idx) => (
                                                    <option size="sm" key={idx} value={grd}>{grd}</option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                    </Form.Row>
                                    <Form.Row className="align-items-center mb-1">
                                        <Col xs="auto" className="w-50">
                                            <Form.Label className="my-1 mr-2" htmlFor="districtSelect">
                                                School
                                            </Form.Label>
                                        </Col>
                                        <Col xs="auto" className="w-50">
                                            <Form.Control
                                                size="sm"
                                                as="select"
                                                className="mr-sm-2"
                                                name="school"
                                                value={userFilter.school}
                                                onChange={handleUserFilterChange}
                                                id="schoolSelect"
                                                custom
                                            >
                                                <option value=""></option>
                                                {schools.map((sch, idx) => (
                                                    <option size="sm" key={idx} value={sch._id}>{sch.name}</option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                    </Form.Row>
                                    <Form.Row className="align-items-center mb-1">
                                        <Col xs="auto" className="w-50">
                                            <Form.Label className="my-1 mr-2" htmlFor="districtSelect">
                                                Class
                                            </Form.Label>
                                        </Col>
                                        <Col xs="auto" className="w-50">
                                        <Form.Control
                                                size="sm"
                                                as="select"
                                                className="mr-sm-2"
                                                name="class"
                                                value={userFilter.class}
                                                onChange={handleUserFilterChange}
                                                id="classSelect"
                                                custom
                                            >
                                                <option value="">All</option>
                                                <option value="A">A</option>
                                                <option value="B">B</option>
                                                <option value="C">C</option>
                                                <option value="D">D</option>
                                                <option value="E">E</option>
                                                <option value="F">F</option>
                                            </Form.Control>
                                        </Col>
                                    </Form.Row>
                                </Form>
                                <div>
                                    {users.map((u)=>(
                                        <div onClick={()=>setUserData(u)}>
                                            <PersonProfile friend={u} />
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </Scrollbars>
                    </Col>
                    <Col lg={9}>
                        <Container>
                            {userData&&(
                                <Card className="mx-2 mt-1 mb-1">
                                    <Media className="px-2 py-2">
                                        <Image width={65} height={65} className="mr-3" src={userData.avatar} roundedCircle />
                                        <Media.Body>
                                        <div class="d-flex flex-column">
                                            <h3>{userData.name}</h3>
                                            <b>{userData.email}</b>
                                        </div>
                                        </Media.Body>
                                    </Media>
                                </Card>
                            )}
                            <Scrollbars 
                            autoHide 
                            autoHideTimeout={100} 
                            autoHideDuration={100} 
                            style={{ height: "90vh" }} 
                            className="mt-3">
                                {posts.length?posts.map((post)=>(<Post key={post._id} postData={post} user={user} updatePosts={updatePosts} showPopup={false} popEditPost={popEditPost}/>)):""}
                            </Scrollbars>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default Admin;
