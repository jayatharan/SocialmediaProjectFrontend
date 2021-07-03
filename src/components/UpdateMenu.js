import React, { useState, useEffect } from 'react'
import { Form, Button, Col, Card } from 'react-bootstrap';
import axios from 'axios'


const UpdateMenu = ({ user, userCheck }) => {
    const getUserType = () => {
        if (user.user.updated) {
            return (user.user.userType)
        }
        return "Student"
    }

    const [usertype, setUserType] = useState(getUserType())

    const [choice, setChoice] = useState({
        "userType": [],
        "medium": [],
        "district": [],
        "grade": [],
        "subject": []
    })

    const changeUserType = (e) => {
        setUserType(e.target.value)
    }

    const [formData, setFormData] = useState({
        "userType": usertype,
        "medium": user.user.medium,
        "grade": user.user.grade,
        "district": user.user.district
    })

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (formData.userType == "Student" && (!formData.medium || !formData.grade || !formData.district)) return
        axios({
            method: "POST",
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
            },
            url: "http://localhost:5000/user/update",
            data: formData
        }).then((result) => {
            localStorage.setItem('user', JSON.stringify(result.data))
            userCheck()
        })
    }

    useEffect(() => {
        getChoices()
    }, [])

    const getChoices = () => {
        axios({
            method: "GET",
            url: "http://localhost:5000/getChoices",
        }).then((response) => {
            console.log(response.data)
            setChoice(response.data)
            setDatas()
        })
    }

    const setDatas = () => {
        if (!user.user.updated) {
            setFormData({ ...formData, medium: choice.medium[0], grade: choice.grade[0], district: choice.district[0] })
        }
    }

    const studentForm =
        <Form onSubmit={handleSubmit}>
            <Form.Row className="align-items-center mb-1">
                <Col xs="auto">
                    <Form.Label className="my-1 mr-2" htmlFor="mediumSelect">
                        <small>Medium</small>
                    </Form.Label>
                </Col>
                <Col xs="auto">
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
                <Col xs="auto">
                    <Form.Label className="my-1 mr-2" htmlFor="gradeSelect">
                        <small>Grade</small>
                    </Form.Label>
                </Col>
                <Col xs="auto">
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
                        <option value=""></option>
                        {choice.grade.map((grd, idx) => (
                            <option size="sm" key={idx} value={grd}>{grd}</option>
                        ))}
                    </Form.Control>
                </Col>
            </Form.Row>
            <Form.Row className="align-items-center mb-1">
                <Col xs="auto">
                    <Form.Label className="my-1 mr-2" htmlFor="districtSelect">
                        <small>District</small>
                    </Form.Label>
                </Col>
                <Col xs="auto">
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
                        <option value=""></option>
                        {choice.district.map((dst, idx) => (
                            <option size="sm" key={idx} value={dst}>{dst}</option>
                        ))}
                    </Form.Control>
                </Col>
            </Form.Row>
            <Button variant="primary" type="submit" className="py-0 w-50 mt-2">
                Submit
            </Button>
        </Form>


    return (
        <Card className="py-1 px-2">
            <Form.Row className="align-items-center mb-1">
                <Col xs="auto">
                    <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
                        <small>I'm a</small>
                    </Form.Label>
                </Col>
                <Col xs="auto">
                    <Form.Control
                        as="select"
                        size="sm"
                        className="mr-sm-2 py-0"
                        id="inlineFormCustomSelectPref"
                        onChange={changeUserType}
                        custom
                    >
                        {choice.userType.map((typ, idx) => (
                            <option key={idx} value={typ}>{typ}</option>
                        ))}
                    </Form.Control>
                </Col>
            </Form.Row>
            {usertype == "Student" ? (studentForm) : usertype == "Teacher" ? (<>Teacher</>) : (<>School</>)}
        </Card>
    )
}

export default UpdateMenu
