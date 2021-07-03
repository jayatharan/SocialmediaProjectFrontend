import React from 'react'
import { Accordion, Card, Media, Badge } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { IoCloseCircleOutline } from "react-icons/io5";

const Notifications = () => {
    return (
        <div className="mt-3 px-2 pb-2">
            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle className="py-1" as={Card.Header} eventKey="0">
                    New Notifications <Badge variant="primary">12</Badge>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body className="px-0">
                        <Scrollbars style={{ height:"50vh" }}>
                            <Card className="p-1 m-1">
                                <div className="d-flex justify-content-between">
                                    <b>Title</b>
                                    <IoCloseCircleOutline />
                                </div>
                                <hr className="my-0"/>
                                <small>Content will come here jhbsjbcj scajbldv jkbsacb ddbcljld sdjnsvlnk</small>
                            </Card>
                        </Scrollbars>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle className="py-1" as={Card.Header} eventKey="1">
                    Viewed Notifications<Badge variant="success">12</Badge>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        All the people will show here
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    )
}

export default Notifications
