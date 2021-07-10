import React, { useState } from 'react'
import { Card, Media, Image, Button, Popover, OverlayTrigger, Modal, ModalTitle } from 'react-bootstrap';
import { FiMenu } from "react-icons/fi";

import Profile from './Profile'
import Search from './Search'
import UpdateMenu from './UpdateMenu';

const SmallProfile = ({ user, userCheck, requests, myFriends, requestAction, setShowPopup }) => {

    const [profileShow, setProfileShow] = useState(false)
    const [searchShow, setSearchShow] = useState(false)
    const [show, setShow] = useState(false)


    const popover = (
        <Popover id="popover-basic">
            <Popover.Content>
                <div onClick={() => { setProfileShow(true); setShow(false); setShowPopup(false) }}>My Profile</div>
                <br />
                <div onClick={() => { setSearchShow(true); setShow(false); setShowPopup(false) }}>Search Pages/People</div>
            </Popover.Content>
        </Popover>
    );

    return (
        <Card className="mx-2 mb-1 d-block d-md-none">
            <Media className="px-2 py-2">
                <Image width={45} height={45} className="mr-3" src={user.user.avatar} roundedCircle />
                <Media.Body>
                    <div class="d-flex justify-content-between">
                        <div class="d-flex flex-column">
                            <b>{user.user.name}</b>
                            <small>{user.user.email}</small>
                        </div>
                        <OverlayTrigger show={show} placement="left" overlay={popover}>
                            <div onClick={() => setShow(!show)}>
                                <FiMenu />
                            </div>
                        </OverlayTrigger>
                    </div>
                </Media.Body>
            </Media>
            {user.user.updated || <UpdateMenu user={user} userCheck={userCheck} />}
            <Modal className="px-0" show={profileShow} onHide={() => {setProfileShow(false); setShowPopup(true)}} >
                <Modal.Header className="py-0 pt-2" closeButton>
                    <Modal.Title >My Profile</Modal.Title>
                </Modal.Header>
                <Profile user={user} userCheck={userCheck} requests={requests} myFriends={myFriends} requestAction={requestAction} setShowPopup={setShowPopup} />
            </Modal>
            <Modal show={searchShow} onHide={() => {setSearchShow(false); setShowPopup(true)}} >
                <Modal.Header className="py-0 pt-2" closeButton>
                    <Modal.Title >Search</Modal.Title>
                </Modal.Header>
                <Search user={user}/>
            </Modal>
        </Card>
    )
}

export default SmallProfile
