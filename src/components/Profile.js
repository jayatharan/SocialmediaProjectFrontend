import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Modal, Media, Badge, Accordion, Card, Image, Button } from 'react-bootstrap';

const Profile = () => {

    let items = []

    for (var i = 0; i < 50; i++) {
        items.push(
            <Media className="px-2 py-1 rounded">
                <Media.Body>
                    <div class="d-flex justify-content-between pr-1">
                        <div className="d-flex flex-column">
                            <>Pagename</>
                            <small>Sir Name</small>
                        </div>
                        <div><Badge variant="primary">View</Badge></div>
                    </div>
                    <hr className="my-0" />
                </Media.Body>
            </Media>
        )
    }

    return (
        <>    
            <div className="mt-3">
                <Media className="px-2 pt-1 mb-1">
                    <Image width={80} height={80} className="mr-3" src="https://source.unsplash.com/random" roundedCircle />
                    <Media.Body>
                        <div class="d-flex flex-column mt-2">
                        <b>Profile Owner</b>
                        <small>owner@gmail.com</small>
                        </div>
                    </Media.Body>
                </Media>
                <div className="pt-1">
                    <Button variant="" className="py-0" >
                        Notifications <Badge variant="primary">12</Badge>
                        <span className="sr-only">unread messages</span>
                    </Button>
                    <Button variant="" className="py-0" >
                        Requests <Badge variant="success">0</Badge>
                        <span className="sr-only">unread messages</span>
                    </Button>
                </div>
                <hr className="mb-0" />
                <Modal.Body className="px-2">
                    <Accordion defaultActiveKey="0">
                        <Card>
                            <Accordion.Toggle className="py-1" as={Card.Header} eventKey="0">
                            <b>Following pages</b>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body className="px-0">
                                <Scrollbars style={{ height:"45vh" }}>
                                    <Media className="px-2 py-1 rounded">
                                        <Media.Body>
                                            <div class="d-flex justify-content-between pr-1">
                                                <div className="d-flex flex-column">
                                                    <>Pagename</>
                                                    <small>Sir Name</small>
                                                </div>
                                                <div><Badge variant="primary">View</Badge></div>
                                            </div>
                                            <hr className="my-0" />
                                        </Media.Body>
                                    </Media>
                                    {items}
                                </Scrollbars>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle className="py-1" as={Card.Header} eventKey="1">
                            <b>Friends</b>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                            <Card.Body className="px-0">
                                All the people will show here
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Modal.Body>
            </div>
        </>
    )
}

export default Profile
