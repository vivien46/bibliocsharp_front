const getApiUrl = () : string => {
    if (import.meta.env.MODE === 'development') {
        return import.meta.env.VITE_API_HTTP_URL as string;
    } else {
        return import.meta.env.VITE_API_BASE_URL as string;
    }
};

const API_URL = getApiUrl();

export default API_URL;