import React, { useEffect, useState } from 'react'
import SearchInputForBookmarkedPage from '../components/SearchInputForBookmarkedPage';
import "./Bookmarks.css"

const Bookmarks = () => {
    const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
    



    useEffect(() => {
        const fetchMovies = async () => {
            const res = await fetch("/data.json")
            const json = await res.json()
            setBookmarkedMovies(json)
        }
        fetchMovies()
    }, [])
    // 

  return (
            <>
                <SearchInputForBookmarkedPage/>
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


