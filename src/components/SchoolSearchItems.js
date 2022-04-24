import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Button, Form, Modal, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios'
import { Scrollbars } from 'react-custom-scrollbars-2';

const SchoolSearchItems = () => {

    const [labItems, setLabItems] = useState([])
    const [showSearchItems, setShowSearchItems] = useState(false)
    const [search, setSearch] = useState("")
    
    const getItems = ()=>{
        axios({
            method:"GET",
            url: "http://localhost:5000/lab/search",
            params:{search}
        })
        .then((res)=>{
            setLabItems(res.data)
        })
    }

    return (
        <Card className="mx-2 px-2 pb-2 mt-1">
            <Modal className="px-0" show={showSearchItems} onHide={()=>{setShowSearchItems(false); setSearch("")}}>
                <Modal.Header className="py-0 pt-2" closeButton>
                    <Modal.Title >Search School Materials</Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-0'>
                    <div className='mx-1 mt-1'>
                        <InputGroup className="mb-1">
                            <FormControl
                                size="sm"
                                value={search}
                                onChange={(e)=>setSearch(e.target.value)}
                            />
                            <Button variant="outline-primary" size="sm" id="button-addon2" onClick={getItems}>
                                Search
                            </Button>
                        </InputGroup>
                    </div>
                    <Scrollbars 
                    autoHide 
                    autoHideTimeout={100} 
                    autoHideDuration={100} 
                    style={{ height: "80vh" }} 
                    className="mt-3">
                        <Row className="mt-2 mx-1">
                            {labItems.map((item)=>(
                                <Col xs="12" className="mt-1">
                                    <Card className='h-100'>
                                        <Card.Body className="p-1">
                                            <div className='d-flex justify-content-between'>
                                                <b>{item.name}</b>
                                            </div>
                                            <div>
                                                Quantity : {item.quantity} {item.unit} 
                                            </div>
                                            <div>
                                                School : {item.schoolName} 
                                            </div>
                                        </Card.Body>   
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Scrollbars>
                </Modal.Body>
            </Modal>
            <div className='d-flex justify-content-between mt-1'>
                <div>
                    Search School Materials
                </div>
                <diiv>
                    <Button className='py-0' onClick={()=>setShowSearchItems(true)}>Open Search</Button>
                </diiv>
            </div>
        </Card>
    )
}

export default SchoolSearchItems