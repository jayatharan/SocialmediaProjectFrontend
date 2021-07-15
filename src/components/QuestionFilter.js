import React,{ useState, useEffect } from 'react'
import { Form, Button, Col, Card, Accordion } from 'react-bootstrap';
import axios from 'axios'
import { IoReload } from "react-icons/io5";

import SubjectQuestion from '../smallComponents/SubjectQuestion';
import { Scrollbars } from 'react-custom-scrollbars-2';

const QuestionFilter = ({ user,choice }) => {
    const [formData, setFormData] = useState({
        "userType": (user?user.user.userType:""),
        "medium": (user?user.user.medium:""),
        "grade": (user?user.user.grade:""),
    })


    useEffect(() => {
        setUserDatas()
    }, [])


    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setFormData({ ...formData, [name]: value })
    }

    const setUserDatas = ()=>{
        setFormData({
            "userType": (user?user.user.userType:""),
            "medium": (user?user.user.medium:""),
            "grade": (user?user.user.grade:""),
        })
    }

    return (
        <Card className="py-1 px-2">
            <div className="d-flex justify-content-between">
                <h5>Filter Questions</h5>
                <IoReload onClick={setUserDatas} />
            </div>
            <Form.Row className="align-items-center mb-1">
                <Col xs="auto" className="w-50">
                    <Form.Label className="my-1 mr-2" htmlFor="gradeSelect">
                        <small>Medium</small>
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
                    <option value=""></option>
                    {choice.medium.map((lan, idx) => (
                            <option key={idx} value={lan}>{lan}</option>
                    ))}
                    </Form.Control>
                </Col>
            </Form.Row>
            <Form.Row className="align-items-center mb-1">
                <Col xs="auto" className="w-50">
                    <Form.Label className="my-1 mr-2" htmlFor="gradeSelect">
                        <small>Grade</small>
                    </Form.Label>
                </Col>
                <Col xs="auto" className="w-50">
                    <Form.Control
                        size="sm"
                        as="select"
                        className="mr-sm-2"
                        id="gradeSelect"
                        name="grade"
                        onChange={handleChange}
                        value={formData.grade}
                        custom
                    >
                        <option value=""></option>
                        {choice.grade.map((grd, idx) => (
                            <option size="sm" key={idx} value={grd}>{grd}</option>
                        ))}
                    </Form.Control>
                </Col>
            </Form.Row>

            <Accordion defaultActiveKey="0">
                <Accordion.Toggle className="py-0 mt-2" as={Card.Header} eventKey="0">
                            <small><b>Subjects</b></small>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Scrollbars style={{ height: "60vh" }}>
                            <SubjectQuestion />
                    </Scrollbars>
                </Accordion.Collapse>
            </Accordion>

        </Card>
    )
}

export default QuestionFilter
