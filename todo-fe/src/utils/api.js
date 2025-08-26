import axios from "axios";

const api = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
    headers: {
        "Content-Type": "application/json",
    },
});
/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
    (request) => {
        // 매 요청마다 최신 토큰을 가져와서 헤더에 설정
        const token = sessionStorage.getItem("token");
        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
        }

        console.log("Starting Request", request);
        return request;
    },
    function (error) {
        console.log("REQUEST ERROR", error);
    }
);

api.interceptors.response.use(
    (response) => {
        console.log("Response:", response);
        return response;
    },
    function (error) {
        error = error.response.data;
        console.log("RESPONSE ERROR", error);
        return Promise.reject(error);
    }
);

export default api;
