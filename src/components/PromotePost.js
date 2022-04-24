import React, { useState, useEffect } from 'react'
import { Form, Button, Col, Card } from 'react-bootstrap';
import IntlTelInput from 'react-intl-tel-input';
import axios from 'axios'

const PromotePost = ({postId}) => {

    const [choice, setChoice] = useState({
        "userType": [],
        "medium": [],
        "district": [],
        "grade": [],
        "subject": []
    })

    const [userIds, setUserIds] = useState([])

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

    const [formData, setFormData] = useState({
        "medium": "",
        "grade": "",
        "district": "",
    })

    const getUsers = () => {
        axios({
            method: "GET",
            url: "http://localhost:5000/user/get_users",
            params:formData
        }).then((response) => {
            setUserIds(response.data)
        })
    }

    useEffect(() => {
        getUsers()
    }, [formData])

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setFormData({ ...formData, [name]: value })
    }

    const promotePost = () => {
        axios({
            method:"POST",
            url:`http://localhost:5000/post/promote/${postId}`,
            data: {userIds},
        }).then((response)=>{
            console.log(response.data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    const handleSubmit = (e) => {
        //e.preventDefault()
        promotePost()
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Row className="align-items-center mb-1">
                    <Col xs="auto" className="w-50">
                        <Form.Label className="my-1 mr-2" htmlFor="mediumSelect">
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
                            <small>District</small>
                        </Form.Label>
                    </Col>
                    <Col xs="auto" className="w-50">
                        <Form.Control
                            size="sm"
                            as="select"
                            className="mr-sm-2"
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            id="districtSelect"
                            custom
                        >
                            <option value="">All</option>
                            {choice.district.map((dst, idx) => (
                                <option size="sm" key={idx} value={dst}>{dst}</option>
                            ))}
                        </Form.Control>
                    </Col>
                </Form.Row>
                <div className="mb-0">
                    <p className="mb-1">No of Users : {userIds.length}</p>
                </div>
                <Button variant="primary" type="submit" className="py-0 w-50 mt-2">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default PromotePost
