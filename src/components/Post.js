import {useState, useEffect} from 'react'
import { Tabs, Tab, Modal, Media, Popover, OverlayTrigger, Row, Col, Card, Button, Badge, Image } from 'react-bootstrap';
import YouTube from 'react-youtube';
import { FiMoreVertical } from "react-icons/fi";
import png from '../pdf.png';
import { BiLike, BiComment, BiShare } from "react-icons/bi";
import { Scrollbars } from 'react-custom-scrollbars-2';
import axios from 'axios'

import Comments from './Comments'

const Post = ({ postData,user,updatePosts }) => {

    const [showComment,setShowComment] = useState(false)

    const [like,setLike] = useState(false)
    const [likeCnt,setLikeCnt] = useState(0)

    useEffect(()=>{
        setLikeCnt(postData.likes.length)
        if(user){
            if(postData.likes.includes(user.user._id)){
                setLike(true)
            }
        }
    },[])
    
    const opts = {
        width: '100%',
        playerVars:{
            autoplay: 0,
        }
    }

    const getDefaultActiveKey = ()=>{
        if(postData){
            if(postData.youtubeId) return "video"
            else if (postData.files.length != 0) return "file"
            else if (postData.discription) return "discription"
        }
        return ""
    }


    const likePost = ()=>{
        setLike(!like)
        if(user){
            axios({
                method:"GET",
                url:`http://localhost:5000/post/like/${postData._id}`,
                headers: {"Authorization" : `Bearer ${JSON.parse(localStorage.getItem("user")).token}`},
            }).then((response)=>{
                setLikeCnt(response.data.likes.length)
                updatePosts(response.data)
            })
        }
    }

    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h5">Report Post</Popover.Title>
            <Popover.Content>
            Report Related Things will show here
            </Popover.Content>
        </Popover>
    );
    

    return (
        <Modal.Dialog size="lg" className="my-1">
            <Media className="px-2 pt-1">
                    {/* <img
                        width={45}
                        height={45}
                        className="mr-3" 
                        src="https://source.unsplash.com/random"
                        alt="Generic placeholder"
                    /> */}
                    <Image width={45} height={45} className="mr-3" src={postData&&(postData.user.avatar)} roundedCircle />
                    <Media.Body>
                        <div class="d-flex justify-content-between">    
                            <div class="d-flex flex-column">
                            <b>{postData&&(postData.user.name)}</b>
                            <small>{postData&&postData.createdAt}</small>
                            </div>

                            <OverlayTrigger trigger="click" placement="left" overlay={popover}>
                                <div><FiMoreVertical /></div>
                            </OverlayTrigger>
                        </div>
                    </Media.Body>
            </Media>
            <Modal.Header className="px-2 py-0">
                <p className="mb-0">{postData&&postData.title}</p>
            </Modal.Header>
            {postData?(
                <Tabs defaultActiveKey={getDefaultActiveKey()} transition={false} id="post-tab">
                    {postData.youtubeId&&(
                        <Tab eventKey="video" title="Video"> 
                            <YouTube videoId={postData.youtubeId} opts={opts} />
                        </Tab>
                    )}
                    {postData.files.length?(
                        <Tab eventKey="file" title="files">
                            <Row className="p-1">  
                                <Col xs={6} sm={4}>
                                    <Card>
                                        <Card.Img variant="top" src={png} />
                                        <Card.Body className="p-0 px-1">
                                            <small>FileName.png</small>
                                            <div className="d-flex justify-content-between my-1">
                                                <Badge pill variant="primary">View</Badge>
                                                <Badge pill variant="success">
                                                    <a id="all-link" href="http://www.africau.edu/images/default/sample.pdf">Download</a>
                                                </Badge>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Tab>
                    ):""}
                    {postData.description&&(
                        <Tab eventKey="discription" title="Discription">
                            <Scrollbars style={{ height: "30vh" }}>
                                <div className="px-2">{postData.description}</div>
                            </Scrollbars> 
                        </Tab>
                    )}
                </Tabs>
            ):""}

            <div className="d-flex justify-content-end pr-2"><small>{postData.commentCount} comments</small><small className="ml-2">0 shares</small></div>

            {user&&(
            <div className="d-flex justify-content-around pb-2">
                <Button className="py-0" variant={like&&"primary"} onClick={likePost} size='sm' ><BiLike /> Like <Badge variant="dark">{likeCnt}</Badge></Button>
                <Button className="py-0" variant="" onClick={() => setShowComment(true)} ><BiComment /> Comment</Button>
                <Modal className="px-0" show={showComment} onHide={() => setShowComment(false)} centered>
                    <Modal.Header className="py-0 pt-2" closeButton>
                        <Modal.Title >Comments</Modal.Title>
                    </Modal.Header>
                        <Comments user={user} postId={postData._id} postUserId={postData.userId}/>
                </Modal>
                <Button className="py-0" variant=""><BiShare /> Share</Button>
            </div>
            )}
        </Modal.Dialog>
    )
}

export default Post
