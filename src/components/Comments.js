import { useState,useEffect } from 'react'
import { } from 'react-bootstrap';
import axios from 'axios'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { InputGroup, FormControl, Button, Spinner } from 'react-bootstrap';
import Comment from '../smallComponents/Comment';
import{ IoMdSend } from "react-icons/io";
import { IoConstructOutline } from 'react-icons/io5';

const Comments = ({postId, user, postUserId}) => {
    const [comments,setComments] = useState([])
    const [content,setContent] = useState("")
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        getComments()
    },[])

    const isOwner = ()=>{
        if(user){
            return (user.user._id == postUserId)
        }else{
            return false
        }
    }

    const getComments = ()=>{
        axios({
            method:"GET",
            url:`http://localhost:5000/post/comments/${postId}`,
        }).then((response)=>{
            setComments(response.data)
        })
    }

    const sendComment = ()=>{
        if(content){
            setLoading(true)
            axios({
            method:"POST",
            url:`http://localhost:5000/post/add_comment/${postId}`,
            headers: {"Authorization" : `Bearer ${user.token}`},
            data:{"content":content}
        }).then((response)=>{
            setComments(response.data)
            setContent("")
            setLoading(false)
        })
        }
    }

    const deleteComment = (commentId)=>{
        setLoading(true)
        axios({
            method:"GET",
            url:`http://localhost:5000/post/delete_comment/${postId}/${commentId}`,
            headers: {"Authorization" : `Bearer ${user.token}`},
        }).then((response)=>{
            setComments(response.data)
            setLoading(false)
        })
    }


    return (
        <div className="px-1 pb-1" style={{backgroundColor:"#e7e7e7"}}>
            <Scrollbars style={{ height: "60vh" }}>
                {comments.map((comment)=>(<>
                    <Comment 
                        key={comment._id} 
                        comment={comment} 
                        isOwner={isOwner()}
                        deleteComment={deleteComment}
                    />
                </>))}
            </Scrollbars>
            {user&&(
            <InputGroup>
                    <FormControl
                    placeholder="Write a public comment..."
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value = {content}
                    onChange = {(e)=>setContent(e.target.value)}
                    onKeyPress={(e)=>{if(e.key === 'Enter')sendComment()}}
                />
                <InputGroup.Append>
                    <Button onClick={sendComment} variant="primary">
                        {loading?<Spinner size="sm" animation="border"/>:<IoMdSend />}
                    </Button>
                </InputGroup.Append>
            </InputGroup>
            )}
        </div>
    )
}

export default Comments
