import { useState,useEffect } from 'react';
import { Card, Image, Spinner } from 'react-bootstrap';

import { AiOutlineUserAdd } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { FiUserCheck } from "react-icons/fi";

const PersonSearch = ({ user, requested, person, personPefresh, friendRequestAction}) => {
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        setLoading(false)
    },[personPefresh])


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
                            {user.user.friends.includes(person._id)?(<>
                                <FiUserCheck className="text-success"/>
                                </>):(<>
                                {loading?<Spinner size="sm" animation="grow" />:
                                (<>
                                {requested.includes(person._id)?
                                    (<GiCancel  className="user-select-none text-danger" onClick={()=>
                                        {   
                                            setLoading(true)
                                            friendRequestAction('cancel',person._id)
                                        }
                                    } />)
                                    :
                                    (<AiOutlineUserAdd className="user-select-none text-primary" onClick={()=>
                                        {
                                            setLoading(true)
                                            friendRequestAction('send',person._id)
                                        }
                                    } />)
                                }
                                </>)
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
