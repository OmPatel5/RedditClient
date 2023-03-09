// import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
// import { useDispatch, useSelector } from 'react-redux';
import { loadCommentsForPost, selectIsLoading } from '../Posts/PostsSlice.js';
import Comment from './Comment.js';
import "./Comments.css"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import CommentsSkeleton from './CommentsSkeleton.js';

export default function Comments({commentUrl}) {

    const [isLoading, setIsLoading] = useState(false);
    const [doneFetching, setDoneFetching] = useState(false);

    
    const [comments, setComments] = useState([]);
    console.log(comments)

    useEffect(() => {
        setIsLoading(true)
        loadCommentsForPost(commentUrl).then((response) => {
            setComments(response)
            setIsLoading(false);
            setDoneFetching(true);
        });
    }, [commentUrl])


    return (
        <div className='comments'>
            <h1 className='comments-title'>Comments</h1>
            {comments.length === 0 && doneFetching===true ? <h2>No Comments Yet!</h2> : ""}
            {isLoading && <CommentsSkeleton comments={8}/>}
            {comments.map((comment) => {
                return (<Comment comment={comment} />)
                
            })}
        </div>
    )
}
