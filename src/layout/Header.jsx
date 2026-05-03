import { useAuth } from "../Hooks/AuthContext"
import Search from "./Search"
import { Link } from "react-router-dom"


function Header() {
    const {logout, isAuthenticated } = useAuth();
    return (
     <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
            <Link to='/' className="flex items-center gap-2">
             <span className="text-2xl">🎬</span>
             <span className="text-xl font-bold text-white">Movie</span>
             <span className="text-yellow-400">Search</span>
            </Link>
            <div className="flex  item-center gap-8">
                <Link to="/home" > 
                Home</Link>
                <Link to="/watchlist" className="">
                <span className="flex items-center gap-2">
                    WatchList
                </span>
                </Link>
               {isAuthenticated? (
                <div className="flex gap-4 items-center">
                    <button onClick={()=>logout()} className="px-4 py-2 text-yellow-400 hover:text-yellow-300 transition">
                        logout
                    </button>
                    <Link to="/signup" className="px-4 py-2 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-500 transition font-semibold">
                        Sign Up
                    </Link>
                </div>

                ) : (
                      <Link to="/login" className="px-4 py-2 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-500 transition font-semibold">
                       Login
                    </Link>
                )}
            </div>
            
        </div>

     </nav>
    )
}

export default Header