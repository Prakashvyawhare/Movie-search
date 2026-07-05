import React from "react";
import { useNavigate } from "react-router-dom";
import { useWatchlist } from "../Hooks/WatchListContext";
import { VirtuosoGrid } from "react-virtuoso";
import MovieCard from "../MovieCard";
function WatchList () {
    const { watchlist } = useWatchlist();
    const navigate = useNavigate();
    return (
        <main className="min-h-screen bg-gray-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-4xl text-white mb-3 font-bold">WatchList</h1>
            <p className="text-gray-400 text-lg mb-6">
                Your favorite movies and shows in one place
            </p>
               <VirtuosoGrid
                    useWindowScroll
                    totalCount={watchlist.length}
                    overscan={400}
                    itemClassName="group relative bg-gray-900 rounded-xl overflow-hidden
                 border border-gray-800 hover:border-yellow-400/50
                 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-400/10"
                    listClassName="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                    itemContent={(index) => (
                        <MovieCard movie={watchlist[index]} />
                    )}
                />
        </div>
        </main>
    )
}
export default WatchList