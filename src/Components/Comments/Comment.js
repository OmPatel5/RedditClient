import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadProfilePics, selectIsLoading } from '../Posts/PostsSlice';
import moment from 'moment';
import { isAllOf } from '@reduxjs/toolkit';



// import { loadProfilePics, selectProfilePics } from './CommentsSlice';

export default function Comment({comment}) {
    const [profilePic, setProfilePic] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    

    useEffect(() => {
        setIsLoading(true);
        loadProfilePics(comment).then((response) => {
            setProfilePic(response);
            setIsLoading(false);
        })
    }, []);

    

    return (
    <div className='comment'>
        <div className='comment-info'>
            <img className="pfp" alt="pfp of user" src={profilePic ? profilePic : "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png"}/>
            <h3 className='user'>{comment.username}</h3>
            <p className='posted'>{moment.unix(comment.posted).fromNow()}</p>
        </div>

        <div className='text'>
            <p className='comment-text'>{comment.comment}</p>
        </div>

    </div>
    )
}
