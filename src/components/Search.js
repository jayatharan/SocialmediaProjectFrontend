import {useState, useEffect} from 'react'
import {InputGroup, FormControl, Button,  Accordion, Card, Media, Badge,Image} from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { IoCloseCircleOutline } from "react-icons/io5";
import axios from 'axios'

const Search = () => {
    const [people,setPeople] = useState([])

    useEffect(()=>{
        searchPeople()
    },[])

    const getToken = ()=>{
        const user = JSON.parse(localStorage.getItem("user"))
        if(user){
            return user.token
        }
        return ""
    }

    const searchPeople = (key)=>{
        axios({
            method:"GET",
            url:'http://localhost:5000/user/search',
            headers: {"Authorization" : `Bearer ${getToken()}`},
        }).then((response)=>{
            console.log(response.data)
            setPeople(response.data.people)
        })
    }

    const sendFriendRequest = (u_id)=>{
        axios({
            method:"GET",
            url:`http://localhost:5000/request/send/${u_id}`,
            headers: {"Authorization" : `Bearer ${getToken()}`},
        }).then((response)=>{
            console.log(response.data)
        })
    }

    let items = []

    for (var i = 0; i < 50; i++) {
        items.push(
            <Media className="px-2 py-1 rounded">
                <Media.Body>
                    <div class="d-flex justify-content-between pr-1">
                        <div className="d-flex flex-column">
                            <>Pagename</>
                            <small>Sir Name</small>
                        </div>
                        <div><Badge variant="primary">View</Badge> <Badge variant="warning">Follow</Badge></div>
                    </div>
                    <hr className="my-0" />
                </Media.Body>
            </Media>
        )
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
                                    <div><Badge variant="primary">View</Badge> <Badge variant="warning">Follow</Badge></div>
                                </div>
                                <hr className="my-0" />
                            </Media.Body>
                        </Media>
                        {items}
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
                                {people.map((person)=>(
                                    <Card className="p-1 m-1">
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex justify-content-start">
                                                <Image width={45} height={45} className="mr-3" src={person.avatar} roundedCircle />
                                                <div>
                                                    <div>
                                                        <small><b>{person.name}</b></small>
                                                    </div>
                                                    <small>{person.userType}</small>
                                                </div>
                                            </div>
                                            <div>
                                                {/* <IoCloseCircleOutline /> */}
                                                <div onClick={()=>sendFriendRequest(person._id)}>
                                                    <Badge variant="primary">Add Friend</Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </Scrollbars>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    )
}

export default Search
