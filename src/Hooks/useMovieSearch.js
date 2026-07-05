import { useEffect, useRef, useState } from "react";

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY || '3dfb4e7e';
const OMDB_API_URL = import.meta.env.VITE_OMDB_API_URL || 'https://www.omdbapi.com/';

function searchUrl(query, page) {
    return `${OMDB_API_URL}?s=${encodeURIComponent(query)}&page=${page}&apikey=${OMDB_API_KEY}`;
}

function UseMovieSearch(query) {
    const [movies, setMovies] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const isFetchingRef = useRef(false);

    useEffect(() => {
        if (!query) {
            setMovies([]);
            setTotalResults(0);
            setPage(1);
            setError(null);
            return;
        }
        
        let cancelled = false;
        isFetchingRef.current = true;
        setIsLoading(true);
        setError(null);

        fetch(searchUrl(query, 1))
            .then((res) => res.json())
            .then((data) => {
                if (cancelled) return;
                if (data?.Response === "False") {
                    setError(data.Error);
                    setMovies([]);
                    setTotalResults(0);
                } else {
                    setMovies(data.Search || []);
                    setTotalResults(Number(data.totalResults) || 0);
                }
                setPage(1);
            })
            .catch((err) => {
                if (!cancelled) setError(err.message);
            })
            .finally(() => {
                if (!cancelled) setIsLoading(false);
                isFetchingRef.current = false;
            });

        return () => {
            cancelled = true;
        };
    }, [query]);

    function loadMore() {
        if (!query || isFetchingRef.current || isLoading || movies.length >= totalResults) return;

        const nextPage = page + 1;
        isFetchingRef.current = true;
        setIsLoadingMore(true);

        fetch(searchUrl(query, nextPage))
            .then((res) => res.json())
            .then((data) => {
                if (data?.Response === "False") return;
                setMovies((prev) => [...prev, ...(data.Search || [])]);
                setPage(nextPage);
            })
            .catch((err) => setError(err.message))
            .finally(() => {
                setIsLoadingMore(false);
                isFetchingRef.current = false;
            });
    }

    return {
        movies,
        totalResults,
        isLoading,
        isLoadingMore,
        error,
        loadMore,
        hasMore: movies.length < totalResults,
    };
}

export default UseMovieSearch;
