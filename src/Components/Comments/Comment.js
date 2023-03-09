import React, { useEffect, useState } from 'react'
import { loadProfilePics} from '../Posts/PostsSlice';
import moment from 'moment';



// import { loadProfilePics, selectProfilePics } from './CommentsSlice';

export default function Comment({comment}) {
    const [profilePic, setProfilePic] = useState('');
    

    useEffect(() => {
        loadProfilePics(comment).then((response) => {
            setProfilePic(response);
        })
    }, [comment]);

    

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
