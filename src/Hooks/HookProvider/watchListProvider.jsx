import { useState } from "react";
import { useEffect } from "react";
import api from "../../api/axiosInstance";
import { WatcListContext} from '../WatchListContext'
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
         api.post('/watchlist/', {movie})
         .then((res)=> {
            console.log('Successfully added to watchlist : ',res)
         }).
         catch(err =>{ console.log('watchlist error:', err)
            setWatchList(prev => prev.filter(item => item.imdbID !== movie.imdbID));
         })
    };

    function removeFromWatchList(movie){
        const previousWatchlist = watchlist;
        setWatchList(prev=> prev.filter(item => item.imdbID !== movie.imdbID));
        api.delete(`/watchlist/${movie.imdbID}`)
        .then((res) => {
            console.log('Sucessfully removed from watchlist', res);
        }).catch (err => { console.error('WatchList error ', err);
            setWatchList(previousWatchlist);
        })
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