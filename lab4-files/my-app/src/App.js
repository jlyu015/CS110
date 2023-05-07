import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import NewPost from './NewPost';
import Comment from './comment';

function App() {
  const[comments, setComments] = useState([]);

  const addComment = (name, text) => {
    if(name && text){
      const newComment = { name, text, replies: []};
      setComments([newComment, ...comments]);
    }
  };

  const addReply = (name, text, commentIndex, replyIndex) => {
    if (name && text) {
      const newReply = { name, text };
      const updatedComments = [...comments];
      if (replyIndex !== undefined) {
        updatedComments[commentIndex].replies[replyIndex].replies.push(newReply);
      } else {
        updatedComments[commentIndex].replies.push(newReply);
      }
      setComments(updatedComments);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className='postContainer'>
          <div id='title'>
            New Post
          </div>
          <NewPost addComment={addComment}></NewPost>
        </div>
        <div className='commentContainer'>
          {comments.map((comment) => (
            <Comment addComment ={addReply} comment={comment}></Comment>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
