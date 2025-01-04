import { useEffect } from "react";
import axios from 'axios';
import { api } from "../api";
import { useAuth } from "./useAuth";

export const useApi = () => {
    const { auth, setAuth } = useAuth();

    useEffect(() => {
        // Add a request interceptor
        const requestIntercept = api.interceptors.request.use(
            (config) => {
                const authToken = auth?.authToken;
                if (authToken) {
                    config.headers.Authorization = `Bearer ${authToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Add a response interceptor
        const responseIntercept = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                console.log(error)
                const originalRequest = error.config;


                // If the error status is 401 and there is no originalRequest._retry flag,
                // it means the token has expired and we need to refresh it
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const oldRefreshToken = auth?.refreshToken;
                        const response = await axios.post(
                            `${import.meta.env.VITE_SERVER_URL}/api/auth/refresh-token`
                            ,
                            { refreshToken: oldRefreshToken }
                        );
                        console.log(response);
                        const { accessToken, refreshToken } = response?.data?.data;
                        console.log(`New Access Token: ${accessToken}`);
                        console.log(`New Refresh Token: ${refreshToken}`);


                        console.log(`New Token: ${accessToken}`);
                        setAuth({
                            ...auth,
                            authToken: accessToken,
                            refreshToken: refreshToken // Update refresh token
                        });

                        // Retry the original request with the new token
                        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                        return axios(originalRequest);
                    } catch (error) {
                        throw error;
                    }
                }

                return Promise.reject(error);
            }
        );
        return () => {
            api.interceptors.request.eject(requestIntercept);
            api.interceptors.response.eject(responseIntercept);
        }
    }, [auth]);
    return { api };

}