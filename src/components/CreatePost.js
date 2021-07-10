import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import axios from 'axios'

const CreatePost = ({popEditPost}) => {
    const history = useHistory();

    const [postLoading,setPostLoading] = useState(false)
    const [questionLoading,setQuestionLoading] = useState(false)

    const moveToPostEditPage = ()=>{
        setPostLoading(true)
        axios({
            method:"GET",
            url:'http://localhost:5000/post/create',
            headers: {"Authorization" : `Bearer ${JSON.parse(localStorage.getItem("user")).token}`}
        }).then((response)=>{
            setPostLoading(false)
            popEditPost(response.data._id)
        }).catch((err)=>{
            setPostLoading(false)
        })
    }

    const moveToQuestionEditPage = ()=>{
        setQuestionLoading(true)
        axios({
            method:"GET",
            url:'http://localhost:5000/question/create',
            headers: {"Authorization" : `Bearer ${JSON.parse(localStorage.getItem("user")).token}`}
        }).then((response)=>{
            //history.push(`edit/${response.data._id}`)
            console.log(response.data)
            setQuestionLoading(false)
        }).catch((err)=>{
            setPostLoading(false)
        })
    }

    return (
        <div className="d-flex justify-content-between mx-2 pt-1 ">
            <div className="w-50 px-2"><Button className="w-100" size="sm" variant="outline-primary" onClick={moveToPostEditPage}>Create New Post {postLoading&&<Spinner size="sm" animation="border" />}</Button></div>
            <div className="w-50 px-2"><Button className="w-100" size="sm" variant="outline-success" onClick={moveToQuestionEditPage}>Ask Question {questionLoading&&<Spinner size="sm" animation="border" />}</Button></div>
        </div>
    )
}

export default CreatePost
