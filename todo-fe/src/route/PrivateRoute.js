import React, {useState} from 'react';
import TodoPage from "../pages/TodoPage";
import {Navigate} from 'react-router-dom';

const PrivateRoute = ({user, children}) => {
    // const [user, setUser] = useState(null); // user 값은 다른 페이지에서도 사용 할 수 있기 때문에 App.js에서
    return (
        // user? <TodoPage /> : // 이렇게 사용해도 되지만, Private함을 원하는 모든 페이지에서 쓸 수 있어야 한다.
        user ? children : <Navigate to="/login"/>
    )
}

// user값이 있으면? Todopage : redirect /login

export default PrivateRoute;