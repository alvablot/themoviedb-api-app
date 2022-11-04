import { useState, useEffect } from "react";
import numberFormatter from "number-formatter";
import timeSpanFormat from "time-span-format";
import { Routes, Route, useParams, Link } from "react-router-dom";
import { useMoviesContext } from "../contexts/MoviesContext";
import axios from "axios";
import Navbar from "../components/Navbar";
import image from "../assets/person.png";
import image2 from "../assets/noposter.svg";
import star1 from "../assets/star1.png";
import star2 from "../assets/star2.png";
import star3 from "../assets/star3.png";
const posterImg = new Image();
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
    const [backdrop, setBackdrop] = useState("");
    let { movieId } = useParams();
    let newMovieId = movieId.split(":");
    newMovieId = newMovieId[1];
    const findMovie = `${url}3/movie/${newMovieId}?api_key=${api_key}`;
    const findCast = `${url}3/movie/${newMovieId}/credits?api_key=${api_key}`;
    const movieImages = `${url}3/movie/${newMovieId}/images?api_key=${api_key}`;

    async function getMovie() {
        try {
            const response = await axios.get(findMovie);
            const data = response.data;
            setDetails(data);
            // console.log(data);
            setGenres([...data.genres]);
        } catch (error) {
            console.error(error);
        }
    }
    async function getImages() {
        try {
            const response = await axios.get(movieImages);
            const data = response.data;
            // console.log(data)
            const backdropImages = data.posters.filter(
                (poster) => poster.iso_639_1 === "en" && poster.height > 2000
            );

            setBackdrop(`https://image.tmdb.org/t/p/w500/${backdropImages[0].file_path}`);
        } catch (error) {
            console.log(error);
        }
    }

    async function getMyDb() {
        try {
            const response = await axios.get(
                "http://127.0.0.1:5001/fir-test-291d7/us-central1/app"
            );
            const data = response.data;
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    async function postMyDb() {
        try {
            const response = await axios.post(
                "http://127.0.0.1:5001/fir-test-291d7/us-central1/app",
                {
                    name: "Petter",
                }
            );
            const data = response.data;
            console.log(data);
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
        getImages();
        // getMyDb();
        // postMyDb()
    }, []);

    posterImg.src = `https://image.tmdb.org/t/p/w500/${details.poster_path}`;

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
            <div className="vote">
                <img className="star" src={star1} width="20" />
                <img className="star" src={star1} width="20" />
                <img className="star" src={star1} width="20" />
                <img className="star" src={star2} width="20" />
                <img className="star" src={star3} width="20" />
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
            <div id="cover" style={{ backgroundImage: `url(${backdrop})` }}></div>
            <div id="cover2"></div>
        </div>
    );
}

export default Details;
