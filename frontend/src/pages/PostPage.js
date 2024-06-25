import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {formatISO9075} from "date-fns";
// import {UserContext} from "/frontend/src/userContext";
import {Link} from 'react-router-dom';

export default function PostPage() {
  const [postInfo,setPostInfo] = useState(null);
//   const {userInfo} = useContext(UserContext);
  const {_id} = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/post/${_id}`)
      .then(response => {
        response.json().then(postInfo => {
            console.log(postInfo);
            setPostInfo(postInfo);
        });
      });
  }, []);

  if (!postInfo) return '';

  const authorUsername = postInfo.author && postInfo.author.username ? postInfo.author.username : 'Anonymous';

  return (
    <div className="post">
      <h1>{postInfo.title}</h1>
      <hr/>
      <div className="author">by @{authorUsername}</div>
      <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}} />
      <div className="image">
        <img className="image" src={`http://localhost:4000/${postInfo.cover}`} alt=""/>
      </div>
      <time style={{marginTop:"30px"}}>{formatISO9075(new Date(postInfo.createdAt))}</time>
    </div>
  );
}