import { Accordion, Card, Media, Badge, Image, Button } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { IoCloseCircleOutline } from "react-icons/io5";


import PersonRequest from '../smallComponents/PersonRequest'

const Requests = ({requests,requestAction}) => {

    return (
       <div className="mt-3 px-2 pb-2">
            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle className="py-1" as={Card.Header} eventKey="0">
                    New Requests <Badge variant="primary">{requests.length}</Badge>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body className="px-0 py-1">
                        <Scrollbars style={{ height:"50vh" }}>
                            {requests.map((req)=>(
                                <PersonRequest req={req} requestAction={requestAction} />
                                )
                            )}
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
