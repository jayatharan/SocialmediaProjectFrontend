import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios'

const SchoolSendNotifications = () => {

    const [choice, setChoice] = useState({
        "userType": [],
        "medium": [],
        "district": [],
        "grade": [],
        "subject": []
    })

    const [formData, setFormData] = useState({
        "userType": "",
        "medium": "",
        "grade": "",
        "class": "",
        "title": "",
        "content":""
    })

    useEffect(() => {
        getChoices()
    }, [])

    const getChoices = () => {
        axios({
            method: "GET",
            url: "http://localhost:5000/getChoices",
        }).then((response) => {
            setChoice(response.data)
        })
    }

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = ()=>{
        axios({
            method: "POST",
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
            },
            url: "http://localhost:5000/user/school_send_notification",
            data: formData
        }).then((result) => {
            console.log(result.data)
        })
    }

    return (
        <Card className="mx-2 px-2 pb-2">
            <Card.Title>Send Notification</Card.Title>
            <Form>
                <Form.Row className="align-items-center mb-1">
                    <Col xs="auto" className="w-50">
                        <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
                            User Type
                        </Form.Label>
                    </Col>
                    <Col xs="auto" className="w-50">
                        <Form.Control
                            as="select"
                            size="sm"
                            className="mr-sm-2 py-0"
                            id="inlineFormCustomSelectPref"
                            name="userType"
                            onChange={handleChange}
                            custom
                            value={formData.userType}
                        >
                            <option value="">All</option>
                            {choice.userType.map((typ, idx) => {
                                if(typ != "School"){
                                    return (<option key={idx} value={typ}>{typ}</option>)
                                }
                            })}
                        </Form.Control>
                    </Col>
                </Form.Row>
                <Form.Row className="align-items-center mb-1">
                    <Col xs="auto" className="w-50">
                        <Form.Label className="my-1 mr-2" htmlFor="mediumSelect">
                           Medium
                        </Form.Label>
                    </Col>
                    <Col xs="auto" className="w-50">
                        <Form.Control
                            size="sm"
                            as="select"
                            className="mr-sm-2"
                            id="mediumSelect"
                            name="medium"
                            onChange={handleChange}
                            custom
                            value={formData.medium}
                        >
                            <option value="">All</option>
                            {choice.medium.map((lan, idx) => (
                                <option key={idx} value={lan}>{lan}</option>
                            ))}
                        </Form.Control>
                    </Col>
                </Form.Row>
                <Form.Row className="align-items-center mb-1">
                    <Col xs="auto" className="w-50">
                        <Form.Label className="my-1 mr-2" htmlFor="gradeSelect">
                            Grade
                        </Form.Label>
                    </Col>
                    <Col xs="auto" className="w-50">
                        <Form.Control
                            size="sm"
                            as="select"
                            className="mr-sm-2"
                            id="gradeSelect"
                            name="grade"
                            value={formData.grade}
                            onChange={handleChange}
                            custom
                        >
                            <option value="">All</option>
                            {choice.grade.map((grd, idx) => (
                                <option size="sm" key={idx} value={grd}>{grd}</option>
                            ))}
                        </Form.Control>
                    </Col>
                </Form.Row>
                <Form.Row className="align-items-center mb-1">
                    <Col xs="auto" className="w-50">
                        <Form.Label className="my-1 mr-2" htmlFor="districtSelect">
                            Class
                        </Form.Label>
                    </Col>
                    <Col xs="auto" className="w-50">
                    <Form.Control
                            size="sm"
                            as="select"
                            className="mr-sm-2"
                            name="class"
                            value={formData.class}
                            onChange={handleChange}
                            id="classSelect"
                            custom
                        >
                            <option value=""></option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="E">E</option>
                            <option value="F">F</option>
                        </Form.Control>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col xs="3">
                        <Form.Label className="mb-0">Title</Form.Label>
                    </Col>
                    <Col xs="9">
                        <Form.Control size="sm" name="title" onChange={handleChange} className="py-0" type="text" value={formData&&formData.title} />
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col xs="3">
                        <Form.Label className="mb-0">Content</Form.Label>
                    </Col>
                    <Col xs="12">
                        <Form.Control name="content" onChange={handleChange} className="py-0" as="textarea" value={formData&&formData.content} />
                    </Col>
                </Form.Row>
                <Button variant="primary" onClick={handleSubmit} className="py-0 w-50 mt-2">
                    Send
                </Button>
                <Button variant="warning" className="py-0 w-50 mt-2">
                    Cancel
                </Button>
            </Form>
        </Card>
    )
}

export default SchoolSendNotifications
