import { useState, useEffect } from "react";
import numberFormatter from "number-formatter";
import timeSpanFormat from "time-span-format";
import { Routes, Route, useParams, Link } from "react-router-dom";
import { useMoviesContext } from "../contexts/MoviesContext";
import axios from "axios";
import Navbar from "../components/Navbar";
import image from "../assets/person.png";
import image2 from "../assets/noposter.svg";
import starFull from "../assets/star1.png";
import starHalf from "../assets/star2.png";
import starEmpty from "../assets/star3.png";

const url = "https://api.themoviedb.org/";
const api_key = "25ab3dddf0d6a4fa832949a56d7e7191";

function Details() {
    const providerValue = useMoviesContext();
    const { details, setDetails, searchResults, setSearchResults, searchInput, setSearchInput, nextPage, setNextPage, objBg, setObjBg, cast, setCast, crew, setCrew } = useMoviesContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState("");

    const [genres, setGenres] = useState([]);
    const [director, setDirector] = useState("");
    const [writer, setWriter] = useState("");
    const [backdrop, setBackdrop] = useState("");
    const [poster, setPoster] = useState("");
    const [similarMovies, setSimilarMovies] = useState([]);

    const [votes, setVotes] = useState([]);
    const [roundVotes, setRoundVotes] = useState(0);
    const [star1, setStar1] = useState("");
    const [star2, setStar2] = useState("");
    const [star3, setStar3] = useState("");
    const [star4, setStar4] = useState("");
    const [star5, setStar5] = useState("");

    const [voteStatus, setVoteStatus] = useState("");

    let { movieId } = useParams();
    let newMovieId = movieId.split(":");
    newMovieId = newMovieId[1];
    const findMovie = `${url}3/movie/${newMovieId}?api_key=${api_key}`;
    const findCast = `${url}3/movie/${newMovieId}/credits?api_key=${api_key}`;
    const movieImages = `${url}3/movie/${newMovieId}/images?api_key=${api_key}`;
    const similar = `${url}3/movie/${newMovieId}/similar?api_key=${api_key}`;
    let summonVotes = `${url}3/movie/${newMovieId}/images?api_key=${api_key}`;

    async function getMovie() {
        try {
            const response = await axios.get(findMovie);
            const data = response.data;
            setDetails(data);
            // console.log(data);
            setGenres([...data.genres]);
            setPoster(`https://image.tmdb.org/t/p/w500/${data.poster_path}`);
        } catch (error) {
            console.error(error);
        }
    }
    async function getSimilar() {
        try {
            const response = await axios.get(similar);
            const data = response.data;
            setSimilarMovies(data.results);
            // console.log(data);
        } catch (error) {
            console.error(error);
        }
    }
    async function getImages() {
        try {
            const response = await axios.get(movieImages);
            const data = response.data;
            // console.log(data)
            const backdropImages = await data.posters.filter((poster) => poster.iso_639_1 === "en");
            setBackdrop(`https://image.tmdb.org/t/p/w500/${backdropImages[0].file_path}`);
        } catch (error) {
            console.log(error);
        }
    }

    async function getCast() {
        try {
            const response = await axios.get(findCast);
            const data = response.data;
            setCast(data.cast);
            const dir = data.crew.filter((person) => person.known_for_department === "Directing");
            const writ = data.crew.filter((person) => person.known_for_department === "Writing");
            setDirector(dir[0].name);
            setWriter(writ[0].name);
            // console.log(data.crew)
        } catch (error) {}
    }

    async function getVotes() {
        try {
            const response = await axios.get("http://localhost:4000/votes/");
            const data = response.data;
            const filteredData = data.votes.filter((vote) => vote.id === details.id);
            setVotes([...filteredData]);

            let totalVotes = 0;
            const a = 0;
            const b = filteredData.length;
            const sum = filteredData.reduce((accumulator, object) => {
                return accumulator + object.vote;
            }, 0);

            const roundVotes = sum / b;
            setRoundVotes(roundVotes);
        } catch (error) {
            console.error(error);
        }
    }

    async function postVotes(id, vote) {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        if (!email || !token) {
            setVoteStatus("You have to login to vote");
            setTimeout(() => {
                setVoteStatus("");
            }, 2000);
            return;
        }

        try {
            const response = await axios.post("http://localhost:4000/votes/", {
                id: id,
                vote: vote,
            });
            const data = response.data;
            const filteredData = data.filter((vote) => vote.id === details.id);
            setVotes([...filteredData]);
            getVotes();
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        document.body.scrollIntoView({ behavior: "smooth" });
        getMovie();
        getSimilar();

        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        // console.log(token);
        if (email) setIsLoggedIn(`Logged in as ${email}`);
        else setIsLoggedIn("");
    }, []);

    useEffect(() => {
        getVotes();
        getCast();
        getImages();
    }, [details]);

    // useEffect(() => {
    //     console.log(similarMovies);
    // }, [similarMovies]);

    useEffect(() => {

        if (roundVotes > 4.5) {
            setStar1(starFull);
            setStar2(starFull);
            setStar3(starFull);
            setStar4(starFull);
            setStar5(starFull);
        } else if (roundVotes > 4) {
            setStar1(starFull);
            setStar2(starFull);
            setStar3(starFull);
            setStar4(starFull);
            setStar5(starHalf);
        } else if (roundVotes > 3.5) {
            setStar1(starFull);
            setStar2(starFull);
            setStar3(starFull);
            setStar4(starFull);
            setStar5(starEmpty);
        } else if (roundVotes > 3) {
            setStar1(starFull);
            setStar2(starFull);
            setStar3(starFull);
            setStar4(starHalf);
            setStar5(starEmpty);
        } else if (roundVotes > 2.5) {
            setStar1(starFull);
            setStar2(starFull);
            setStar3(starFull);
            setStar4(starEmpty);
            setStar5(starEmpty);
        } else if (roundVotes > 2) {
            setStar1(starFull);
            setStar2(starFull);
            setStar3(starHalf);
            setStar4(starEmpty);
            setStar5(starEmpty);
        } else if (roundVotes > 1.5) {
            setStar1(starFull);
            setStar2(starFull);
            setStar3(starEmpty);
            setStar4(starEmpty);
            setStar5(starEmpty);
        } else if (roundVotes > 1) {
            setStar1(starFull);
            setStar2(starHalf);
            setStar3(starEmpty);
            setStar4(starEmpty);
            setStar5(starEmpty);
        } else if (roundVotes > 0.5) {
            setStar1(starFull);
            setStar2(starEmpty);
            setStar3(starEmpty);
            setStar4(starEmpty);
            setStar5(starEmpty);
        } else if (roundVotes > 0) {
            setStar1(starHalf);
            setStar2(starEmpty);
            setStar3(starEmpty);
            setStar4(starEmpty);
            setStar5(starEmpty);
        } else {
            setStar1(starEmpty);
            setStar2(starEmpty);
            setStar3(starEmpty);
            setStar4(starEmpty);
            setStar5(starEmpty);
        }
    }, [roundVotes]);

    return (
        <div className="details">
            <Navbar />
            <span className="login-input">{isLoggedIn}</span>
            <a
                href="#"
                onClick={() => {
                    window.history.back();
                }}
            >
                {"<<"}
            </a>
            <h1>{details.title}</h1>
            <div className="poster-container">
                <img
                    src={poster}
                    className="detail-poster"
                    onError={(e) => {
                        e.target.src = image2;
                    }}
                />
            </div>
            <h2>{details.tagline}</h2>
            <div className="vote">
                <img
                    onClick={() => {
                        postVotes(details.id, 1);
                    }}
                    className="star"
                    src={star1}
                    width="20"
                />
                <img
                    onClick={() => {
                        postVotes(details.id, 2);
                    }}
                    className="star"
                    src={star2}
                    width="20"
                />
                <img
                    onClick={() => {
                        postVotes(details.id, 3);
                    }}
                    className="star"
                    src={star3}
                    width="20"
                />
                <img
                    onClick={() => {
                        postVotes(details.id, 4);
                    }}
                    className="star"
                    src={star4}
                    width="20"
                />
                <img
                    onClick={() => {
                        postVotes(details.id, 5);
                    }}
                    className="star"
                    src={star5}
                    width="20"
                />
                <span className="vote-status">{voteStatus}</span>
            </div>
            <div>
                <b>{details.release_date}</b>
            </div>
            <div>
                <b>Runtime</b> {timeSpanFormat(details.runtime)}
            </div>
            <div>
                <b>Score</b> {details.vote_average}
            </div>
            <div>
                <b>Director</b> {director}
            </div>
            <div>
                <b>Writer</b> {writer}...
            </div>
            <div>
                <b>Language</b> {details.original_language}
            </div>
            <div>
                <b>Budget</b> {numberFormatter("$#,##0.####", details.budget)}
            </div>
            <div className="overview">{details.overview}</div>
            <b>
                {genres.map((genre) => {
                    return <span key={genre.id}> {genre.name} </span>;
                })}
            </b>
            <h1>Cast</h1>
            <div className="person">
                {cast.map((person, i) => {
                    return (
                        <div className="person" key={person.id}>
                            <Link to={`/person/:${person.id}`}>
                                <img
                                    className="person-img"
                                    src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
                                    onError={(e) => {
                                        e.target.src = image;
                                    }}
                                />
                            </Link>
                            <div className="title-box">
                                <b>{person.name}</b>
                            </div>
                        </div>
                    );
                })}
            </div>
            <h2>You might also like</h2>
            <div className="person">
                {similarMovies.map((similarMovie) => {
                    return (
                        <div className="person" key={`sim_${similarMovie.id}`}>
                            <a href={`/details/:${similarMovie.id}`}>
                                <img
                                    className="similar-img"
                                    src={`https://image.tmdb.org/t/p/w500/${similarMovie.poster_path}`}
                                    onError={(e) => {
                                        e.target.src = image2;
                                    }}
                                />
                            </a>
                            <div className="title-box">
                                <b>{similarMovie.title}</b>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div id="cover" style={{ backgroundImage: `url(${backdrop})` }}></div>
            <div id="cover2"></div>
        </div>
    );
}

export default Details;
