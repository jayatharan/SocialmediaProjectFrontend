import React from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { IoCloseCircleOutline } from "react-icons/io5";

const SchoolNotifications = ({notifications}) => {
    return (
        <Card className="mx-2">
            <Card.Title id="school-notification-title" className="m-0">
                <div className="d-flex justify-content-between">
                    <b className="pl-2">School Notifications</b>
                    <Button size="sm" variant="outline-dark" className="py-0" >View all</Button>
                </div>
            </Card.Title>
            <hr className="my-0" />
            <Scrollbars autoHeight autoHide autoHideTimeout={100} autoHideDuration={100}>
                <Row className="flex-row flex-nowrap p-1 pb-2">
                    {notifications.map((n)=>(
                        <>
                            {n.school&&(
                                <Col  xs={10} sm={8} md={8} lg={6}>
                                    <Card className="p-1">
                                        <div className="d-flex justify-content-between">
                                            <b>{n.title}</b>
                                        </div>
                                        <hr className="my-0"/>
                                        <small>{n.content}</small>
                                    </Card>
                                </Col>
                            )}
                        </>
                    ))}
                </Row>
            </Scrollbars>    
        </Card>
    )
}

export default SchoolNotifications
