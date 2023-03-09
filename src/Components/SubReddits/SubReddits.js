import React, { useEffect, useRef, useState } from 'react'
import "./SubReddits.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"


import {useDispatch, useSelector} from "react-redux";
import { loadSubreddits, selectSubreddits } from './SubRedditSlice';
import { loadPostBySubreddit, selectIsLoading } from '../Posts/PostsSlice';


import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function SubReddits() {    
    const dispatch = useDispatch();

    const [activeSubreddit, setActiveSubreddit] = useState('');

    useEffect(() => {
        dispatch(loadSubreddits());
    }, [dispatch])

    const subreddits = useSelector(selectSubreddits);
    const isLoading = useSelector(selectIsLoading);


    const scroll = useRef();   

    function onScrollButton(amt) {
        scroll.current.scrollLeft += amt;
    }

    function getPostsBySubreddit(subreddit) {

        setActiveSubreddit(subreddit.title)
        // console.log(subreddit.display_name_prefix);

        dispatch(loadPostBySubreddit(subreddit.display_name_prefix));

    }


    return (
        <>
        <div className='subreddit-wrapper' ref={scroll}>
            <button className="btn-scroll" id="btn-scroll-right" onClick={()=> onScrollButton(500)}><FontAwesomeIcon icon={faChevronRight} className="fa-2x"/></button>
            <button className="btn-scroll" id="btn-scroll-left" onClick={()=> onScrollButton(-500)}><FontAwesomeIcon icon={faChevronLeft} className="fa-2x"/></button>
            <FontAwesomeIcon />
            <div className='subreddit-container'>
                {
                subreddits.map((subreddit, index) => {
                    return (
                        <div className={activeSubreddit === subreddit.title ? "subreddit active-subreddit" : "subreddit"} id={isLoading ? "loading" : ""} key={index}>
                            <img src={subreddit.icon} alt="subreddit icon" className='subreddit-icon'/>
                            <h3 className='subreddit-title' value={subreddit.title} onClick={() => getPostsBySubreddit(subreddit)}>{subreddit.title}</h3>
                        </div>
                    )
                })

                }  
            </div>
        </div>

        </>
    )
}
