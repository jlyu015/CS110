import React, { useState } from 'react';

function NewPost(props) {
  console.log(props)
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  function submit(event) {
    event.preventDefault();
    if (name && text) {
      props.addComment({name, text, replies: [], depth: 0});
      setName('');
      setText('');
    }
  }

  const nameChange = (event) => {
    setName(event.target.value);
  }
  
  const nextChange = (event) => {
    setText(event.target.value);
  }

  const buttonStyle = {
    backgroundColor: name && text ? '#4281fa' : null
  }

  return (
    <div className ="post">
        <div className='post-name'>
            <input type="text" value={name} onChange={nameChange} placeholder='Name...'/>
        </div>
        <div className='post-text'>
            <input type="text" value={text} onChange={nextChange} placeholder='Write a new post' />
        </div>
        <button className='post-button'  style = {buttonStyle} onClick={submit}>Post</button>
    </div>
  );
}

export default NewPost;
