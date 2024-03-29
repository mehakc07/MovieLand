import { useState, useEffect } from 'react';
import React from 'react';

import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";

//44a73a27

const API_URL = 'http://www.omdbapi.com?apikey=44a73a27';

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    
    useEffect(() =>{
      searchMovies("Batman");
    },[]);

    const searchMovies = async (title) =>{
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    const handleKeyDown = (event) =>{
        if(event.key==='Enter'){
            searchMovies(searchTerm);
        }
    }

    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className='search'>
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder='Search for movies'
                />
                <img
                  src={SearchIcon}
                  alt="search"
                  onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length>0?(
                <div className='container'>
                    {movies.map((movie)=>(
                        <MovieCard movie={movie} />
                    ))}
                </div>
            ):(
                <div className='empty'>
                    <h2>No movies found</h2>
                </div>
            )}
        </div>
    );
};

export default App;