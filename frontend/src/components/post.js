import { formatISO9075 } from 'date-fns';
import { Link } from'react-router-dom';
export default function Post({_id, title, summary, cover, author, createdAt}) {
    const authorUsername = author && author.username ? author.username : 'Anonymous';

    return (
        <div className="post">
            <Link className='post-title' to={`/post/${_id}`}>
                <h2 className="post-title">{title}</h2>
            </Link>
            <p className="summary">{summary}</p>
                <img src={'http://localhost:4000/'+ cover } alt="cover"/>
            <p className="info">
                <span className='info'>{authorUsername}</span>   
                <time>{formatISO9075(new Date(createdAt))}</time>
            </p>
        </div>
    )
}
