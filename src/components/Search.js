import {useState, useEffect} from 'react'
import {InputGroup, FormControl, Button,  Accordion, Card, Media, Badge, Spinner} from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";
import { Scrollbars } from 'react-custom-scrollbars-2';
import axios from 'axios'

import PersonSearch from '../smallComponents/PersonSearch';
import ViewPage from '../smallComponents/ViewPage';

const Search = ({user,refresh}) => {
    const [loading,setLoading] = useState(false)
    const [people,setPeople] = useState([])
    const [pages,setPages] = useState([])
    const [requested,setRequested] = useState([])
    const [personPefresh, doPersonRefresh] = useState(0);
    const [keyword,setKeyword] = useState("")

    useEffect(()=>{
        setKeyword("")
        searchPeople()
    },[refresh])

    const getToken = ()=>{
        let user = null
        try{
            user = JSON.parse(localStorage.getItem("user"))
        }catch(err){

        }
        if(user){
            return user.token
        }
        return ""
    }
    
    const getKeyword = ()=>{
        if(keyword) return keyword
        else return 'none'
    }

    const searchPeople = ()=>{
        setLoading(true)
        axios({
            method:"GET",
            url:`http://localhost:5000/user/search/${getKeyword()}`,
            headers: {"Authorization" : `Bearer ${getToken()}`},
        }).then((response)=>{
            setPeople(response.data.people)
            setRequested(response.data.requestedIds)
            setPages(response.data.pages)
            doPersonRefresh(prev=>prev+1)
            setLoading(false)
        })
    }

    const friendRequestAction = (action,u_id)=>{
        axios({
            method:"GET",
            url:`http://localhost:5000/request/${action}/${u_id}`,
            headers: {"Authorization" : `Bearer ${getToken()}`},
        }).then((response)=>{
            searchPeople()
        })
    }

    return (
        <div className="mt-3 px-2 pb-2">
            <InputGroup>
                <FormControl
                    placeholder="Search"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value = {keyword}
                    onChange = {(e)=>setKeyword(e.target.value)}
                    onKeyPress={(e)=>{if(e.key === 'Enter')searchPeople()}}
                />
                <InputGroup.Append>
                    <Button onClick={searchPeople} variant="outline-primary">
                        {loading?<Spinner size="sm" animation="border"/>:<FaSearch />}
                    </Button>
                </InputGroup.Append>
            </InputGroup>
            <hr className="my-1" />
            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle className="py-1" as={Card.Header} eventKey="0">
                    Pages <Badge variant="primary">{pages.length}</Badge>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body className="px-0 py-1">
                        <Scrollbars style={{ height:"50vh" }}>
                        <Media className="px-2 py-1 rounded">
                            <Media.Body>
                                <Scrollbars style={{ height: "45vh" }}>
                                    {pages.map((page)=>(
                                        <ViewPage page={page} />
                                    ))}
                                </Scrollbars>
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
                                        key={person._id}
                                        user={user} 
                                        requested={requested} 
                                        person={person} 
                                        personPefresh={personPefresh}
                                        friendRequestAction={friendRequestAction}
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
