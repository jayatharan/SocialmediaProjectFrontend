import React from 'react'
import { Card, Image } from 'react-bootstrap'
import { BiMenu } from "react-icons/bi";

const Question = () => {

    const text = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32."

    return (
        <Card className="p-1 mb-1 mx-1">
            <div className="d-flex justify-content-between" >
                <div className="d-flex flex-row">
                    <Image width={20} height={20} className="mr-1" src="" roundedCircle />
                    <small>Question Owner Name</small>
                </div>
                <BiMenu />
            </div>
            <div className="d-flex flex-row" >
                <div style={{width:"75px"}}>
                    <div className="d-flex align-items-center flex-column text-secondary">
                        <div>0</div>
                        <small>votes</small>
                        <div>0</div>
                        <small>answers</small>
                    </div>
                </div>
                <div className="w-100">
                    <p className="mb-0 text-primary">Question Title</p>
                    <small style={{lineHeight:"10%"}}>{`${text.substring(0,150)}...`}</small>
                </div>
            </div>
            <div className="d-flex justify-content-between">    
                <small>0 views</small>    
                <small>view</small>
            </div>
        </Card>
    )
}

export default Question
