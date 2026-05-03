import { useEffect, useState } from "react";

function UseFetch(url) {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
// const url = 'https://www.omdbapi.com'

    useEffect(() => {
        if(!url) {
            setError(false);
            return
        }
        setIsLoading(true);
        setError(null)
        fetch(url)
        .then((res) =>{ 
            if(!res) throw new Error('Fetch api error')
            return res.json();
    })
    .then((data)=> {
        if( data && data?.Response ==='False') {
            setError(data.Error);
            setIsLoading(false)
        }else{

            setData(data)
        }
    })
    .catch((error)=>{
        setError(error.message);
        setIsLoading(false)
    })
    .finally(()=>setIsLoading(false))

    }, [url])
    return {data, isLoading, error}
    
}
export default UseFetch