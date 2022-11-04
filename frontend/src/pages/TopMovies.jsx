import { useState, useEffect } from "react";
import { Outlet, NavLink, Link, useLoaderData, Form, redirect } from "react-router-dom";
import axios from "axios";
import numberFormatter from "number-formatter";
import { useMoviesContext } from "../contexts/MoviesContext";
import Navbar from "../components/Navbar";
import image from "../assets/person.png";
import image2 from "../assets/noposter.svg";
const posterImg = new Image();
posterImg.src = image2;

const url = "https://api.themoviedb.org/";
const api_key = "25ab3dddf0d6a4fa832949a56d7e7191";
const search = `${url}3/search/movie?api_key=${api_key}&query=`;
const discover = `${url}search/movie?api_key=${api_key}&query=`;
const trending = "https://api.themoviedb.org/3/discover/movie?api_key=" + api_key;
const page = "&page=";
const end = "&language=en-US&sort_by=popularity.desc";

function TopMovies() {
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
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        objBg,
        setObjBg,
    } = useMoviesContext();

    async function getMovies(a, b) {
        try {
            const response = await axios.get(a + b + page + nextPage + end);
            const data = response.data;
            setSearchResults(data.results);
            setTotalPages(data.total_pages);
            setCurrentPage(data.page);
        } catch (error) {}
    }

    useEffect(() => {
        getMovies(search, searchInput);
    }, [searchInput]);

    useEffect(() => {
        getMovies(trending, "");
    }, [nextPage]);

    return (
        <div>
            <Navbar />
            <div className="card">
                <h1>Petter's TMDB</h1>
                Search
                <br />
                <input
                    onChange={(e) => {
                        setSearchInput(e.target.value);
                    }}
                />
                <div className="movies-grid">
                    {searchResults.map((result) => {
                        posterImg.src = `https://image.tmdb.org/t/p/w500/${result.poster_path}`;
                        return (
                            <div key={result.id} className="infos-container ">
                                <div className="infos-box">
                                    <Link to={`/details/:${result.id}`}>
                                        <img
                                            src={posterImg.src}
                                            className="movie-poster"
                                            onError={(e) => {
                                                e.target.src = image2;
                                            }}
                                        />
                                    </Link>
                                </div>
                                <div className="infos-box">
                                    <b>{result.title || result.name}</b>
                                </div>
                                {/*<br />
                                {result.release_date || result.first_air_date
}
                                <p>{result.overview}</p> */}
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
                <b className="page-number">{"<< "}</b>
            </div>
            Page <span className="current-page">{currentPage}</span>
            <span
                className="page-number"
                onClick={() => {
                    setNextPage(nextPage + 1);
                }}
            >
                {currentPage + 1}
            </span>
            <span
                className="page-number"
                onClick={() => {
                    setNextPage(nextPage + 2);
                }}
            >
                {currentPage + 2}
            </span>
            <span
                className="page-number"
                onClick={() => {
                    setNextPage(nextPage + 3);
                }}
            >
                {currentPage + 3}
            </span>{" "}
            of {numberFormatter("#,##0.####", totalPages)}
            <div
                className="page-link"
                onClick={() => {
                    setNextPage(nextPage + 1);
                }}
            >
                <b className="page-number">{" >>"}</b>
            </div>
            <div id="cover"></div>
            <div id="cover2"></div>
        </div>
    );
}

export default TopMovies;
