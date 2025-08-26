import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./route/PrivateRoute";
import api from "./utils/api";

function App() {
    const [user, setUser] = useState(null);
    const getUser = async () => { // 토큰을 통해 유저정보를 가져온다
        try {
            const storedToken = sessionStorage.getItem("token");
            if(storedToken) {
                // api.defaults.headers['authorization'] = "Bearer " + storedToken
                const response = await api.get("/user/me")
                setUser(response.data.user);
            }
        } catch (error) {
            setUser(null);
        }
    };

    useEffect(() => {
        // 컴포넌트 마운트 시 토큰이 있으면 사용자 정보 가져오기
        const token = sessionStorage.getItem("token");
        if (token) {
            getUser();
        }
    }, []); // 빈 의존성 배열로 마운트 시에만 실행
    return (
        <Routes>
            <Route path="/" element={
                <PrivateRoute user={user}>
                    <TodoPage />
                </PrivateRoute>}
            />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/login" element={<LoginPage user={user} setUser={setUser} getUser={getUser} />} />
        </Routes>
    );
}

export default App;
