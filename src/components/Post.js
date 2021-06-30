import React from 'react'
import { Tabs, Tab, Modal, Media, Popover, OverlayTrigger, Row, Col, Card, Button, Badge, Image } from 'react-bootstrap';
import YouTube from 'react-youtube';
import { FiMoreVertical } from "react-icons/fi";
import png from '../pdf.png';

const Post = () => {

    const opts = {
        width: '100%',
        playerVars:{
            autoplay: 0,
        }
    }

    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h5">Report Post</Popover.Title>
            <Popover.Content>
            Report Related Things will show here
            </Popover.Content>
        </Popover>
    );

    return (
        <Modal.Dialog className="mb-0">
            <Media className="px-2 pt-1">
                    {/* <img
                        width={45}
                        height={45}
                        className="mr-3" 
                        src="https://source.unsplash.com/random"
                        alt="Generic placeholder"
                    /> */}
                    <Image width={45} height={45} className="mr-3" src="https://source.unsplash.com/random" roundedCircle />
                    <Media.Body>
                        <div class="d-flex justify-content-between">    
                            <div class="d-flex flex-column">
                            <b>Profile Owner</b>
                            <small>Date</small>
                            </div>

                            <OverlayTrigger trigger="click" placement="left" overlay={popover}>
                                <div><FiMoreVertical /></div>
                            </OverlayTrigger>
                        </div>
                    </Media.Body>
            </Media>
            <Modal.Header className="px-2 py-0">
                <p className="mb-0">Post Title</p>
            </Modal.Header>
            <Tabs defaultActiveKey="video" transition={false} id="post-tab">
                <Tab eventKey="video" title="Video"> 
                    <YouTube videoId="Tn6-PIqc4UM" opts={opts} />
                </Tab>
                <Tab eventKey="file" title="files">
                    <Row className="p-1">
                        
                        <Col xs={6} sm={4}>
                            <Card>
                                <Card.Img variant="top" src={png} />
                                <Card.Body className="p-0 px-1">
                                    <small>FileName.png</small>
                                    <div className="d-flex justify-content-between my-1">
                                        <Badge pill variant="primary">View</Badge>
                                        <Badge pill variant="success">
                                            <a id="all-link" href="http://www.africau.edu/images/default/sample.pdf">Download</a>
                                        </Badge>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Tab>
            </Tabs>
            <Modal.Footer className="p-1">
                <p>Model Footer Here</p>
            </Modal.Footer>
        </Modal.Dialog>
    )
}

export default Post
