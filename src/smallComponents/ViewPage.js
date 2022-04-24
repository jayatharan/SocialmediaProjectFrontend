import React from 'react'
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ViewPage = ({page}) => {
    return (
        <div key={page._id}>
            <div className="d-flex justify-content-between pr-1">
                <div className="d-flex flex-column">
                    <small><b>{page.name}</b></small>
                    <small>{page.user.name}</small>
                </div>
                <div><Badge variant="primary"><Link to={`/page/${page._id}`} className="text-light">View</Link></Badge></div>
            </div>
            <hr className="my-0" />
        </div>
    )
}

export default ViewPage
