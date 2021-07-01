import React,{useState} from 'react'
import{ Card, Media, Image, Button, Popover, OverlayTrigger, Modal, ModalTitle } from 'react-bootstrap';
import { FiMenu } from "react-icons/fi";

import Profile from './Profile'
import Search from './Search'

const SmallProfile = () => {

    const [profileShow,setProfileShow] = useState(false)
    const [searchShow,setSearchShow] = useState(false)
    const [show,setShow] = useState(false)

    const popover = (
        <Popover id="popover-basic">
            <Popover.Content>
                <div onClick={()=>{setProfileShow(true); setShow(false)}}>My Profile</div>
                <br/>
                <div onClick={()=>{setSearchShow(true); setShow(false)}}>Search Pages/People</div>
            </Popover.Content>
        </Popover>
    );

    return (
        <Card className="mx-2 mb-1 d-block d-md-none">
            <Media className="px-2 py-2">
                <Image width={45} height={45} className="mr-3" src="https://source.unsplash.com/random" roundedCircle />
                <Media.Body>
                    <div class="d-flex justify-content-between">    
                        <div class="d-flex flex-column">
                            <b>Profile Owner</b>
                            <small>owner@gmail.com</small>
                        </div>
                        <OverlayTrigger show={show} placement="left" overlay={popover}>
                            <div onClick={()=>setShow(!show)}>
                                <FiMenu />
                            </div>
                        </OverlayTrigger>
                    </div>
                </Media.Body>
            </Media>
            <Modal show={profileShow} onHide={()=>setProfileShow(false)} >
                <Modal.Header className="py-0 pt-2" closeButton>
                    <Modal.Title >My Profile</Modal.Title>
                </Modal.Header>
                <Profile />
            </Modal>
            <Modal show={searchShow} onHide={()=>setSearchShow(false)} >
                <Modal.Header className="py-0 pt-2" closeButton>
                    <Modal.Title >Search</Modal.Title>
                </Modal.Header>
                <Search />
            </Modal>
        </Card>
    )
}

export default SmallProfile
