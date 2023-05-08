import React, { useState } from 'react';

function NewPost(props) {
  console.log(props)
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (name && text) {
      props.addComment({name, text, replies: []});
      setName('');
      setText('');
    }
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  }
  
  const handleTextChange = (event) => {
    setText(event.target.value);
  }


  return (
    <div className ="post">
        <div className='post-name'>
            <input type="text" value={name} onChange={handleNameChange} placeholder='Name...'/>
        </div>
        <div className='post-text'>
            <input type="text" value={text} onChange={handleTextChange} placeholder='Write a new post' />
        </div>
        <button onClick={handleSubmit}>Post</button>
    </div>
  );
}

export default NewPost;
