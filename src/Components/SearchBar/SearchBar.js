import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getPostBySearch, loadPostBySubreddit } from '../Posts/PostsSlice';
import './SearchBar.css'

export default function SearchBar() {

  const dispatch = useDispatch();

  const onSearchPosts = (e) => {
    e.preventDefault();
    const searchTerm = e.target[0].value;

    if (searchTerm) {
      dispatch(getPostBySearch(searchTerm));
    }


  }


  const onSearchSubreddit = (e) => {
    e.preventDefault();
    const searchTerm = e.target[0].value;
    dispatch(loadPostBySubreddit(searchTerm)).then((response) => {
      if (response.error) {
        alert('Subreddit Not Found');
      }
    });
  }

  return (
    <div className='search-bars-container'>
      <div className="search-bar search-subreddits"> 
          <form className='searchBar' onSubmit={onSearchSubreddit}>
              <input type="text" class="search-input subreddits" placeholder="r/subreddit" pattern='r/[a-zA-Z0-9]+' />
          </form>
          
      </div>

      <div className="search-bar search-posts"> 
          <form className='searchBar' onSubmit={onSearchPosts}>
              <input type="text" class="search-input" placeholder="Search Posts" />
          </form>
      </div>
    </div>
  )
}
