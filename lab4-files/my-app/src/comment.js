import React, { useState } from 'react';
import NewPost from './NewPost';
import Voter from './voter';

function Comment(props) {
    console.log("comment", props)
    const [show, setShow] = useState(false)
    const [comments, setComments] = useState([])
    const [depth, setDepth] = useState(0);
    const addComment = (comment) => {
      setComments([...comments, comment]);
    } 
    const addReply = (reply, depth) => {
        // if(props.depth < 3){
        //     props.addReply(reply);
        //     reply.depth = depth + 1;
        // }
    }
    const toggleShowPost = () => {
        setShow(!show);
    }
    return (
        <div className="Comment">
            <div className="comment-name">
                {props.comment.name}
            </div>
            <div className="comment-text">
                {props.comment.text}
            </div>
            
            <Voter/>
            <div>
                {props.depth < 3 && <button className='reply-button' onClick={()=>setShow(!show)}>reply {!show? "":""}</button>}
            </div>
            
            <div className="commentContainer">
                {comments.map((comment)=> (
                    <Comment addComment = {addReply} comment={comment} depth = {props.depth + 1}></Comment>
                ))}
            </div>
            {show && <NewPost addComment = {addComment}/>}
        </div>

    );
}

export default Comment;