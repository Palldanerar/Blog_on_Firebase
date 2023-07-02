import React, { useState, useEffect } from 'react'
import { getDoc, doc, deleteDoc } from "firebase/firestore";
import { useParams, useNavigate, Link } from "react-router-dom";
import { auth, database } from '../firebase';

const FullPost = ({isAuth}) => {

    const { id } = useParams();
    const [post, setPost] = useState({});
    const [isRights, setIsRights] = useState(false)
    const navigation = useNavigate()

    const deletePost = async (id) => {
      const postDoc = doc(database, "posts", id);
      await deleteDoc(postDoc);
      navigation("/")
    };

    useEffect(() => {
        const getPost = async () => {
          const docRef = doc(database, "posts", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setPost(docSnap.data())
           setIsRights(docSnap.data().author.id == auth.currentUser.uid)
          } else {
            navigation("/");
          }
        };
    
        getPost();
      }, []);

  return (
    <div className='fullPost'>
      {isAuth && isRights && (
        <div className='settingFullPost'>
        <Link to={`/edit/${id}`} >
          <button className='settingBtn edit'>Редактировать</button>
        </Link>
        <button className='settingBtn del' onClick={() => deletePost(id)}>Удалить</button>
      </div>
      )}
      <div className='fullPostItem'>
        {post.url && <img className='imgFullPost' src={post.url} alt={post.title} />}
        <h2 className='fullPostTitle'>{post.title}</h2>
        {post.body && <p className='fullPostBody'>{post.body}</p>}
      </div>
    </div>
  )
}

export default FullPost