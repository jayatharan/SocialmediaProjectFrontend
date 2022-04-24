import React from 'react'
import { Accordion, Card, Media, Badge, Image } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { IoCloseCircleOutline } from "react-icons/io5";
import axios from 'axios'

const Notifications = ({notifications}) => {

    const deleteNotification = (id)=>{
        axios({
            method:"GET",
            url:`http://localhost:5000/user/deleteNotification/${id}`
        }).then((response)=>{
            
        })
    }

    return (
        <div className="mt-3 px-2 pb-2">
            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle className="py-1" as={Card.Header} eventKey="0">
                    New Notifications <Badge variant="primary">{notifications.length}</Badge>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body className="px-0 py-0">
                        <Scrollbars style={{ height:"75vh" }}>
                            {notifications.map((n)=>(
                                <Card className="p-1 m-1" key={n._id}>
                                    <div className="d-flex justify-content-between">
                                        <div>
                                        <Image width={30} height={30} className="mr-1" src={n.avatar} roundedCircle />
                                            <small><b>{n.name}</b></small>
                                        </div>
                                        <IoCloseCircleOutline onClick={()=>deleteNotification(n._id)} />
                                    </div>
                                    <hr className="my-0"/>
                                    <p className="mb-0">{n.title}</p>
                                    <hr className="my-0" />
                                    <small>{n.content}</small>
                                </Card>
                            ))}
                        </Scrollbars>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                {/* <Card>
                    <Accordion.Toggle className="py-1" as={Card.Header} eventKey="1">
                    Viewed Notifications<Badge variant="success">12</Badge>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        All the people will show here
                    </Card.Body>
                    </Accordion.Collapse>
                </Card> */}
            </Accordion>
        </div>
    )
}

export default Notifications
