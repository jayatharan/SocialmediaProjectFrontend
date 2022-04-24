import { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col, Form, Button, Card } from 'react-bootstrap';

const EditPage = ({p_id}) => {

    const [choice, setChoice] = useState({
        "userType": [],
        "medium": [],
        "district": [],
        "grade": [],
        "subject": []
    })

    const [formData, setFormData] = useState({
        "grade":"",
        "medium":"",
        "subject":"",
        "description":""
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

    const handleSubmit = (e) => {
        e.preventDefault()

        axios({
            method: "POST",
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
            },
            url: `http://localhost:5000/page/update/${p_id}`,
            data: formData
        }).then((result) => {
            console.log(result.data)
        })
    }

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setFormData({ ...formData, [name]: value })
    }

    return (
        <Card className="py-1 px-2">
        <Form onSubmit={handleSubmit}>
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
                        <option value=""></option>
                        {choice.grade.map((grd, idx) => (
                            <option size="sm" key={idx} value={grd}>{grd}</option>
                        ))}
                    </Form.Control>
                </Col>
            </Form.Row>
            <Form.Group controlId="subject" className="mb-0">
                <Form.Label className="mb-0">Subject</Form.Label>
                <Form.Control name="subject" onChange={handleChange} className="py-0" type="text" value={formData.subject}  />
            </Form.Group>
            <Form.Group controlId="description" className="mb-0">
                <Form.Label className="mb-0">Description</Form.Label>
                <Form.Control name="description" onChange={handleChange} className="py-0" type="text" value={formData.description}  />
            </Form.Group>
            <Button variant="primary" type="submit" className="py-0 w-50 mt-2">
                Submit
            </Button>
        </Form>
        </Card>
    )
}

export default EditPage
