import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useJwtToken from "./useJwtToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const { refresh } = useJwtToken();
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                console.log(`Adicionando no Axios: ${auth?.accessToken}`);
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (!prevRequest?.sent && (error?.response?.status === 401 || error?.response?.status === 403)) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    console.log(`Adicionando no Axios (refresh): ${newAccessToken}`);
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh]);

    return axiosPrivate;
}

export default useAxiosPrivate;