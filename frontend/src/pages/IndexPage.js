import { useEffect, useState } from "react";
import Post from "../components/post";

export default function IndexPage () {
  const [posts,setPosts] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:4000/post')
        .then(response => response.json())
        .then(posts => {
            console.log(posts); // Log fetched posts
            setPosts(posts);
        })
        .catch(error => console.error('Error fetching posts:', error));
  }, []);

  console.log(posts); // Log state of posts array
  

    return (
      <>
        {posts.length > 0 && posts.map(post => (
          <Post key={post._id} {...post} />
        ))}
      </>
    );
  }
