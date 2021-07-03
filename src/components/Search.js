import React from 'react'
import {InputGroup, FormControl, Button,  Accordion, Card, Media, Badge} from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";
import { Scrollbars } from 'react-custom-scrollbars-2';

const Search = () => {

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
                        <div><Badge variant="primary">View</Badge> <Badge variant="warning">Follow</Badge></div>
                    </div>
                    <hr className="my-0" />
                </Media.Body>
            </Media>
        )
    }

    return (
        <div className="mt-3 px-2 pb-2">
            <InputGroup>
                <FormControl
                    placeholder="Search"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                    <Button variant="outline-primary"><FaSearch /></Button>
                </InputGroup.Append>
            </InputGroup>
            <hr className="my-1" />
            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle className="py-1" as={Card.Header} eventKey="0">
                    Pages <Badge variant="primary">12</Badge>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body className="px-0">
                        <Scrollbars style={{ height:"50vh" }}>
                        <Media className="px-2 py-1 rounded">
                            <Media.Body>
                                <div class="d-flex justify-content-between pr-1">
                                    <div className="d-flex flex-column">
                                        <>Pagename</>
                                        <small>Sir Name</small>
                                    </div>
                                    <div><Badge variant="primary">View</Badge> <Badge variant="warning">Follow</Badge></div>
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
                    People <Badge variant="success">12</Badge>
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

export default Search
