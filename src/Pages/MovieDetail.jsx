import { useParams, useNavigate } from "react-router-dom";
import UseFetch from "../Hooks/useFetch";
import { useWatchlist } from "../Hooks/WatchListContext";

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY || '3dfb4e7e';
const OMDB_API_URL = import.meta.env.VITE_OMDB_API_URL || 'http://www.omdbapi.com/';
function RatingBadge({ source, value }) {
  return (
    <div className="bg-gray-800 rounded-lg px-3 py-2 text-center min-w-[80px]">
      <p className="text-yellow-400 font-bold text-lg">{value}</p>
      <p className="text-gray-400 text-xs mt-0.5">{source}</p>
    </div>
  )
}
function DetailRow({ label, value }) {
  if (!value || value === 'N/A') return null
  return (
    <div className="flex gap-4 py-3 border-b border-gray-800 last:border-0">
      <span className="text-gray-400 w-28 flex-shrink-0 text-sm">{label}</span>
      <span className="text-white text-sm">{value}</span>
    </div>
  )
}

function MovieDetails () {
    const {id} = useParams();
    const navigate = useNavigate();
    const url=id?`${OMDB_API_URL}?i=${id}&apikey=${OMDB_API_KEY}`:null;

    const { data, error, isLoading } = UseFetch(url);
    const movie = data;
    const { isInWatchlist, addToWatchlist, removeFromWatchList}  = useWatchlist()

    
    if(isLoading ) {
        return (
           <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-gray-700 border-t-yellow-400 rounded-full animate-spin" />
      </div>
        )
    }

    if(error || !movie) {
        return (
            <div className="text-center py-24">
        <p className="text-5xl mb-4">😕</p>
        <p className="text-white text-xl font-semibold mb-2">Movie not found</p>
        <button onClick={() => navigate(-1)} className="text-yellow-400 hover:underline mt-2">
          ← Go back
        </button>
      </div>
        )
    }
    if (movie) {
        return (

            <main className="max-w-6xl mx-auto px-4 py-10">
                <button onClick={()=> navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group">
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
        Back to search
                </button>
            <div className="flex flex-col md:flex-row gap-10">
                <div className="flex-shrink-0">
                    <div className="w-full md:w-64 rounded-2xl overflow-hidden border broder-gray-800 shadow-2xl">


                {movie.Poster && movie.Poster !=='N/A'?(
                    <img  src={movie.Poster} alt={movie.Title} className="w-full" />
                    
                ): (
                    <div className="w-full h-96 bg-gray-800 flex item center justify-center text-6xl"> 🎬</div>
                )}
                </div>
                <button  onClick={() => isInWatchlist(movie)?removeFromWatchList(movie): addToWatchlist(movie)}
            
            className={`w-full mt-4 py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200
                        ${ isInWatchlist(movie)
                          ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300'
                          : 'bg-gray-800 text-white border border-gray-700 hover:border-yellow-400 hover:text-yellow-400'
                        }`}
          >
            {isInWatchlist(movie) ? '★ In Watchlist' : '☆ Add to Watchlist'}
          </button>
                </div>
                <div className="flex-1 min-w-0">
                        <div className="mb-4">
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-md capitalize">
                {movie.Type}
              </span>
              {movie.Rated && movie.Rated !== 'N/A' && (
                <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-md">
                  {movie.Rated}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              {movie.Title}
            </h1>
            <p className="text-gray-400 mt-1">{movie.Year} · {movie.Runtime} · {movie.Genre}</p>
          </div>
          {movie.imdbRating && movie.imdbRating !== 'N/A' && (
            <div className="flex items-center gap-2 mb-6">
              <span className="text-yellow-400 text-2xl">★</span>
              <span className="text-white text-2xl font-bold">{movie.imdbRating}</span>
              <span className="text-gray-400">/10</span>
              {movie.imdbVotes !== 'N/A' && (
                <span className="text-gray-500 text-sm ml-2">({movie.imdbVotes} votes)</span>
              )}
            </div>
          )}
          {movie.Ratings && movie.Ratings.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-6">
              {movie.Ratings.map(r => (
                <RatingBadge
                  key={r.Source}
                  source={r.Source === 'Internet Movie Database' ? 'IMDb' : r.Source}
                  value={r.Value}
                />
              ))}
            </div>
          )}
          {movie.Plot && movie.Plot !== 'N/A' && (
            <div className="mb-6">
              <h2 className="text-white font-semibold mb-2">Plot</h2>
              <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
            </div>
          )}
            <div className="bg-gray-900 rounded-xl border border-gray-800 px-4 py-2">
            <DetailRow label="Director"   value={movie.Director} />
            <DetailRow label="Writer"     value={movie.Writer} />
            <DetailRow label="Cast"       value={movie.Actors} />
            <DetailRow label="Language"   value={movie.Language} />
            <DetailRow label="Country"    value={movie.Country} />
            <DetailRow label="Awards"     value={movie.Awards} />
            <DetailRow label="Released"   value={movie.Released} />
            <DetailRow label="Box Office" value={movie.BoxOffice} />
          </div>
                </div>
            </div>


        </main>
            )
    }
}

export default MovieDetails