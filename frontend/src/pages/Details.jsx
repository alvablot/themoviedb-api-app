import { useState, useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { useMoviesContext } from "../contexts/MoviesContext";
import axios from "axios";
import Navbar from "../components/Navbar";
const url = "https://api.themoviedb.org/";
const api_key = "25ab3dddf0d6a4fa832949a56d7e7191";

function Details() {
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
    let { movieId } = useParams();
    let newMovieId = movieId.split("");
    newMovieId = newMovieId.slice(1);
    newMovieId = newMovieId.join("");

    const find = `${url}3/movie/${newMovieId}?api_key=${api_key}`;
    async function getMovie() {
        try {
            const response = await axios.get(find);
            const data = response.data;
            setDetails(data);
        } catch (error) {}
    }
    useEffect(() => {
        getMovie();
    }, []);
    return (
        <div className="details">
            <Navbar />

            <h1>{details.title}</h1>
            <img
                src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
                className="movie-poster"
            />
            <div>Runtime {Math.round(details.runtime * 100 / 60) / 100}</div>
            <div>{details.overview}</div>
            <b>Genres</b>
            {/* {details.genres.map((genre)=>{
                return <div>{genre.name}</div>
            })} */}
        </div>
    );
}

export default Details;
