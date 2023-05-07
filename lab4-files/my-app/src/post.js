import {userState} from "react";

function NewPost(props) {
    

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