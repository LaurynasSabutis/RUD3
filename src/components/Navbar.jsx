

import "./NavBar.css"

// As a user, I want to navigate between Home, Movies, TV Series, and Bookmarked Shows so that I can easily access different types of content.

const Navbar = () => {
  return (
    // Nav Content
    <div className='nav-container'>
        <div className='logo'>
          <img src='/assets/logo.svg'></img>
        </div>
<div className='nav-items'>
          {/* Nav items */}
          <nav >
            <ul>
              <li>
                <a href='/'><img src='/assets/icon-nav-home.svg'></img></a>
              </li>
              <li>
                                <a href='/movies'><img src='/assets/icon-nav-movies.svg'></img></a>

              </li>
              <li>
                                <a href='/tv_series'><img src='/assets/icon-nav-tv-series.svg'></img></a>

              </li>
              <li>
                                <a href='/bookmarked_items'><img src='/assets/icon-nav-bookmark.svg'></img></a>

              </li>
            </ul>
          </nav>
          <div className='nav-profile' >
          <img width={50}  src='/assets/image-avatar.png'></img>
        </div>   
     
        </div>
        
    </div>
  )
}

export default Navbar