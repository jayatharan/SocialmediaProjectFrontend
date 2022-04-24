import {useState, useEffect, useRef} from 'react'
import { Form, Tabs, Tab, Modal, Media, Popover, Overlay, Row, Col, Card, Button, Badge, Image } from 'react-bootstrap';
import YouTube from 'react-youtube';
import { FiMoreVertical } from "react-icons/fi";
import png from '../pdf.png';
import { BiLike, BiComment, BiShare } from "react-icons/bi";
import parse from 'html-react-parser';
import { Scrollbars } from 'react-custom-scrollbars-2';
import axios from 'axios'

import Comments from './Comments'
import AnswerQuestion from './AnswerQuestion';
import PromotePost from './PromotePost';

const Post = ({ postData, user, updatePosts, showPopup, popEditPost }) => {

    const [showComment,setShowComment] = useState(false)
    const [showPromote,setShowPromote] = useState(false)
    const [show,setShow] = useState(true)
    const [answerQuestion,setAnswerQuestion] = useState(false)
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const handleAnswerClose = () => setAnswerQuestion(false);
    const handleAnswerShow = () => setAnswerQuestion(true);

    const [like,setLike] = useState(false)
    const [likeCnt,setLikeCnt] = useState(0)

    const [showReport, setShowReport] = useState(false)
    const [report, setReport] = useState("")

    const handleShowReportOpen = ()=>{
        setShow(false)
        setShowReport(true)
    }

    const handleShowReportClose = ()=>{
        setReport("")
        setShow(true)
        setShowReport(false)
    }

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

    const reportPost = ()=>{
        axios({
            method:"POST",
            url:`http://localhost:5000/post/report/${postData._id}`,
            data:{
                reason:report
            }
        }).then((res)=>{
            handleShowReportClose()
            console.log(res.data)
        })
    }
    
    const handleClick = (event) => {
        setShow(!show);
        if(target === null) setTarget(event.target);
    };

    const openEditPost = ()=>{
        popEditPost(postData._id)
    }

    const isMyPost = ()=>{
        if(postData){
            if(user){
                if(user.user._id == postData.userId){
                    return true
                }
                return false
            }
            return false
        }
        return false
    }

    return (
        <Modal.Dialog size="lg" className="my-1">
            <Modal show={showReport} onHide={handleShowReportClose} centered>
                <Modal.Header className="py-1" closeButton>
                    Report Post
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Form.Label className="my-1">
                            Reason
                        </Form.Label>
                    </div>
                    <div>
                        <Form.Control
                            size="sm"
                            as="textarea"
                            className="w-100"
                            name="district"
                            value={report}
                            onChange={(e)=>setReport(e.target.value)}
                            id="districtSelect"
                            custom
                        />
                    </div>
                    <div>
                    <Button className="w-50" variant='secondary' onClick={handleShowReportClose}>Cancel</Button>
                    <Button className="w-50" variant='warning' onClick={reportPost}>Report</Button>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal show={answerQuestion} onHide={handleAnswerClose}>
                <Modal.Header className="py-1" closeButton>
                </Modal.Header>
                <Modal.Body>
                    <AnswerQuestion user={user} post={postData} handleAnswerClose={handleAnswerClose}/>
                </Modal.Body>
            </Modal>
            <Media className="px-2 pt-1">
                    <Image width={45} height={45} className="mr-3" src={postData&&(postData.user.avatar)} roundedCircle />
                    <Media.Body>
                        <div class="d-flex justify-content-between">    
                            {postData&&postData.pagePost?(
                                <div class="d-flex flex-column">
                                    <b>{postData&&(postData.page.name)}</b>
                                    <small>{postData&&postData.user.name}</small>
                                </div>
                            ):(
                                <div class="d-flex flex-column">
                                    <b>{postData&&(postData.user.name)}</b>
                                    <small>{postData&&postData.createdAt}</small>
                                </div>
                            )}

                            <div ref={ref} >
                                <FiMoreVertical onClick={handleClick} />
                            
                                <Overlay
                                    show={showPopup&&show}
                                    target={target}
                                    placement="left"
                                    container={ref.current}
                                    containerPadding={20}
                                >
                                    <Popover id="popover-contained">
                                    {/* <Popover.Title as="h3">Popover bottom</Popover.Title> */}
                                    <Popover.Content>
                                        <div>
                                            {isMyPost()&&<Button className="py-0 w-100 mb-1" variant="outline-primary" onClick={openEditPost}>Edit Post</Button>}
                                        </div>
                                        <div>
                                            <Button className="py-0 w-100 mb-1" variant="outline-primary" onClick={handleShowReportOpen}>Report Post</Button>
                                        </div>
                                    </Popover.Content>
                                    </Popover>
                                </Overlay>
                            </div>

                        </div>
                    </Media.Body>
            </Media>
            <Modal.Header className="px-2 py-0">
                {postData&&postData.type == "post"?(
                                                <p className="mb-0">{postData&&postData.title}</p>
                                            ):(<p className="mb-0">Grade : {postData&&postData.grade}{',  '}{postData&&postData.title}</p>
                                            )}
            </Modal.Header>
            {postData?(
                <>
                 {postData.type == "post" ? (
                    <Tabs defaultActiveKey={getDefaultActiveKey()} transition={false} id="post-tab">
                        {postData.youtubeId&&(
                            <Tab eventKey="video" title="Video"> 
                                <YouTube videoId={postData.youtubeId} opts={opts} />
                            </Tab>
                        )}
                        {postData.files.length?(
                            <Tab eventKey="file" title="files">
                                <Scrollbars style={{ height: "50vh" }}>
                                <Row className="p-1">  
                                    {postData.files.map((file)=>(
                                        <Col xs={6} sm={4} className="mb-1">
                                            <Card>
                                                <Card.Img variant="top" src={file.icon_url} />
                                                <Card.Body className="p-0 px-1">
                                                    <small>{file.name}</small>
                                                    <div className="d-flex justify-content-between my-1">
                                                        <Badge pill variant="primary" className="w-100"><a className="text-light" href={file.view_url} target="_blank">View</a></Badge>
                                                        {/* <Badge pill variant="success">
                                                            <a id="all-link" href="http://www.africau.edu/images/default/sample.pdf">Download</a>
                                                        </Badge> */}
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                                </Scrollbars>
                            </Tab>
                        ):(
                            ""
                            // <Tab eventKey="file" title="files">
                            //     <a href="https://drive.google.com/file/d/1hujrhzm_KtcCA36kMfW-eX40AXIQoXcf/view?usp=sharing">File</a>
                            // </Tab>
                        )}
                        {postData.description&&(
                            <Tab eventKey="discription" title="Discription">
                                <Scrollbars style={{ height: "50vh" }}>
                                    <div className="px-2 pt-1">{parse(postData.description)}</div>
                                </Scrollbars> 
                            </Tab>
                        )}
                    </Tabs>
                ):(
                    <Card>
                        {postData.description&&(
                            <Scrollbars autoHeight>
                                <div className="px-2 pt-1">{parse(postData.description)}</div>
                            </Scrollbars> 
                        )}
                    </Card>
                )}
                </>
            ):""}
            {postData.type == "question"&&(
                <div className="px-1">
                    <div className="d-flex justify-content-between">
                        <div>
                            <small>No of Answers : {postData.answers.length}</small>
                            <Badge className="px-1 ml-1" variant="primary">View</Badge>
                        </div>
                        <div>
                            {user&&(
                                <Button variant="outline-primary" onClick={handleAnswerShow} size="sm" className="py-0">Answer Question</Button>
                            )}
                        </div>
                    </div>
                </div>
            )}
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
                <Modal className="px-0" show={showPromote} onHide={() => setShowPromote(false)} centered>
                    <Modal.Header className="py-0 pt-2" closeButton>
                        <Modal.Title >Promote Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <PromotePost postId={postData._id} />
                    </Modal.Body>
                </Modal>
                <Button className="py-0" variant="" onClick={() => setShowPromote(true)} ><BiShare /> Promote</Button>
            </div>
            )}
        </Modal.Dialog>
    )
}

export default Post
