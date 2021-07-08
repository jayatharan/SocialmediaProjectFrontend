import { useState } from 'react'
import {Card, Image, Button, Spinner } from 'react-bootstrap'
import { IoCloseCircleOutline } from "react-icons/io5";


const PersonRequest = ({req, requestAction }) => {
    
    const [loading,setLoading] = useState(false)

    return (
        <Card className="p-1 m-1">
            <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-start">
                    <Image width={40} height={40} className="mr-3" src={req.fromUser.avatar} roundedCircle />
                    <div style={{position:'relative'}}>
                        <div>
                            <small><b>{req.fromUser.name}</b></small>
                        </div>
                        <small style={{position:'absolute', top:'50%'}} >
                            User Type
                        </small>
                    </div>
                </div>
                {loading?(
                    <Spinner animation="grow" />
                ):(
                    <div>
                        <div className="d-flex justify-content-end">
                            <IoCloseCircleOutline />
                        </div>
                        <div>
                            <Button size="sm" variant="primary" onClick={()=>{
                                setLoading(true)
                                requestAction('accept',req._id)
                                }}
                            >Confirm</Button>{' '}
                            <Button size="sm" variant="secondary" onClick={()=>{
                                setLoading(true)
                                requestAction('reject',req._id)
                                }}
                            >Cancel</Button>
                        </div>
                    </div>
                )}
                
            </div>
        </Card>
    )
}

export default PersonRequest
