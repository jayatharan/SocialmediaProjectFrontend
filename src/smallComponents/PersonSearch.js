import { useState,useEffect } from 'react';
import { Card, Image, Spinner } from 'react-bootstrap';
import axios from 'axios'


import { AiOutlineUserAdd } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";


const PersonSearch = ({ user, requested, person, searchPeople}) => {
    const [loading,setLoading] = useState(false)

    const getToken = ()=>{
        const user = JSON.parse(localStorage.getItem("user"))
        if(user){
            return user.token
        }
        return ""
    }

    const sendFriendRequest = (u_id)=>{

        axios({
            method:"GET",
            url:`http://localhost:5000/request/send/${u_id}`,
            headers: {"Authorization" : `Bearer ${getToken()}`},
        }).then((response)=>{
            searchPeople()
            setLoading(false)
        })
    }

    const cancelFriendRequest = (u_id)=>{
        axios({
            method:"GET",
            url:`http://localhost:5000/request/cancel/${u_id}`,
            headers: {"Authorization" : `Bearer ${getToken()}`},
        }).then((response)=>{
            searchPeople()
            setLoading(false)
        })
    }


    return (
        <Card key={person._id} className="p-1 m-1">
            <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-start">
                    <Image width={40} height={40} className="mr-3" src={person.avatar} roundedCircle />
                    <div style={{position:'relative'}}>
                        <div>
                            <small><b>{person.name}</b></small>
                        </div>
                        <small style={{position:'absolute', top:'50%'}}>
                            {person.userType}
                        </small>
                    </div>
                </div>
                <div>
                    {user&&(
                        <div>
                            {loading?<Spinner size="sm" animation="grow" />:
                            (<>
                            {requested.includes(person._id)?
                                (<GiCancel  className="user-select-none" onClick={()=>
                                    {   
                                        setLoading(true)
                                        cancelFriendRequest(person._id)
                                    }
                                } />)
                                :
                                (<AiOutlineUserAdd className="user-select-none text-primary" onClick={()=>
                                    {
                                        setLoading(true)
                                        sendFriendRequest(person._id)
                                    }
                                } />)
                            }
                            </>)
                            }
                        </div>
                    )}
                </div>
            </div>
        </Card>
    )
}

export default PersonSearch
