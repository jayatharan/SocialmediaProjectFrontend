import React from 'react'
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ViewLab = ({lab}) => {
  return (
    <div key={lab._id}>
        <div className="d-flex justify-content-between pr-1">
            <div className="d-flex flex-column">
                <small><b>{lab.name}</b></small>
                <small>{lab.schoolName}</small>
            </div>
            <div><Badge variant="primary"><Link to={`/lab/${lab._id}`} className="text-light">View</Link></Badge></div>
        </div>
        <hr className="my-0" />
    </div>
  )
}

export default ViewLab