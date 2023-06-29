import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, database } from "../firebase";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const postsCollectionRef = collection(database, "posts");
  const navigation = useNavigate();

  const createNewPost = async () => {
    if (title !== "" && body !== "") {
      await addDoc(postsCollectionRef, {
        title,
        body,
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
      });
      navigation("/");
    }
  };

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label>Title:</label>
          <input
            placeholder="Title..."
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="inputGp">
          <label>Post:</label>
          <textarea
            placeholder="Post..."
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <button onClick={createNewPost}>Submit Post</button>
      </div>
    </div>
  );
};

export default CreatePost;
