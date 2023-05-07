import React, { useState } from 'react';

function NewPost(props) {
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  function handleNameChange(event) {
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

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <label>
        Text:
        <textarea value={text} onChange={handleTextChange} />
      </label>
      <button type="submit">Post</button>
    </form>
  );
}

export default NewPost;
