import axios from "axios";
// const url = "http://localhost:3000/"
const url= 'https://movie-search-api-pjpd.onrender.com/'
const api = axios.create({
    baseURL:url,
    withCredentials:true
});
const refreshApi = axios.create({
    baseURL: url,
    withCredentials: true
});

let _accessToken = null;
let _setAccessToken = null;


// shared ref so interceptor attach acesstoken 
export function injecttokenSetter(setter) {
    _setAccessToken = setter;
}
 export function setMemorytoken(token){
    _accessToken = token 
 }

 // attached acces token from memory 
api.interceptors.request.use((config) => {
    config.headers = config.headers || {};
    if(_accessToken) {
        config.headers.Authorization = `Bearer ${_accessToken}`
    }
    return config;
})


//response - silent request on 401 
let isrefreshing = false;
let failedQue = []

function processQue(error, token ) {
    failedQue.forEach(p => error? p.reject(error): p.resolve(token))
    failedQue = []
}


api.interceptors.response.use(
    res => res,
    async error => {
        const original = error.config ||{}
        if (error.response?.status !== 401 || original._retry || original.url?.includes('/auth/refresh-token')) {
            return Promise.reject(error)
        }

         if (isrefreshing){
            return new Promise ((resolve, reject ) => {
                failedQue.push({resolve, reject})
            }).then( (token)=>{
                original.headers.Authorization = `Bearer ${token}`
                return api(original)
            })
        }
        original._retry = true;
        isrefreshing = true;

        try {
                //cookies sent automatically no body needed 

                const res = await refreshApi.post('/auth/refresh-token')
                const newtoken = res.data?.accessToken; 
                _accessToken = newtoken;
                 _setAccessToken(newtoken)

                processQue(null, newtoken )
                original.headers = original.headers || {};
                original.headers.Authorization = `Bearer ${newtoken}`
                return api(original)
        } catch (err) {

            //refresh failed session truely expired - forced logout 
                processQue(err, null);
                _accessToken = null;
                _setAccessToken(null)
                    window.location.href = '/login';
                return Promise.reject(err)
        }
        finally {
            isrefreshing = false
        }
    }
)
 export default api