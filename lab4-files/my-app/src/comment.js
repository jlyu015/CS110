import React, { useState } from 'react';


function Comment() {
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [replies, setReplies] = useState([]);

    handleNameChange = (event) =>{
        setName(event.target.value);
    }

    handleTextChange = (event) =>{
        setText(event.target.value);
    }

    handleReply = (event) => {
        if()
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const newReply = {
            name: name,
            text: text,
            replies: [],
        };
        
        setName('');
        setText('');

    };

    return (
        <div className="Comment">
            this is comment
        </div>
    );
}

export default Comment;
