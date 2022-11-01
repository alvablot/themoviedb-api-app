import { useState, useEffect } from "react";
import axios from "axios";
import { useMoviesContext } from "./contexts/MoviesContext";
import "./App.css";
const url = "https://api.themoviedb.org/";
const api_key = "25ab3dddf0d6a4fa832949a56d7e7191";
const search = `${url}3/search/movie?api_key=${api_key}&query=`;
const find = `${url}3/search/movie?api_key=${api_key}&query=`;
const discover = `${url}search/movie?api_key=${api_key}&query=`;
const trending = "https://api.themoviedb.org/3/trending/all/day?api_key=" + api_key;
const page = "&page=";

function App() {
    const providerValue = useMoviesContext();
    const {
        details,
        setDetails,
        searchResults,
        setSearchResults,
        searchInput,
        setSearchInput,
        nextPage,
        setNextPage,
        objBg,
        setObjBg,
    } = useMoviesContext();

    async function getMovies(a, b) {
        try {
            const response = await axios.get(a + b + page + nextPage);
            const data = response.data;
            setSearchResults(data.results);
            //console.log(data.results);
        } catch (error) {}
    }

    useEffect(() => {
        getMovies(trending, "");
    }, [nextPage]);
    
    useEffect(() => {
        console.log(details);
    }, [details]);

    return (
        <div className="App">
            <div className="card">
                <h1>Search</h1>
                <input
                    onChange={(e) => {
                        setSearchInput(e.target.value);
                    }}
                />
                <button
                    onClick={() => {
                        getMovies(search, searchInput);
                    }}
                >
                    Search!
                </button>
                <div className="movie-result">
                    {searchResults.map((result) => {
                        return (
                            <div key={result.id} className="movie-result">
                                <div className="poster-container">
                                    <img
                                        onClick={() => {
                                            setDetails(result.id);
                                        }}
                                        src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                                        className="movie-poster"
                                    />
                                </div>
                                <h3>{result.original_title}</h3>
                                <br />
                                {result.release_date}
                                <p>{result.overview}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div
                className="page-link"
                onClick={() => {
                    setNextPage(nextPage - 1);
                }}
            >
                {"<< "}
            </div>
            <div
                className="page-link"
                onClick={() => {
                    setNextPage(nextPage + 1);
                }}
            >
                Page {">>"} {nextPage}
            </div>
        </div>
    );
}

export default App;
