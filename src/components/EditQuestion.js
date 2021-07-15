import React,{ useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Form, Col, Button} from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';


const EditQuestion = ({id, choice}) => {
    
    //const editorRef = useRef(null);

    const [questionData,setQuestionData] = useState({
        medium:"",
        grade:"",
        title:"",
        question:""
    })

    useEffect(()=>{
        //getQuestionData()
    },[])

    // const getQuestionData = ()=>{
    //     axios({
    //         method: "GET",
    //         url: "http://localhost:5000/question/60eee03d7ef131b1df14d996",
    //     }).then((response) => {
    //         if(response.data){
    //             setQuestionData(response.data)
    //         }
    //     })
    // }

    // const updateQuestion = ()=>{ 
    //     axios({
    //         method:"POST",
    //         url: "http://localhost:5000/question/update/60eee03d7ef131b1df14d996",
    //         headers: {"Authorization" : `Bearer ${JSON.parse(localStorage.getItem("user")).token}`},
    //         data:questionData
    //     }).then((response)=>{
    //         console.log(response.data)
    //         setQuestionData(response.data)
    //     })
    // }

    // const updateTextEditorValue = ()=>{
    //     setQuestionData({...questionData,["question"]:editorRef.current.getContent()})
    // }

    return (
        <div className="mx-1">
            <Form>
                <Form.Row className="align-items-center mb-1">
                    <Col xs="auto" className="w-50">
                        <Form.Label className="mb-0"><small>Medium</small></Form.Label>
                        <Form.Control
                            size="sm"
                            as="select"
                            className="mr-sm-2"
                            id="mediumSelect"
                            name="medium"
                            value = {questionData.medium}
                            custom
                        >
                        <option value=""></option>
                        {choice.medium.map((lan, idx) => (
                                <option key={idx} value={lan}>{lan}</option>
                        ))}
                        </Form.Control>
                    </Col>
                    <Col xs="auto" className="w-50">
                        <Form.Label className="mb-0"><small>Grade</small></Form.Label>
                        <Form.Control
                            size="sm"
                            as="select"
                            className="mr-sm-2"
                            id="mediumSelect"
                            name="medium"
                            value = {questionData.grade}
                            custom
                        >
                        <option value=""></option>
                        {choice.grade.map((lan, idx) => (
                                <option key={idx} value={lan}>{lan}</option>
                        ))}
                        </Form.Control>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col xs="auto" className="w-50">
                        <Form.Label className="mb-0"><small>Subject</small></Form.Label>
                        <Form.Control
                            size="sm"
                            as="select"
                            className="mr-sm-2"
                            id="mediumSelect"
                            name="medium"
                            value = {questionData.grade}
                            custom
                        >
                        <option value=""></option>
                        {choice.grade.map((lan, idx) => (
                                <option key={idx} value={lan}>{lan}</option>
                        ))}
                        </Form.Control>
                    </Col>
                </Form.Row>
                <Form.Group className="mb-1">
                    <Form.Label className="mb-0" ><small>Question Title</small></Form.Label>
                    <Form.Control size="sm" type="Text" value={questionData.title} placeholder="Be specific and imagine you’re asking a question to another person" />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="mb-0" ><small>Question Body</small></Form.Label>
                    {/* <Editor
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={questionData.question}
                        onChange={updateTextEditorValue}
                        init={{
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    /> */}
                </Form.Group>
                {/* <Button varient="primary" size="sm" onClick={updateQuestion} block>Update</Button> */}
            </Form>
        </div>
    )
}

export default EditQuestion
