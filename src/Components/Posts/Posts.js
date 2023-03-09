import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Post from './Post'
import "./Posts.css";
import PostsSkeleton from './PostsSkeleton';
import { loadPosts, selectPosts } from './PostsSlice';

export default function Posts() {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        dispatch(loadPosts()).then((response) =>{
            setIsLoading(false);
        });
    }, [dispatch])

    const posts = useSelector(selectPosts);

    


    return (
        <div className='posts-container'>
            {isLoading && <PostsSkeleton posts={3}/>}
            {
                posts.map((post, index) => {
                    return <Post post={post} key={index}/>
                })
            }
        </div>
    )
}
