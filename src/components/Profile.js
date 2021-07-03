import React, { useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Modal, Media, Badge, Accordion, Card, Image, Button } from 'react-bootstrap';
import { FiSettings } from "react-icons/fi";

import Notifications from './Notifications'
import UpdateMenu from './UpdateMenu';

const Profile = ({ user, userCheck }) => {

    const [showNotification, setShowNotification] = useState(false)
    const [showSettings, setShowSettings] = useState(false)

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

    const profileItems = () => {
        return (
            <>
                <div className="p-1">
                    <Button variant="" className="py-0" onClick={() => setShowNotification(true)}>
                        Notifications <Badge variant="primary">12</Badge>
                    </Button>
                    <Modal className="px-0" show={showNotification} onHide={() => setShowNotification(false)} >
                        <Modal.Header className="py-0 pt-2" closeButton>
                            <Modal.Title >My Notifications</Modal.Title>
                        </Modal.Header>
                        <Notifications />
                    </Modal>
                    <Button variant="" className="py-0" >
                        Requests <Badge variant="success">0</Badge>
                    </Button>
                    <Button variant="" className="py-0" >
                        My Posts <Badge variant="warning">0</Badge>
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
                                    <Scrollbars style={{ height: "45vh" }}>
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
            </>
        )
    }


    return (
        <>
            <div className="mt-3">
                <Media className="px-2 pt-1 mb-1">
                    <Image width={60} height={60} className="mr-3" src={user.user.avatar} roundedCircle />
                    <Media.Body>
                        <div class="d-flex flex-column mt-2">
                            <div class="d-flex justify-content-between">
                                <b>{user.user.name}</b>
                                <div>
                                    <FiSettings onClick={() => setShowSettings(true)} />
                                </div>
                                <Modal className="px-0" show={showSettings} onHide={() => setShowSettings(false)} >
                                    <Modal.Header className="py-0 pt-2" closeButton>
                                        <Modal.Title >Settings</Modal.Title>
                                    </Modal.Header>
                                    <UpdateMenu userCheck={userCheck} user={user} />
                                </Modal>
                            </div>
                            <small>{user.user.email}</small>
                        </div>
                    </Media.Body>
                </Media>
                {user.user.updated ? profileItems() : <UpdateMenu userCheck={userCheck} user={user} />}
            </div>
        </>
    )
}

export default Profile
