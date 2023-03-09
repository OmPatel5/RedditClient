import React from 'react'
import { useDispatch } from 'react-redux';
import { getPostBySearch } from '../Posts/PostsSlice';
import './SearchBar.css'

export default function SearchBar() {

  const dispatch = useDispatch();

  const onSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target[0].value;

    if (searchTerm) {
      dispatch(getPostBySearch(searchTerm));
    }


  }

  return (
    <div class="search-bar"> 
        <form className='searchBar' onSubmit={onSearch}>
            <input type="text" class="search-input" placeholder="Search Reddit" />
        </form>
    </div>
  )
}
