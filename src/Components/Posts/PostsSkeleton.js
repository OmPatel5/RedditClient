import React from 'react'
import Skeleton from 'react-loading-skeleton'
import "./PostsSkeleton.css"

export default function PostsSkeleton({posts}) {
  return (
    Array(posts).fill(0).map((_, index) => (
    <div className='posts-skeleton' key={index}>

        <div className='upvotes-skeleton'>
            <Skeleton height={80}/>
        </div>

        <div className='post-info'>
            <h1 className='title'>
                <Skeleton />
            </h1>

            <div className='media'>
                <Skeleton height={300}/> 
            </div>

            <div className='postedBy'>
                <Skeleton />
            </div>

            
        </div>
    </div>
    ))
  )
}
