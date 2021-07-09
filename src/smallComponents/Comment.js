import { Card, Image } from 'react-bootstrap'
import { AiFillMinusCircle } from "react-icons/ai";

const Comment = ({comment, isOwner, deleteComment}) => {
    return (
        <Card className="p-1 mt-1">
            <div className="d-flex flex-row" >
                <Image width={20} height={20} className="mr-1" src={comment.avatar} roundedCircle />
                <div className="w-100">
                    <div className="d-flex justify-content-between">
                        <small>{comment.name}</small>
                        {isOwner&&<AiFillMinusCircle onClick={()=>deleteComment(comment._id)} className="text-danger mr-2" />}
                    </div>
                    <Card className="p-1" >
                        <p className="mb-1" style={{lineHeight:"98%"}}>{comment.content}</p>
                    </Card>
                </div>
            </div>
        </Card>
    )
}

export default Comment
