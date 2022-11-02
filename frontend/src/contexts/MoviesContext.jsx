import { createContext, useContext, useState } from "react";

const MoviesContext = createContext();

export function MoviesProvider(props) {
    const [nextPage, setNextPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [searchInput, setSearchInput] = useState("");
    const [objBg, setObjBg] = useState("");
    const [details, setDetails] = useState({});
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    const providerValue = {
        nextPage,
        setNextPage,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        searchInput,
        setSearchInput,
        objBg,
        setObjBg,
        details,
        setDetails,
        searchResults,
        setSearchResults,
        cast,
        setCast,
        crew,
        setCrew,
    };
    return <MoviesContext.Provider value={providerValue}>{props.children}</MoviesContext.Provider>;
}

export function useMoviesContext() {
    const providerValue = useContext(MoviesContext);
    return providerValue;
}
