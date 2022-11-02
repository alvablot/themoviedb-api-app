import { useState, useEffect } from "react";
import numberFormatter from "number-formatter";
import timeSpanFormat from "time-span-format";
import { Routes, Route, useParams, Link } from "react-router-dom";
import { useMoviesContext } from "../contexts/MoviesContext";
import axios from "axios";
import Navbar from "../components/Navbar";
import image from "../assets/person.png";
import image2 from "../assets/noposter.svg";
const posterImg = new Image();
const bgImg = new Image();
posterImg.src = image2;
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
        cast,
        setCast,
        crew,
        setCrew,
    } = useMoviesContext();

    const [genres, setGenres] = useState([]);
    const [director, setDirector] = useState("");
    const [writer, setWriter] = useState("");
    let { movieId } = useParams();
    let newMovieId = movieId.split(":");
    newMovieId = newMovieId[1];
    const findMovie = `${url}3/movie/${newMovieId}?api_key=${api_key}`;
    const findCast = `${url}3/movie/${newMovieId}/credits?api_key=${api_key}`;

    async function getMovie() {
        try {
            const response = await axios.get(findMovie);
            const data = response.data;
            setDetails(data);
            console.log(data);
            setGenres([...data.genres]);
        } catch (error) {
            console.error(error);
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

    useEffect(() => {
        document.body.scrollIntoView({ behavior: "smooth" });
        getMovie();
        getCast();
    }, []);

    posterImg.src = `https://image.tmdb.org/t/p/w500/${details.poster_path}`;
    bgImg.src = `https://image.tmdb.org/t/p/w500/${details.backdrop_path}`;

    return (
        <div className="details">
            <Navbar />
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
                    src={posterImg.src}
                    className="detail-poster"
                    onError={(e) => {
                        e.target.src = image2;
                    }}
                />
            </div>
            <h2>{details.tagline}</h2>
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
                {cast.map((person) => {
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
                            {person.name}
                        </div>
                    );
                })}
            </div>
            <div id="cover" style={{ backgroundImage: `url(${bgImg.src})` }}></div>
            <div id="cover2"></div>
        </div>
    );
}

export default Details;
