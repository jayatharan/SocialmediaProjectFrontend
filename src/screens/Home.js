import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars-2';

import Navigation from '../components/Navigation'
import Post from '../components/Post'
import Profile from '../components/Profile'
import Search  from '../components/Search'

const Home = () => {
    return (
        <div>
            <Navigation />
            <Container fluid>
                <Row className="mt-5">
                    <Col className="d-none d-md-block pr-0" md={4} lg={3} >
                        <Profile />
                    </Col>

                    <Col className="px-0" md={8} lg={6}>
                        <Scrollbars style={{ height:"100vh" }} >
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
