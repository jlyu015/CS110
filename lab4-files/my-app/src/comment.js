import React, { useState } from 'react';


function Comment() {
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [replies, setReplies] = useState([]);

    
    return (
        <div className="Comment">
            this is comment
        </div>
    );
}

export default Comment;
