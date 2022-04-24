import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Modal, Button } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars-2';
import EditLabItem from '../components/EditLabItem';
import axios from 'axios'

const Lab = ({user}) => {

    const [labItems, setLabItems] = useState([])
    const [labId, setLabId] = useState(null)
    const [lab, setLab] = useState(null)
    const [labItemId,setLabItemId] = useState(null)
    const [showEditLabItem, setShowEditLabItem] = useState(false)

    const { id } = useParams();

    useEffect(() => {
      getLab()
    }, [id])
    
    const getToken = ()=>{
        const user = JSON.parse(localStorage.getItem("user"))
        if(user){
            return user.token
        }
        return ""
    }

    const getLab = ()=>{
        axios({
            method:"GET",
            url:`http://localhost:5000/lab/${id}/view`,
            headers: {"Authorization" : `Bearer ${getToken()}`},
        }).then((response)=>{
            console.log(response.data)
            setLab(response.data.lab)
            setLabItems(response.data.labItems)
        })
    }

    const isOwner = ()=>{
        if(user){
            if(lab){
                if(user.user._id == lab.schoolId){
                    return true
                }
            }
        }
        return false
    }

    const createLabItem = ()=>{
        axios({
            method:"GET",
            url:`http://localhost:5000/lab/${id}/lab-item/create`,
            headers: {"Authorization" : `Bearer ${getToken()}`},
        }).then((response)=>{
            popEditLabItem(response.data._id)
        })
    }

    const popEditLabItem = (i_id)=>{
        setLabItemId(i_id)
        setShowEditLabItem(true)
    }

    return (
        <div style={{height:'100vh'}}>
            <Modal className="px-0" show={showEditLabItem} onHide={()=>{setShowEditLabItem(false)}}>
                <Modal.Header className="py-0 pt-2" closeButton>
                    <Modal.Title >Item Details</Modal.Title>
                </Modal.Header>
                <EditLabItem i_id={labItemId} />
            </Modal>
            <Container className="pt-5">
                {lab&&(
                <>
                <div>
                    <Card className='mt-2 px-2'>
                        <Card.Title>
                            <div>
                                <div>
                                    {lab.name}
                                </div>
                            </div>
                        </Card.Title>
                        <div>
                            <small><b>{lab.schoolName}</b></small>
                        </div>
                    </Card>
                    {isOwner()&&(
                        <div className='d-flex justify-content-end mt-1'>
                            <Button onClick={createLabItem} className="py-0">Add New Item</Button>
                        </div>
                    )}
                    <Row className="mt-2">
                        {labItems.map((item)=>(
                            <Col xs="12" sm="6" md="4" lg="3">
                                <Card className='h-100'>
                                    <Card.Body className="p-1">
                                        <div className='d-flex justify-content-between'>
                                            <b>{item.name}</b>
                                            {isOwner()&&(
                                                <div className='text-primary'>
                                                    <small onClick={()=>popEditLabItem(item._id)}>Edit</small>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            Quantity : {item.quantity} {item.unit} 
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
                </>
                )}
            </Container>
        </div>
    )
}

export default Lab