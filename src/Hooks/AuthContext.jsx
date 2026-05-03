import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axiosInstance";
import {setMemorytoken, injecttokenSetter} from "../api/axiosInstance"


const AuthContext = createContext();


export function AuthProvider({children}) {
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null)


    useEffect(()=>{
        injecttokenSetter(setAccessToken);
        api.post('/auth/refresh-token', )
        .then((res)=>{
            if(res) {
                setMemorytoken(res.data.accessToken);
                setAccessToken(res.data.accessToken);
                setUser(res.data.user)
            }
        })
        .catch(err => { err})
        .finally(()=>{
            setLoading(false)
        })
    },[])

    // Sync global state token to memory token whenever it changes
    useEffect(() => {
        if(accessToken) {
            setMemorytoken(accessToken);
        }
    }, [accessToken])

    const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      if (response?.status === 200) {
        setMemorytoken(response.data.accessToken);
        setAccessToken(response.data.accessToken);
        setUser(response.data.user);
        return { success: true };
      }
    } catch (err) {
      setError("Invalid email or password");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

 
  const logout = async () => {
    await api.post('/auth/logout')  // server clears the cookie
    setMemorytoken(null);
    setAccessToken(null)
    setUser(null)
  }
    return ( 
        <AuthContext.Provider value={{login,logout, accessToken, error, isAuthenticated: !!accessToken, loading}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
export const useAuth = ()=> useContext(AuthContext)