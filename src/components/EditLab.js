import { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col, Form, Button, Card } from 'react-bootstrap';

const EditLab = ({l_id}) => {
  
    const [formData, setFormData] = useState({
        "name":""
    })

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios({
            method:"POST",
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
            },
            url: `http://localhost:5000/lab/update/${l_id}`,
            data: formData
        }).then((res)=>{
            console.log(res.data)
        })
    }

    return (
        <Card className="py-1 px-2">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name" className="mb-0">
                    <Form.Label className="mb-0">Name</Form.Label>
                    <Form.Control name="name" onChange={handleChange} className="py-0" type="text" value={formData.name} />
                </Form.Group>
                <Button variant="primary" type="submit" className="py-0 w-50 mt-2">
                    Submit
                </Button>
            </Form>
        </Card>
    )
}

export default EditLab