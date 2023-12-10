import { createContext, useState } from "react";
import { useLocalStorage } from "../Hooks/useLocalStorage";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const { getItem, clear } = useLocalStorage('auth');

    const authItem = getItem();
    console.log(`authItem on AuthProvider load: ${JSON.stringify(authItem)}`)

    const [auth, setAuth] = useState(authItem);

    const logout = () => {
        clear();
        setAuth(undefined);
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;