import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Modal, Tabs, Tab, Form, Card, Media, Image, Button, Badge } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars-2';
import axios from 'axios';

const ReportedComments = () => {

    const [comments, setComments] = useState([])

    const getComments = () => {
        axios({
            method: "GET",
            url: "http://localhost:5000/post/reported_comment"
        }).then((res)=>{
            setComments(res.data)
        })
    }

    const resolveReport = (r_id, status) => {
        axios({
            method:"POST",
            url:`http://localhost:5000/post/report_comment/${r_id}/resolve`,
            data:{
                delete:status
            }
        }).then((res)=>{
            getComments()
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(() => {
        getComments()
    })

    return (
        <div style={{height:'100vh'}}>
            <Container style={{height:'100%'}} fluid>
                <Row className="pt-5">
                    <Col lg={3}>

                    </Col>
                    <Col lg={6}>
                        <Scrollbars 
                        autoHide 
                        autoHideTimeout={100} 
                        autoHideDuration={100} 
                        style={{ height: "90vh" }} 
                        className="mt-3">
                            {comments.map(c=>(
                                <Card className="p-1 mt-1">
                                    <p className="mb-1" style={{lineHeight:"98%"}}>{c.comment}</p>
                                    <hr className="my-1" />
                                    <div className="d-flex justify-content-end">
                                        <Badge className="p-2 mx-1" variant="primary" onClick={()=>resolveReport(c._id, false)}>Resolve</Badge>
                                        <Badge className="p-2 mx-1" variant="danger" onClick={()=>resolveReport(c._id, true)}>Delete</Badge>
                                    </div>
                                </Card>
                            ))}
                        </Scrollbars>
                    </Col>
                    <Col lg={3}>
                        
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ReportedComments