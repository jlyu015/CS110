import React, { useState } from 'react';
import NewPost from './NewPost';
import Voter from './voter';

function Comment(props) {

    console.log("comment", props)
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [replies, setReplies] = useState([]);
    const [show, setShow] = useState(false)
    const [comments, setComments] = useState([])
    const addComment = (comment) => {
      setComments([...comments, comment]);
    } 
    const addReply = (reply) => {
        props.addReply(reply)
    }
    const toggleShowPost = () => {
        setShow(!show);
    }
    return (
        <div className="Comment">
            name: {props.comment.name}
            text: {props.comment.text}
            <Voter/>
            <div className = "reply button">
                <button onClick={()=>setShow(!show)}>reply {!show? "show":"hide"}</button>
            </div>
            {show && <NewPost addComment = {addComment}/>}
            <div className="commentContainer">
                {comments.map((comment)=> (
                    <Comment addComment = {addReply} comment={comment}></Comment>
                ))}
            </div>
        </div>

    );
}

export default Comment;
