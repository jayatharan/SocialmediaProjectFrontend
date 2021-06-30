import React from 'react'
import { Card, Toast, Row, Col } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { IoCloseCircleOutline } from "react-icons/io5";

const SchoolNotifications = () => {
    return (
        <Card className="mx-2">
            <Card.Title id="school-notification-title" className="m-0"><b className="pl-2">School Notifications</b></Card.Title>
            <hr className="my-0" />
            <Scrollbars autoHeight>
                <Row className="flex-row flex-nowrap p-1">
                    <Col  xs={10} sm={8} md={8} lg={6}>
                        <Card className="p-1">
                            <div className="d-flex justify-content-between">
                                <b>Title</b>
                                <IoCloseCircleOutline />
                            </div>
                            <hr className="my-0"/>
                            <small>Content will come here jhbsjbcj scajbldv jkbsacb ddbcljld sdjnsvlnk</small>
                        </Card>
                    </Col>
                </Row>
                                  
            </Scrollbars>    
        </Card>
    )
}

export default SchoolNotifications
