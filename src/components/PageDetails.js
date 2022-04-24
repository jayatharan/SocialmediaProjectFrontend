import {useEffect, useState} from 'react'
import { Modal, Media, Badge, Accordion, Card, Image, Button } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars-2';
import axios from 'axios'

import PersonProfile from '../smallComponents/PersonProfile';

const PageDetails = ({page, user, setPage}) => {
    const[followers,setFollowers] = useState([])

    useEffect(() => {
        if(page){
            getFollowers()
        }
    }, [page])

    const getToken = ()=>{
        const user = JSON.parse(localStorage.getItem("user"))
        if(user){
            return user.token
        }
        return ""
    }


    const getFollowers = ()=>{
        axios({
            method:"GET",
            url:`http://localhost:5000/page/${page._id}/followers`,
            headers: {"Authorization" : `Bearer ${getToken()}`},
        }).then((response)=>{
            if(typeof(response.data) != "string") setFollowers(response.data)
        })
    }

    const isFollowAble = ()=>{
        if(user){
            if(page){
                var idx = page.followers.findIndex((u_id)=>{
                    if(u_id == user.user._id) return true
                    return false
                })
                if(idx > -1){
                    return false
                }else{
                    return true
                }
            }
        }
        return false
    }

    const followOperation = (action)=>{
        axios({
            method:"GET",
            url:`http://localhost:5000/page/${page._id}/${action}`,
            headers: {"Authorization" : `Bearer ${getToken()}`},
        }).then((response)=>{
            if(typeof(response.data) != "string") setPage(response.data)
        })
    }

    const isOwner = ()=>{
        if(user){
            if(page){
                if(user.user._id == page.userId){
                    return true
                }
            }
        }
        return false
    }

    return (
        <div className="mt-3">
            <Media className="px-2 pt-1 mb-1">
                <Image width={60} height={60} className="mr-3" src={page&&page.user.avatar} roundedCircle />
                <Media.Body>
                <div class="d-flex flex-column mt-2">
                        <div class="d-flex justify-content-between">
                            <b>{page&&page.name}</b>
                        </div>
                    <small>{page&&page.user.name}</small>
                    {user&&(
                        <>
                            {isOwner()?(
                                ""
                            ):(
                                <>{isFollowAble()?(<Badge variant="primary" onClick={()=>followOperation("follow")}>Follow</Badge>):(<Badge variant="danger" onClick={()=>followOperation("unfollow")}>UnFollow</Badge>)}</>
                            )}
                        </>
                    )}
                </div>
                </Media.Body>
            </Media>
            <hr className="mb-0" />
            <div>
                <Card>
                    <Accordion.Toggle className="py-1" as={Card.Header} eventKey="0">
                        <b>Followers</b>
                    </Accordion.Toggle>
                    <Card.Body className="px-0 py-1">
                        <Scrollbars style={{ height: "65vh" }}>
                            {followers.map((friend)=>(
                                <PersonProfile key={friend._id} friend={friend} />
                                ))}
                        </Scrollbars>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default PageDetails
