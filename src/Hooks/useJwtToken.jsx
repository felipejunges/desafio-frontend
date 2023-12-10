import axios from "axios";
import useAuth from './useAuth'
import { useJwt, isExpired, decodeToken } from "react-jwt";
import { useLocalStorage } from './useLocalStorage';

const useJwtToken = () => {
    const { auth, setAuth } = useAuth();
    const { setItem } = useLocalStorage('auth');

    const client = axios.create({
        baseURL: 'http://localhost:5153'
    });

    const login = async (email, password) => {
        const response = await client.post('/api/Auth',
            JSON.stringify({ email, senha: password }),
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
        //console.log(JSON.stringify(response?.data));
        //console.log(JSON.stringify(response));
        const accessToken = response?.data?.token;
        const refreshToken = response?.data?.refreshToken;

        console.log(`accessToken: ${accessToken}`);
        console.log(`refreshToken: ${refreshToken}`);

        //const { decodedToken, isExpired } = useJwt(accessToken);
        const decodedToken = decodeToken(accessToken);
        const isExpiredd = isExpired(accessToken);
        console.log(decodedToken);
        console.log(isExpiredd);
        console.log(decodedToken.given_name);
        console.log(decodedToken.role);
        console.log(decodedToken.exp);
        console.log(new Date(decodedToken.exp * 1000));

        const authData = { user: email, accessToken, refreshToken, role: decodedToken.role };
        setAuth(authData);
        setItem(authData);
    }

    const refresh = async () => {
        const response = await client.put('/api/Auth',
            JSON.stringify({ token: auth.accessToken, refreshToken: auth.refreshToken }),
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );

        const accessToken = response?.data?.token;
        const refreshToken = response?.data?.refreshToken;

        setAuth(prev => {
            console.log(`prev: ${JSON.stringify(prev)}`);
            console.log(`accessToken: ${accessToken}`);
            console.log(`refreshToken: ${refreshToken}`);

            var newAuth = {
                ...prev,
                accessToken,
                refreshToken
            };

            console.log(`newAuth: ${JSON.stringify(newAuth)}`);

            setItem(newAuth);

            return newAuth;
        });

        return accessToken;
    }

    return { login, refresh };
}

export default useJwtToken;