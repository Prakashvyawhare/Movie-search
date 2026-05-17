import { createContext, useContext } from "react";

export const WatcListContext = createContext();


export function useWatchlist(){
    return useContext(WatcListContext)
}