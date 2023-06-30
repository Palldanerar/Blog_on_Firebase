import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database, auth } from "../firebase";
import { Link } from "react-router-dom";

const Home = ({ isAuth }) => {
  const [postsList, setPostsList] = useState([]);

  const postCollectionRef = collection(database, "posts");

  const deletePost = async (id) => {
    const postDoc = doc(database, "posts", id);
    await deleteDoc(postDoc);
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, [deletePost]);

  return (
    <div className="homePage">
      {postsList.map((post) => {
        return (
          <div
            key={post.id}
            className="post"
          >
            <img src={post.url} />
            <div className="postHeader">
              <div className="title">
                <h2>{post.title}</h2>
              </div>
              <div className="deletePost">
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <Link to={`edit/${post.id}`}>🖊️</Link>
                )}
              </div>
              <div className="deletePost">
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    {" "}
                    &#128465;
                  </button>
                )}
              </div>
            </div>
            <div className="postTextContainer">
              {post.body.length < 150
                ? post.body
                : `${post.body.substr(0, 249)}...`}
            </div>
            <h4>@{post.author.name}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
