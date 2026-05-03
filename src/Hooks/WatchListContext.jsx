import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axiosInstance";

const WatcListContext = createContext();
export function WatchListProvider ({children}) {

    const [watchlist, setWatchList] = useState(()=> {
        const saved = localStorage.getItem('watchlist');
        return saved ? JSON.parse(saved): []
    });

    useEffect(()=>{
        localStorage.setItem('watchlist',JSON.stringify(watchlist))
       
    }, [watchlist]);

    function addToWatchlist(movie) {
        setWatchList((prev) => {
            if(prev.find(item => item.imdbID === movie.imdbID)) return prev;
            return [...prev, movie]
        });
         api.post('/post/watchlist', {movie})
         .then((res)=> {
            console.log('Successfully added to watchlist : ',res)
         }).
         catch(err =>{ console.log('watchlist error:', err)
            setWatchList(prev => prev.filter(item => item.imdbID !== movie.imdbID));
         })
    };

    function removeFromWatchList(movie){
        setWatchList(prev=> prev.filter(item => item.imdbID !== movie.imdbID))
    }

    function isInWatchlist(movie) {
        return watchlist.some(m=> m.imdbID === movie.imdbID)
    }

    return (
        <WatcListContext.Provider value={{watchlist, addToWatchlist, removeFromWatchList, isInWatchlist}}>
            {children}
        </WatcListContext.Provider>
    )
}

export function useWatchlist(){
    return useContext(WatcListContext)
}