import React from 'react'
import { Container, Row, Col, Card, Media, Image } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars-2';

import SchoolNotifications from '../components/SchoolNotifications'
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
                        <Scrollbars autoHide autoHideTimeout={100} autoHideDuration={100} style={{ height:"100vh" }} className="mt-3">
                            <Card className="mx-2 mb-1">
                                <Media className="px-2 pt-1">
                                    <Image width={45} height={45} className="mr-3" src="https://source.unsplash.com/random" roundedCircle />
                                    <Media.Body>
                                        <div class="d-flex justify-content-between">    
                                            <div class="d-flex flex-column">
                                                <b>Profile Owner</b>
                                                <small>Date</small>
                                            </div>
                                        </div>
                                    </Media.Body>
                                </Media>
                            </Card>    
                            <SchoolNotifications />
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
