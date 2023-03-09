import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import "./NavBar.css"

export default function Navbar() {
  return (
    <>
        <nav className='navbar'>
            <div className="logo">
                <img className="reddit-logo" src="https://upload.wikimedia.org/wikipedia/en/7/70/AlienBlue_Icon.png" alt="reddit logo"/>
                <h1 className='logo-name'><span className='logo-span'>Reddit</span>Minimal</h1>
            </div>

            <div className='searchBar'>
                <SearchBar />
            </div>
        </nav>
        <div id="line"><hr /></div>
    </>
  )
}
