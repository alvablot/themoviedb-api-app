import { useState, useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { useMoviesContext } from "../contexts/MoviesContext";
import axios from "axios";
import Navbar from "../components/Navbar";
const url = "https://api.themoviedb.org/";
const api_key = "25ab3dddf0d6a4fa832949a56d7e7191";
import image from "../assets/person.png";
import image2 from "../assets/noposter.svg";

function Person() {
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

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState("");

    let { personId } = useParams();
    let newPersonId = personId.split(":");

    newPersonId = newPersonId[1];
    const findPerson = `${url}3/person/${newPersonId}?api_key=${api_key}&language=en-US`;

    async function getPerson() {
        try {
            const response = await axios.get(findPerson);
            const data = response.data;
            setDetails(data);
            // console.log(data);
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        document.body.scrollIntoView({ behavior: "smooth" });
        getPerson();

        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        // console.log(token);
        if (email) setIsLoggedIn(`Logged in as ${email}`);
        else setIsLoggedIn("");
    }, []);

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
            <span className="login-input">{isLoggedIn}</span>
            <h1>{details.name}</h1>
            <div className="person-img-container">
                <img
                    className="person-details-img"
                    src={`https://image.tmdb.org/t/p/w500/${details.profile_path}`}
                    onError={(e) => {
                        e.target.src = image;
                    }}
                />
            </div>
            <div>
                <b>{details.birthday}</b>
            </div>
            <div>
                <b>{details.place_of_birth}</b>
            </div>
            <div>
                <b>
                    <a href={details.homepage} target="_blank">
                        {details.homepage}
                    </a>
                </b>
            </div>
            <div>{details.biography}</div>
            <div id="cover"></div>
            <div id="cover2"></div>
        </div>
    );
}

export default Person;
