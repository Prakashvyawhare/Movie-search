
import {SearchContext} from "./Hooks/useContext"
import Header from "./layout/Header";
import MovieCard from "./MovieCard";
import UseFetch from "./Hooks/useFetch";
import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import MovieDetails from "./Pages/MovieDetail";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { AuthProvider } from "./Hooks/AuthContext";
import{WatchListProvider} from "./Hooks/HookProvider/watchListProvider"
import ProtectedRoute from "./auth/ProtectedRoutes";
import WatchList from "./Pages/watchList";
function AppContent() {
  // const [searchText, setSearchText] = useState('');
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  
  return (
    <>
      {/* <SearchContext.Provider value={{ searchText, setSearchText }}> */}
        <div className="min-h-screen bg-gray-950 text-white ">
          {!isAuthPage && <Header />}
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route element={<ProtectedRoute/> }>

          <Route path="/home" element={<Home/>} ></Route>
          <Route path="/movie/:id" element={<MovieDetails/>} />
          <Route path="/watchlist" element={<WatchList/>} />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        </div>
      {/* </SearchContext.Provider> */}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <WatchListProvider>
        <AppContent />
      </WatchListProvider>
    </AuthProvider>
    </BrowserRouter>
  );
}
export default App;