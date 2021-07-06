import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import axios from 'axios'

const CreatePost = () => {
    const history = useHistory();

    const [loading,setLoading] = useState(false)

    const moveToEditPage = ()=>{
        setLoading(!loading)
        axios({
            method:"GET",
            url:'http://localhost:5000/post/create',
            headers: {"Authorization" : `Bearer ${JSON.parse(localStorage.getItem("user")).token}`}
        }).then((response)=>{
            history.push(`edit/${response.data.post_id}`)
            setLoading(false)
        })
    }

    return (
        <div className="d-flex justify-content-between mx-2 pt-1 ">
            <div className="w-50 px-2"><Button className="w-100" size="sm" variant="outline-primary" onClick={moveToEditPage}>Create New Post {loading&&<Spinner size="sm" animation="border" variant="dark" />}</Button></div>
            <div className="w-50 px-2"><Button className="w-100" size="sm" variant="outline-success">Ask Question</Button></div>
        </div>
    )
}

export default CreatePost
