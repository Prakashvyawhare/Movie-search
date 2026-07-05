import { useEffect, useState } from "react";
import {SearchContext}  from '../Hooks/useContext'

function Search({setSearchEvent, query}) {
    const [searchText, setSearchText] = useState(query || '');
    useEffect(()=> {
        const timer = setTimeout(() => {
            setSearchEvent(searchText)
        }, 500);
        return ()=> clearTimeout(timer)
    }, [searchText])

    function onSearchEvent(event) {
        setSearchText(event.target.value);
        console.log('event:', searchText )
    }

    function clearSearch(){
        setSearchText('')
    }

    return (
        <div className="relative max-w-2xl mx-auto ">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
        🔍
      </span>
    <input className="w-full bg-gray-800 pl-12 pr-12 py-4 text-sm border border-gray-700 rounded-2xl focus:outline-none focus:border-yellow-400  focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200 placeholder-on-surface-variant" placeholder="search  movies, series, episodes..." type="text" value={searchText} onChange={(e)=>onSearchEvent(e)} />
    { searchText && (<button className="absolute right-4 top-1/2 -translate-y-1/2
                     text-gray-400 hover:text-white text-xl transition-colors" onClick={clearSearch} >x</button>)}
          </div>
    )
}
export default Search