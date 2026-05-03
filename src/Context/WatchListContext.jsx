import { createContext, useContext, useEffect, useState } from "react"

const WatchListContext = createContext();

export function WatchListProvider ({children}) {
     const [watchList, setWatchList] = useState(()=>{
        const list = localStorage.getItem('watchlist')
        return list? JSON.parse(list):[]
     })

     useEffect(()=> {
      localStorage.setItem('watchlist',JSON.stringify(watchList))
     },[watchList])

     function addToWatclist(movie) {
        setWatchList((prev) => {
           if( prev.find(m => m.imdbID ===movie.imdbID ) ) return prev
            return [...prev, movie]
        })
     }
     function removeFromWatchlist(movie) {
        setWatchList((prev)=>{
            return prev.filter(m=> m.imdbID !== movie.imdbID)
        })
     }
     function isInWatchList(movie) {
     return watchList.some(m => m.imdbID === movie.imdbID)
     }


    return (
        <WatchListContext.Provider value={{watchList, setWatchList, addToWatclist, removeFromWatchlist, isInWatchList}} >
            {children}
        </WatchListContext.Provider>
    )
}

export function UseWatchList(){
    return useContext(WatchListContext)
}
