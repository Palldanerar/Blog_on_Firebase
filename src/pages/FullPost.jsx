import React, { useState, useEffect } from 'react'
import { getDoc, doc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { database } from '../firebase';

const FullPost = () => {

    const { id } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        const getPost = async () => {
          const docRef = doc(database, "posts", id);
          const docSnap = await getDoc(docRef);
          console.log(docSnap.data())
          if (docSnap.exists()) {
            setPost(docSnap.data())
          } else {
            navigation("/");
          }
        };
    
        getPost();
      }, []);

  return (
    <>
        <img src={post.url} alt={post.title} />
        <h2>{post.title}</h2>
        <p>{post.body}</p>
    </>
  )
}

export default FullPost