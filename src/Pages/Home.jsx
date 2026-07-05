import { useState } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import UseMovieSearch from "../Hooks/useMovieSearch";
import Search from "../layout/Search";
import MovieCard from "../MovieCard";

const DEFAULT_QUERY = 'avengers';
function Home() {
    const [query, setQuery] = useState(DEFAULT_QUERY)
    const {movies, totalResults, isLoading, isLoadingMore, error, loadMore} = UseMovieSearch(query);
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
            <Search setSearchEvent={setQuery} query={query} />
            </div>
            {totalResults>0 &&(
                <p className="text-gray-400 text-sm mb-6">
                    Found <span className="text-yellow-400 px-2 font-semibold">{totalResults}</span>
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
            {!isLoading && !query && movies.length === 0 && (
                <div className="text-center py-24">
                  <p className="text-5xl mb-4">🔍</p>
                  <p className="text-gray-400 text-lg">Start typing to search for movies</p>
                </div>
            )}
            {!isLoading && !error && movies.length>0 && (
                <VirtuosoGrid
                    useWindowScroll
                    totalCount={movies.length}
                    overscan={400}
                    endReached={loadMore}
                    itemClassName="group relative bg-gray-900 rounded-xl overflow-hidden
                 border border-gray-800 hover:border-yellow-400/50
                 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-400/10"
                    listClassName="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                    itemContent={(index) => (
                        <MovieCard movie={movies[index]} />
                    )}
                />
            )}
            {isLoadingMore && (
                <div className="flex justify-center py-8">
                    <div className="w-8 h-8 border-4 border-gray-700 border-t-yellow-400 rounded-full animate-spin"></div>
                </div>
            )}

        </main>
        
    )
}
export default Home