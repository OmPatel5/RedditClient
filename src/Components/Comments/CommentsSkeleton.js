import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import './CommentsSkeleton.css'

export default function CommentsSkeleton({comments}) {
  return (
    Array(comments).fill(0).map((_, index) => (
        <div className='comments-skeleton' key={index}>
            <div className='commentInfo'>
                <div className='pfp'>
                    <Skeleton circle width={40} height={40}/>
                </div>
                <div className='username'>
                    <Skeleton />
                </div>
            </div>

            <div className='content'>
                <Skeleton />
            </div>  
        </div>
    ))
    
  )
}
