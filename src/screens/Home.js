import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars-2';

import SchoolNotifications from '../components/SchoolNotifications'
import Navigation from '../components/Navigation'
import Post from '../components/Post'
import Profile from '../components/Profile'
import Search from '../components/Search'
import SmallProfile from '../components/SmallProfile'
import Login from '../components/Login'

const Home = () => {

    const [user, setUser] = useState(null)

    useEffect(() => {
        userCheck();
    }, [])

    const userCheck = () => { 
        if(localStorage.getItem('user')) setUser(JSON.parse(localStorage.getItem('user'))) 
    }

    const logout = () => {
        localStorage.removeItem('user')
        setUser(null)
    }

    return (
        <div>
            <Navigation logout={logout} />
            <Container fluid>
                <Row className="mt-5">
                    <Col className="d-none d-md-block pr-0" md={4} lg={3} >
                        {user ? <Profile user={user} userCheck={userCheck} /> : <Login userCheck={userCheck} />}
                    </Col>
                    <Col className="px-0" md={8} lg={6}>
                        <Scrollbars autoHide autoHideTimeout={100} autoHideDuration={100} style={{ height: "100vh" }} className="mt-3">
                            {user ? <><SmallProfile user={user} userCheck={userCheck} /> {user.user.updated && <SchoolNotifications />}</> : <div className="mx-2 mb-1 d-block d-md-none"><Login userCheck={userCheck} /></div>}
                            <Post />
                            <Post />
                            <Post />
                            <Post />
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
