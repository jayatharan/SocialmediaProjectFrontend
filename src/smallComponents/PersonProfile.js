import React from 'react'
import { Card, Image } from 'react-bootstrap';


const PersonProfile = ({friend}) => {
    return (
        <Card className="p-1 m-1">
            <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-start">
                    <Image width={40} height={40} className="mr-3" src={friend.avatar} roundedCircle />
                    <div style={{position:'relative'}}>
                        <div>
                            <small><b>{friend.name}</b></small>
                        </div>
                        <small style={{position:'absolute', top:'50%'}} >
                            {friend.userType}
                        </small>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default PersonProfile
