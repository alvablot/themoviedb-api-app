import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
const url = "https://api.themoviedb.org/";
const api_key = "25ab3dddf0d6a4fa832949a56d7e7191";
const search = `${url}3/search/movie?api_key=${api_key}&query=`;
const find = `${url}3/search/movie?api_key=${api_key}&query=`;
const discover = `${url}search/movie?api_key=${api_key}&query=`;
const trending = "https://api.themoviedb.org/3/trending/all/day?api_key=" + api_key;

function App() {
    const [searchInput, setSearchInput] = useState("");
    const [objBg, setObjBg] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    async function getMovies(a, b) {
        try {
            const response = await axios.get(a + b);
            const data = response.data;
            setSearchResults(data.results);
            searchResults.map((result) => {
                console.log(data);
            });
        } catch (error) {}
    }
    useEffect(() => {
        getMovies(search, searchInput);
    }, [searchInput]);
    useEffect(() => {
        //setSearchInput("A");
        getMovies(trending, "");
    }, []);
    return (
        <div className="App">
            <div className="card">
                <h1>Search</h1>
                <input
                    onChange={(e) => {
                        setSearchInput(e.target.value);
                    }}
                />
                <div className="movie-result">
                    {searchResults.map((result) => {
                        return (
                            <div key={result.id} className="movie-result">
                                <div>
                                    <img
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
        </div>
    );
}

export default App;
