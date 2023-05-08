import {useState, useTransition, userState} from "react";

function NewPost(props) {
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
        <div className="NewPost">
            <input id = "userName" type="text"/>
            <input id = "textContent" type="text"/>
            <button onClick={() => {
                let userName = document.getElementById("userName").value;
                let textContent = document.getElementById("textContent").value;
            }}> submit </button>
        </div>
    );
}





export default NewPost;