import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import PageNotFound from "./pages/error/PageNotFound"
import DefaultSignup from "./pages/auth/DefaultSignup"
import Signup from "./pages/auth/Signup"
import Login from "./pages/auth/Login"
import { useEffect } from "react"

function App() {
    useEffect(() => {
        const handleVisibilityChange = () => {
            document.title = document.hidden ? "Come back :(" : "Event Bloom";
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="default-signup" element={<DefaultSignup />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}

export default App
