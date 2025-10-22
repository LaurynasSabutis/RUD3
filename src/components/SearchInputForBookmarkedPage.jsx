import React from 'react'
import "./input.css"

const SearchInputForBookmarkedPage = () => {
  return (
    <div className='input-container'>
        <a><img src='/assets/icon-search.svg'></img></a>
        <input name='bookmarked_shows' type='text' placeholder='Search for bookmarked shows' autoComplete='off' maxLength={64}/>
    </div>
  )
}

export default SearchInputForBookmarkedPage