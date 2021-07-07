import { Accordion, Card, Media, Badge, Image, Button } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { IoCloseCircleOutline } from "react-icons/io5";

const Requests = ({requests,requestAction}) => {

    return (
       <div className="mt-3 px-2 pb-2">
            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle className="py-1" as={Card.Header} eventKey="0">
                    New Requests <Badge variant="primary">12</Badge>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body className="px-0 py-1">
                        <Scrollbars style={{ height:"50vh" }}>
                            {requests.map((req)=>(
                                <Card className="p-1 m-1">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex justify-content-start">
                                            <Image width={45} height={45} className="mr-3" src={req.fromUser.avatar} roundedCircle />
                                            <div>
                                                <div>
                                                    <>{req.fromUser.name}</>
                                                </div>
                                                <small>User Type</small>
                                            </div>
                                        </div>
                                        <div>
                                            <IoCloseCircleOutline />
                                            <div>
                                                <Button size="sm" variant="primary" onClick={()=>requestAction('accept',req._id)}>Confirm</Button>{' '}
                                                <Button size="sm" variant="secondary" onClick={()=>requestAction('cancel',req._id)}>Cancel</Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </Scrollbars>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle className="py-1" as={Card.Header} eventKey="1">
                    Waiting Requests<Badge variant="success">12</Badge>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        Old Requests will show here
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    )
}

export default Requests
