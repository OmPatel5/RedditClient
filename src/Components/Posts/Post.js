import React, { useEffect, useState } from 'react'
import "./Posts.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faComment } from "@fortawesome/free-solid-svg-icons";
import Comments from '../Comments/Comments';
import Iframe from 'react-iframe'






export default function Post({post}) {
    const [showComments, setShowComments] = useState(false);


    return (
        <div className="post">
            <div className='upvotes'>
                    <FontAwesomeIcon icon={faArrowUp} className="fa-2x upvote-arrow up-arrow"/>
                    <h3 className='num-upvotes'>{post.upvotes}</h3>
                    <FontAwesomeIcon icon={faArrowDown} className="fa-2x upvote-arrow"/>
            </div>
            <div className='post-info'>
                <h1 className='post-title'>{post.title}</h1>

                {post.media && <img className="post-img" src={post.media} alt=""/>}

                <hr className='post-line'/> 

                <div className='extra-info'>
                    <p className='postedby'>Posted By: <span className='post-name'>{post.postedBy}</span></p>
                    <p className='postedDate'>{post.date}</p>

                    <p className='comment-amt'><button className='comments-button' onClick={() => showComments ? setShowComments(false) : setShowComments(true)}><img className="comment-icon" src='https://www.freeiconspng.com/thumbs/comment-png/comment-png-1.png' /></button>{post.numComments}</p>
                </div>
            </div>

           

            <div className={showComments ? "comments" : ""}>
                {showComments && <Comments commentUrl={post.commentsUrl} className="hi" comments={post.comments}/>}
            </div>
        </div>
    )
}
