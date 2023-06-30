import React, { useState, useEffect } from "react";
import { updateDoc, collection, getDoc, doc } from "firebase/firestore";
import { auth, database } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";

const CreatePost = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const navigation = useNavigate();

  const updatePost = async () => {
    if (title !== "" && body !== "") {
      const washingtonRef = doc(database, "posts", id);

      await updateDoc(washingtonRef, {
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

  useEffect(() => {
    const getPost = async () => {
      const docRef = doc(database, "posts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTitle(docSnap.data().title);
        setBody(docSnap.data().body);
      } else {
        navigation("/");
      }
    };

    getPost();
  }, []);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Edit A Post</h1>
        <div className="inputGp">
          <label>Title:</label>
          <input
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="inputGp">
          <label>Post:</label>
          <textarea
            placeholder="Post..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <button onClick={updatePost}>Edit Post</button>
      </div>
    </div>
  );
};

export default CreatePost;
