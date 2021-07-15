import React,{useState,useEffect} from 'react'
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars-2';
import axios from 'axios'

import QuestionFilter from '../components/QuestionFilter';
import Question from '../components/Question';
import EditQuestion from '../components/EditQuestion';

const Questions = ({user}) => {

    const [choice, setChoice] = useState({
        "userType": [],
        "medium": [],
        "district": [],
        "grade": [],
        "subject": []
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

    return (
        <div style={{height:'100vh'}}>
            <Container style={{height:'100%'}} fluid>
                <Row className="pt-5">
                    <Col className="d-none d-md-block pr-0 mt-3" md={4} lg={2} >
                        <QuestionFilter user={user} choice={choice} />
                    </Col>
                    <Col className="px-0" md={8} lg={6}>
                        <Scrollbars 
                        autoHide 
                        autoHideTimeout={100} 
                        autoHideDuration={100} 
                        style={{ height: "90vh" }} 
                        className="mt-3">
                            
                            <Question />
                            <EditQuestion choice={choice} />
                        </Scrollbars>
                    </Col>
                    <Col className="d-none d-lg-block px-0 mt-3" lg={4}>
                        <h5>Not decided yet</h5>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Questions
