import React, { useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Modal, Media, Badge, Accordion, Card, Image, Button } from 'react-bootstrap';
import { FiSettings } from "react-icons/fi";
import { Link } from 'react-router-dom';

import Notifications from './Notifications'
import UpdateMenu from './UpdateMenu';
import Requests from './Requests';
import PersonProfile from '../smallComponents/PersonProfile';
import ViewPage from '../smallComponents/ViewPage';
import ViewLab from '../smallComponents/ViewLab';

const Profile = ({ notifications, user, userCheck, requests, myFriends, requestAction, setShowPopup, openPageEdit, openLabEdit, myPages, myLabs, followingPages }) => {

    const [showNotification, setShowNotification] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [showRequests, setShowRequests] = useState(false)


    const profileItems = () => {
        return (
            <>
                <div className="p-1">
                    <Button variant="" className="py-0" onClick={() => {setShowNotification(true); setShowPopup(false)}}>
                        Notifications <Badge variant="primary">{notifications.length}</Badge>
                    </Button>
                    <Modal className="px-0" show={showNotification} onHide={() => {setShowNotification(false); setShowPopup(true)}} >
                        <Modal.Header className="py-0 pt-2" closeButton>
                            <Modal.Title >My Notifications</Modal.Title>
                        </Modal.Header>
                        <Notifications notifications={notifications} />
                    </Modal>
                    <Button variant="" className="py-0" onClick={() => {setShowRequests(true); setShowPopup(false)}}>
                        Requests <Badge variant="success">{requests.length}</Badge>
                    </Button>
                    <Modal className="px-0" show={showRequests} onHide={() => {setShowRequests(false); setShowPopup(true)}} >
                        <Modal.Header className="py-0 pt-2" closeButton>
                            <Modal.Title >My Requests</Modal.Title>
                        </Modal.Header>
                        <Requests requests={requests} requestAction={requestAction} />
                    </Modal>
                    <Button variant="" className="py-0" >
                        My Posts <Badge variant="warning">0</Badge>
                    </Button>
                </div>
                <hr className="mb-0" />
                <Modal.Body className="px-2">
                    <Accordion defaultActiveKey="0">
                        {user.user.userType != "Student" && (
                            <>
                                {user.user.userType == "School" && (
                                    <Card>
                                        <Accordion.Toggle className="py-1" as={Card.Header} eventKey="4">
                                            <div className="d-flex justify-content-between">
                                                <b>Labs</b>
                                                <div className="text-success" onClick={openLabEdit} ><u>Create Lab</u></div>
                                            </div>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="4">
                                            <Card.Body className="px-0 py-1">
                                                <Scrollbars style={{ height: "45vh" }}>
                                                    <Media className="px-2 py-1 rounded">
                                                        <Media.Body>
                                                            <Scrollbars style={{ height: "45vh" }}>
                                                                {myLabs.map((lab)=>(
                                                                    <ViewLab lab={lab} />
                                                                ))}
                                                            </Scrollbars>
                                                        </Media.Body>
                                                    </Media>
                                                </Scrollbars>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                )}
                                <Card>
                                    <Accordion.Toggle className="py-1" as={Card.Header} eventKey="3">
                                        <div className="d-flex justify-content-between">
                                            <b>My pages</b>
                                            <div className="text-success" onClick={openPageEdit} ><u>Create Page</u></div>
                                        </div>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="3">
                                        <Card.Body className="px-0 py-1">
                                            <Scrollbars style={{ height: "45vh" }}>
                                                <Media className="px-2 py-1 rounded">
                                                    <Media.Body>
                                                        <Scrollbars style={{ height: "45vh" }}>
                                                            {myPages.map((page)=>(
                                                                <ViewPage page={page} />
                                                            ))}
                                                        </Scrollbars>
                                                    </Media.Body>
                                                </Media>
                                            </Scrollbars>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </>
                        )}
                        <Card>
                            <Accordion.Toggle className="py-1" as={Card.Header} eventKey="0">
                                <b>Following pages</b>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body className="px-0 py-1">
                                    <Scrollbars style={{ height: "45vh" }}>
                                        <Media className="px-2 py-1 rounded">
                                            <Media.Body>
                                                <Scrollbars style={{ height: "45vh" }}>
                                                    {followingPages.map((page)=>(
                                                        <ViewPage page={page} />
                                                    ))}
                                                </Scrollbars>
                                            </Media.Body>
                                        </Media>
                                    </Scrollbars>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle className="py-1" as={Card.Header} eventKey="1">
                                <b>Friends ( <small>{myFriends.length}</small> )</b> 
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body className="px-0 py-1">
                                    <Scrollbars style={{ height: "45vh" }}>
                                        {myFriends.map((friend)=>(
                                            <PersonProfile key={friend._id} friend={friend} />
                                        ))}
                                    </Scrollbars>
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
