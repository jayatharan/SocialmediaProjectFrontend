import { useEffect, useState } from 'react'
import { Row, Col, Form, Button, Spinner, Modal, Alert, Card, Image, Tabs, Tab } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Scrollbars } from 'react-custom-scrollbars-2';
import YouTube from 'react-youtube';
import parse from 'html-react-parser';
import axios from 'axios'

const AnswerQuestion = ({user,post,handleAnswerClose}) => {
    const opts = {
        width: '100%',
        playerVars:{
            autoplay: 0,
        }
    }

    const [answerData, setAnswerData] = useState({
        userId:user.user._id,
        user:{
            name:user.user.name,
            avatar:user.user.avatar
        }
    })

    const handleChange = (e)=>{
        var name = e.target.name
        var value = e.target.value
        setAnswerData({...answerData,[name]:value})
    }

    const youtube_parser = (url)=>{
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length===11)? match[7] : false;
    }

    const setYoutubeId = (e)=>{
        var youtube_id = youtube_parser(e.target.value)
        setAnswerData({...answerData,youtubeId:youtube_id})
    }

    const getYoutubeUrl = ()=>{
        var url = `https://www.youtube.com/watch?v=${answerData&&answerData.youtubeId}`
        if(url === "https://www.youtube.com/watch?v=undefined" || url === "https://www.youtube.com/watch?v=false")  return ""
        else return url
    }

    const handleQuill = (e)=>{
        if(answerData){
            setAnswerData({...answerData,["description"]:e})
        }
    }

    const getDefaultActiveKey = ()=>{
        if(answerData){
            if(answerData.youtubeId) return "video"
            else if (answerData.discription) return "discription"
        }
        return ""
    }

    const addAnswer = ()=>{
        axios.post(`http://localhost:5000/post/${post._id}/add-answer`,answerData)
        .then((res)=>{
            handleAnswerClose()
        })
    }

    return (
        <div>
            <Scrollbars style={{ height: "80vh" }}>
                <Modal.Dialog>
                    <Modal.Body>
                        <div>
                        <Card className="p-1 m-1">
                            <div className="d-flex justify-content-between">
                                <div className="d-flex justify-content-start">
                                    <Image width={40} height={40} className="mr-3" src={user.user.avatar} roundedCircle />
                                    <div style={{position:'relative'}}>
                                        <div>
                                            <b>{user.user.name}</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        </div>
                        <Form>
                            <Form.Group controlId="postYoutubeId" className="mb-0">
                                <Form.Label className="mb-0">Youtube URL</Form.Label>
                                <Form.Control onChange={setYoutubeId} className="py-0" type="text" value={getYoutubeUrl()} />
                            </Form.Group>
                            <Form.Group controlId="postDescription" className="mb-0">
                                <Form.Label className="mb-0">
                                    Answer
                                </Form.Label>
                                <ReactQuill theme="snow" value={answerData&&answerData.description} onChange={handleQuill} />
                            </Form.Group>
                            <Form.Group controlId="postDescription" className="mb-0">
                                <Button className="mt-2" variant="primary" size="sm" block onClick={addAnswer} >
                                    Add Answer    
                                </Button>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                </Modal.Dialog>
                <Card className="">
                    <Tabs defaultActiveKey={getDefaultActiveKey()} transition={false} id="answer-tab">
                        {answerData.youtubeId&&(
                            <Tab eventKey="video" title="Video"> 
                                <YouTube videoId={answerData.youtubeId} opts={opts} />
                            </Tab>
                        )}
                        {answerData.description&&(
                            <Tab eventKey="discription" title="Discription">
                                <Scrollbars style={{ height: "50vh" }}>
                                    <div className="px-2 pt-1">{parse(answerData.description)}</div>
                                </Scrollbars> 
                            </Tab>
                        )}
                    </Tabs>
                </Card>
            </Scrollbars>
        </div>
    )
}

export default AnswerQuestion
