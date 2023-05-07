import React, { useState } from 'react';

function Comment(props) {
  const [name, setName] = useState('');
  const [text, setText] = useState('');


  function addComment(event) {
    setName(event.target.value);
  }

  function handleTextChange(event) {
    setText(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (name && text) {
      props.addComment(name, text);
      setName('');
      setText('');
    }
  }

  function handleReplyClick(event) {
    event.preventDefault();
    props.setReplyTo(props.comment.id);
  }

  return (
    <div className="comment">
      <div className="comment-header">
        <span className="comment-author">{props.comment.author}</span>
        <span className="comment-time">{props.comment.time}</span>
      </div>
      <div className="comment-body">{props.comment.text}</div>
      <div className="comment-footer">
        <button onClick={handleReplyClick}>Reply</button>
        <div className="comment-replies">
          {props.comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              addComment={props.addComment}
              setReplyTo={props.setReplyTo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Comment;
