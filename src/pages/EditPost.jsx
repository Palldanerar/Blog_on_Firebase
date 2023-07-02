import React, { useState, useEffect } from "react";
import { updateDoc, collection, getDoc, doc } from "firebase/firestore";
import { auth, database } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";

const CreatePost = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [url, setUrl] = useState("");

  const navigation = useNavigate();

  const updatePost = async () => {
    if (title !== "" && body !== "") {
      const washingtonRef = doc(database, "posts", id);

      await updateDoc(washingtonRef, {
        title,
        body,
        url,
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
        setUrl(docSnap.data().url)
      } else {
        navigation("/");
      }
    };

    getPost();
  }, []);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Редактирование</h1>
        <div className="inputGp">
          <label>URL</label>
          <input
            placeholder="Ссыдка"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="inputGp">
          <label>Заголовок:</label>
          <input
            placeholder="Заголовок..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="inputGp">
          <label>Описание:</label>
          <textarea
            placeholder="Описание..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <button onClick={updatePost}>Сохранить изменения</button>
      </div>
    </div>
  );
};

export default CreatePost;
