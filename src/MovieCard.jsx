import { Link } from "react-router-dom"

function MovieCard({movie}) {
    return (
      <Link
        to={"/movie/" + movie.imdbID}
        className="group relative bg-gray-900 rounded-xl overflow-hidden
                 border border-gray-800 hover:border-yellow-400/50
                 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-400/10"
      >
        <div className="aspect-[2/3] overflow-hidden bg-gray-800">
          {movie?.Poster && movie.Poster !== "N/A" ? (
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-600">
              <span className="text-5xl mb-2">🎬</span>
              <span className="text-sm">No Poster</span>
            </div>
          )}
        </div>
        <span className="absolute top-2 left-2 bg-gray-900/80 text-gray-300 text-xs px-2 py-1 rounded-md capitalize">
          {movie.Type}
        </span>
        <div className="p-3">
          <h3 className="font-semibold text-white text-sm leading-snug line-clamp-2 mb-1">
            {movie.Title}
          </h3>
          <p className="text-gray-500 text-xs">{movie.Year}</p>
        </div>
      </Link>
    );
    
}
export default MovieCard