import { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col, Form, Button, Card } from 'react-bootstrap';

const EditLabItem = ({i_id}) => {
    
    const [formData, setFormData] = useState({
        "name":"",
        "quantity":0,
        "unit":""
    })

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setFormData({ ...formData, [name]: value })
    }

    const getItemData  = ()=>{
        axios({
            method:"GET",
            url:`http://localhost:5000/lab/lab-item/${i_id}`
        }).then((res)=>{
            console.log(res.data)
            setFormData(res.data)
        })
    }

    useEffect(() => {
      getItemData()
    }, [i_id])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        axios({
            method:"POST",
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
            },
            url: `http://localhost:5000/lab/lab-item/${i_id}`,
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
                    <Form.Control name="name" onChange={handleChange} className="py-0" type="text" value={formData.name} required />
                </Form.Group>
                <Row className="mt-2">
                    <Col xs={7}>
                        <Form.Control name="quantity" onChange={handleChange} className="py-0" type="number" value={formData.quantity} placeholder="Quantity" />
                    </Col>
                    <Col xs={5}>
                        <Form.Control name="unit" onChange={handleChange} className="py-0" type="text" value={formData.unit} placeholder="Unit" />
                    </Col>
                </Row>
                <Button variant="primary" type="submit" className="py-0 w-50 mt-2">
                    Submit
                </Button>
            </Form>
        </Card>
    )
}

export default EditLabItem