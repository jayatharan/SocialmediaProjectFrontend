import {useState, useEffect} from 'react'
import {InputGroup, FormControl, Button,  Accordion, Card, Media, Badge,Image} from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";
import { Scrollbars } from 'react-custom-scrollbars-2';
import axios from 'axios'

import PersonSearch from '../smallComponents/PersonSearch';

const Search = ({user,refresh}) => {

    const [people,setPeople] = useState([])
    const [requested,setRequested] = useState([])

    useEffect(()=>{
        searchPeople()
    },[refresh])

    const getToken = ()=>{
        const user = JSON.parse(localStorage.getItem("user"))
        if(user){
            return user.token
        }
        return ""
    }

    const searchPeople = ()=>{
        axios({
            method:"GET",
            url:'http://localhost:5000/user/search',
            headers: {"Authorization" : `Bearer ${getToken()}`},
        }).then((response)=>{
            setPeople(response.data.people)
            setRequested(response.data.requestedIds)
        })
    }

    return (
        <div className="mt-3 px-2 pb-2">
            <InputGroup>
                <FormControl
                    placeholder="Search"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                    <Button variant="outline-primary"><FaSearch /></Button>
                </InputGroup.Append>
            </InputGroup>
            <hr className="my-1" />
            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle className="py-1" as={Card.Header} eventKey="0">
                    Pages <Badge variant="primary">12</Badge>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body className="px-0">
                        <Scrollbars style={{ height:"50vh" }}>
                        <Media className="px-2 py-1 rounded">
                            <Media.Body>
                                <div class="d-flex justify-content-between pr-1">
                                    <div className="d-flex flex-column">
                                        <>Pagename</>
                                        <small>Sir Name</small>
                                    </div>
                                    <div>
                                        <Badge variant="primary" className="pe-auto" >View</Badge> 
                                        <Badge variant="warning" className="pe-auto" >Follow</Badge></div>
                                </div>
                                <hr className="my-0" />
                            </Media.Body>
                        </Media>
                        
                        </Scrollbars>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle className="py-1" as={Card.Header} eventKey="1">
                    People <Badge variant="success">{people.length}</Badge>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body className="px-0 py-1">
                            <Scrollbars style={{ height:"50vh" }}>
                                {
                                people.map((person)=>
                                    (<PersonSearch 
                                        user={user} 
                                        requested={requested} 
                                        person={person} 
                                        searchPeople={searchPeople}
                                    />)
                                )
                                }
                                
                            </Scrollbars>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    )
}

export default Search
