import React from 'react'
import { Badge, Card } from 'react-bootstrap';


const SubjectQuestion = () => {
    return (
        <Card className="mt-1" >
            <div className="d-flex justify-content-between px-1">
                <div className="d-flex flex-column">
                    <small>Grade 00 (Medium)</small>
                    <small><b>Subject Name</b></small>
                </div>
                <div><Badge variant="primary"><small>View</small></Badge></div>
            </div>
        </Card>
    )
}

export default SubjectQuestion
