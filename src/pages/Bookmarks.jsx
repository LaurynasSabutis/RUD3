import React, { useEffect, useState } from 'react'
import "./Bookmarks.css"
import "./input.css"


const Bookmarks = () => {
    const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
    const [searchBookmarks, setSearchBookmarks] = useState()



    useEffect(() => {
        const fetchMovies = async () => {
            const res = await fetch("http://localhost:3000/posts")
            const json = await res.json()
            setBookmarkedMovies(json)
        }
        fetchMovies()
    }, [])
    const handleSearch = async (e) => {
        e.preventDefault()
        const search = await fetch(`http://localhost:3000/posts?title=a`,{
            method: "GET",
            "content-type": "application/json"

        })
        
        const json = await search.json()
        console.log(json)

    
    } 

  return (
            <>
            <form onSubmit={handleSearch}>
 <div className='input-container'>
    <button>
        <img src='/assets/icon-search.svg' alt='icon'></img>

    </button>
        <input onChange={(e) => setSearchBookmarks(e.target.value)} value={searchBookmarks} name='bookmarked_shows_search' type='text' placeholder='Search for bookmarked shows' autoComplete='off' maxLength={64}/>
    </div>
            </form>
               
                <h1 style={{marginBottom: "2rem"}}>Bookmarked movies</h1>
                <section>
        <div className='container-of-movies'>
                    <div className='grid-cards'>
                            {bookmarkedMovies.filter((listing) => listing.isBookmarked && listing.category === "Movie").map((listing, i) => (
        <div key={i} className='card'>
            <div className='image-container'>
            <img
                className='thumbnail'
                src={listing.thumbnail.regular.small}
                alt={listing.title}
            />
            <div         className='bookmark-icon'
        >
        <img
                width={15} 
                height={15}
                cn
        src={listing.isBookmarked ? '/assets/icon-bookmark-full.svg' : '/assets/icon-bookmark-empty.svg'}
                alt='Bookmark icon'
            />
                </div>
            </div>
            <div
            style={{
                display: 'flex',
                gap: '8px',
                height: '10px',
                alignItems: 'center',
                marginTop: '5px',

            }}
            >
            <p>{listing.year}</p>
            <div className='divider'></div>
            <img width={15} height={15} src='/assets/icon-nav-movies.svg' alt='' />
            <p>{listing.category}</p>
            <div className='divider'></div>
            <p>{listing.rating}</p>
            </div>

            <h2 style={{ marginTop: '10px' }}>{listing.title}</h2>
        </div>
        ))}

                        

                    </div>
                </div>
                </section>
                
                <h1>Bookmarked TV series</h1>
                <section>
        <div className='container-of-movies'>
                    <div className='grid-cards'>
                            {bookmarkedMovies.filter((listing) => listing.isBookmarked && listing.category === "TV Series").map((listing, i) => (
        <div key={i} className='card'>
            <div className='image-container'>
            <img
                className='thumbnail'
                src={listing.thumbnail.regular.small}
                alt={listing.title}
            />
            <div         className='bookmark-icon'
        >
        <img
                width={15} 
                height={15}
                cn
        src={listing.isBookmarked ? '/assets/icon-bookmark-full.svg' : '/assets/icon-bookmark-empty.svg'}
                alt='Bookmark icon'
            />
                </div>
            
            </div>
            <div
            style={{
                display: 'flex',
                gap: '8px',
                height: '10px',
                alignItems: 'center',
                marginTop: '5px',

            }}
            >
            <p>{listing.year}</p>
            <div className='divider'></div>
            <img width={15} height={15} src='/assets/icon-nav-movies.svg' alt='' />
            <p>{listing.category}</p>
            <div className='divider'></div>
            <p>{listing.rating}</p>
            </div>

            <h2 style={{ marginTop: '10px' }}>{listing.title}</h2>
        </div>
        ))}

                        

                    </div>
                </div>
                </section>
                
            </>
  )
}

export default Bookmarks


