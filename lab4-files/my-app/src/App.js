import logo from './logo.svg';
import './App.css';
import {useState} from "react";

import Comment from "./comment";
import NewPost from './NewPost';
import Voter from './voter';

function App() {
  const [comments, setComments] = useState([])
  const addComment = (comment) => {
    setComments([...comments, comment]);
  } 

  const addReply = (reply) => {
    
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className = "postContainer">
          <div className = "title">
            New Post
          </div>
          <NewPost addComment = {addComment}></NewPost>
        </div>
        <div className="commentContainer">
          {comments.map((comment)=> (
            <div className='commentid'>
              <Comment addComment = {addReply} comment={comment} depth = {0}></Comment>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
