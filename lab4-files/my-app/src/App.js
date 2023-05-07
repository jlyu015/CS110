import logo from './logo.svg';
import './App.css';
import {useState} from "react";

import Comment from "./comment";
import NewPost from './post';

function App() {
  const [comments, setComments] = useState([])
  const addComment = (comment) => {
    setComments([...comments, comment]);
  } 

  const addReply = (reply, depth) => {
    const newComments = [...comments];


    //something here
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className = "postContainer">
          <div id = "title">
            new post
          </div>
          <NewPost addComment = {addComment}></NewPost>
        </div>
        <div className="commentContainer">
          {comments.map((comment)=> (
            <Comment addComment = {addReply} comment={comment}></Comment>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
