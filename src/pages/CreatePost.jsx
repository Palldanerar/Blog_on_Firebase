import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, database } from "../firebase";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [url, setUrl] = useState("")
  const [category, setCategory] = useState(["Stydi"])

  const postsCollectionRef = collection(database, "posts");
  const navigation = useNavigate();

  const addCategory = (e) => {
    const arrCategory = e.target.value.split(", ")
    setCategory(arrCategory)
    console.log(category)
  }

  const createNewPost = async () => {
    if (title !== "" && body !== "") {
      await addDoc(postsCollectionRef, {
        title,
        body,
        url,
        category: category,
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
          <label>URL:</label>
          <input
            placeholder="URL img..."
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
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
        <div className="inputGp">
          <label>Category</label>
          <input
            placeholder="Category(Separate by comma with capital)..."
            onChange={(e) => addCategory(e)}
          />
        </div>
        <button onClick={createNewPost}>Submit Post</button>
      </div>
    </div>
  );
};

export default CreatePost;
