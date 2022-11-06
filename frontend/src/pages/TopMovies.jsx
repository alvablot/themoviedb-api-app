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
let trending = "https://api.themoviedb.org/3/movie/popular?api_key=" + api_key;
const page = "&page=";
const end = "&language=en-US&sort_by=popularity.desc";

function TopMovies() {
    const providerValue = useMoviesContext();
    const { details, setDetails, searchResults, setSearchResults, searchInput, setSearchInput, nextPage, setNextPage, currentPage, setCurrentPage, totalPages, setTotalPages, objBg, setObjBg, token, setToken } = useMoviesContext();
    const [email, setEmail] = useState("Email");
    const [password, setPassword] = useState("Password");
    const [isLoggedIn, setIsLoggedIn] = useState("");
    const [hideShowLogin, setHideShowLogin] = useState("visible");
    const [hideShowLogout, setHideShowLogout] = useState("hidden");
    const [hideShowNewUser, setHideShowNewUser] = useState("hidden");

    async function getMovies(a, b) {
        try {
            const response = await axios.get(a + b + page + nextPage + end);
            let data = response.data;

            setSearchResults(data.results);
            setTotalPages(data.total_pages);
            setCurrentPage(data.page);
            // console.log(data);
        } catch (error) {}
    }

    async function logIn() {
        if (email === "Email" || password === "Password") return;
        try {
            if (email || password) {
                const response = await axios.post("http://localhost:4000/auth/login", {
                    email: email,
                    password: password,
                });
                const data = response.data;
                setToken(data);
                localStorage.setItem("token", data);
                localStorage.setItem("email", email);
                // console.log(data);
                setIsLoggedIn(`Logged in as ${email}`);
                setHideShowLogin("hidden");
                setHideShowLogout("visible");
                setHideShowNewUser("hidden");
                setEmail("");
                setPassword("");
            }
        } catch (error) {
            setIsLoggedIn(error.response.data);
            setTimeout(() => {
                setIsLoggedIn("");
            }, 2000);
        }
    }
    function logOut() {
        localStorage.clear();
        setIsLoggedIn("");
        setHideShowLogin("visible");
        setHideShowLogout("hidden");
    }
    async function postNewUser() {
        if (email === "Email" || password === "Password") return;
        try {
            if (email || password) {
                const response = await axios.post("http://localhost:4000/auth/register", {
                    email: email,
                    password: password,
                });
                const data = response.data;
                // console.log(data);
                setHideShowLogin("visible");
                setHideShowNewUser("hidden");
                setEmail("");
                setPassword("");
                setIsLoggedIn("New user created");
                setTimeout(() => {
                    setIsLoggedIn("");
                }, 2000);
            }
        } catch (error) {
            setIsLoggedIn(error.response.data);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        // console.log(token);
        if (email) {
            setIsLoggedIn(`Logged in as ${email}`);
            setHideShowLogin("hidden");
            setHideShowLogout("visible");
        } else setIsLoggedIn("");
    }, []);

    useEffect(() => {
        getMovies(search, searchInput);
    }, [searchInput]);

    useEffect(() => {
        logIn();
        getMovies(trending, "");
    }, [nextPage]);

    return (
        <div>
            <span className="login-input">
                <div className={hideShowLogin}>
                    Log In{" "}
                    <span
                        className="new-user"
                        onClick={() => {
                            setHideShowLogin("hidden");
                            setHideShowNewUser("visible");
                            setEmail("");
                            setPassword("");
                        }}
                    >
                        New user?
                    </span>
                    <br />
                    <input
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        onFocus={(e) => {
                            setEmail("");
                        }}
                        value={email}
                    />
                    <br />
                    <input
                        type="text"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        onFocus={(e) => {
                            e.target.type = "password";
                            setPassword("");
                        }}
                        value={password}
                    />
                    <br />
                    <button
                        onClick={() => {
                            logIn();
                        }}
                    >
                        Submit
                    </button>
                </div>
                <div className={hideShowNewUser}>
                    New user{" "}
                    <span
                        className="new-user"
                        onClick={() => {
                            setHideShowLogin("visible");
                            setHideShowNewUser("hidden");
                            setEmail("");
                            setPassword("");
                        }}
                    >
                        Abort
                    </span>
                    <br />
                    <input
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        onFocus={(e) => {
                            setEmail("");
                        }}
                        value={email}
                    />
                    <br />
                    <input
                        type="text"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        onFocus={(e) => {
                            e.target.type = "password";
                            setPassword("");
                        }}
                        value={password}
                    />
                    <br />
                    <button
                        onClick={() => {
                            postNewUser();
                        }}
                    >
                        Create
                    </button>
                </div>
                {isLoggedIn} <br />
                <button
                    className={hideShowLogout}
                    onClick={() => {
                        logOut();
                    }}
                >
                    Log out
                </button>
            </span>
            {/* <Navbar /> */}
            <div className="card">
                <h1>Petter's TMDB</h1>
                <button
                    onClick={() => {
                        trending = "https://api.themoviedb.org/3/movie/popular?api_key=" + api_key;
                        getMovies(trending, "");
                    }}
                >
                    Trending
                </button>
                <button
                    onClick={() => {
                        trending = "https://api.themoviedb.org/3/movie/top_rated?api_key=" + api_key;
                        getMovies(trending, "");
                    }}
                >
                    Top Rated
                </button>
                <button
                    onClick={() => {
                        trending = "https://api.themoviedb.org/3/movie/upcoming?api_key=" + api_key;
                        getMovies(trending, "");
                    }}
                >
                    Upcoming
                </button>
                <button
                    onClick={() => {
                        trending = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + api_key;
                        getMovies(trending, "");
                    }}
                >
                    Now playing
                </button>
                <br />
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
