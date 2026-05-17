import { useState } from "react";
import UseFetch from "../Hooks/useFetch";
import Search from "../layout/Search";
import MovieCard from "../MovieCard";


const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY || '3dfb4e7e';
const OMDB_API_URL = import.meta.env.VITE_OMDB_API_URL || 'https://www.omdbapi.com/';
const DEFAULT_QUERY = 'avengers';
function Home() {
    const [query, setQuery] = useState(DEFAULT_QUERY)
    const url=query?`${OMDB_API_URL}?s=${encodeURIComponent(query)}&apikey=${OMDB_API_KEY}`:null;
    const {data, isLoading, error} = UseFetch(url);
    const movies = data?.Search ||[]
    return(
        <main className="max-w-6xl mx-auto px-4 py-10" >
            <div className="text-center mb-10">
                <h1 className="text-4xl text-white mb-3 font-bold">
                    Find Your Next <span className="text-yellow-400">Favourite Movies</span>
                </h1>
                <p className="text-gray-400 text-lg">
                     Search from millions of movies, series, and episodes
                </p>
            </div>
            <div className="mb-10">
            <Search setSearchEvent={setQuery} />
            </div>
            {data?.totalResults &&(
                <p className="text-gray-400 text-sm mb-6">
                    Found <span className="text-yellow-400 px-2 font-semibold">{data.totalResults}</span>
                    results for " <span className="text-white">{query}</span>"
                </p>
            )}
            { isLoading && (<div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="w-12 h-12 border-4 border-gray-700 border-t-yellow-400 rounded-full animate-spin">
                </div>
                    <p className="text-gray-400"> Searching Movies...</p>
            </div>)
            }
            {!isLoading && error && (
                <div className="text-center py-24">
                    <p className="text-5xl mb-4">🎬</p>
                    <p className="text-gray-400 text-xl font-semibold   mb-2 ">No Movie found</p>
                    <p className="text-gray-500">Try a different search term</p>
                </div>
            )}
            {!isLoading && !query && (
                <div className="text-center py-24">
                  <p className="text-5xl mb-4">🔍</p>
                  <p className="text-gray-400 text-lg">Start typing to search for movies</p>
                </div>
            )}
            {!isLoading && data.totalResults && movies.length>0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" >
                {movies.map((movie)=> (
                        <MovieCard key={movie?.imdbID} movie={movie} />
                ))}
                    </div>
            )}

        </main>
        
    )
}
export default Home