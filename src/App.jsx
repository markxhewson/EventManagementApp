import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import PageNotFound from "./pages/error/PageNotFound"
import DefaultSignup from "./pages/auth/DefaultSignup"
import Signup from "./pages/auth/Signup"
import Login from "./pages/auth/Login"
import { useEffect } from "react"
import AccountDetailsPage from "./pages/account/AccountDetailsPage"
import Verification from "./pages/auth/Verification"
import { useAuthContext } from "./context/AuthContext"
import ManageEvents from "./pages/manage-events/ManageEvents"

function App() {
    const { isLoggedIn } = useAuthContext();

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
        <>
            <Routes>
                {
                    isLoggedIn ? (
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/account" element={<AccountDetailsPage />} />
                            <Route path="/verification" element={<Verification />} />
                            <Route path='/manage-events' element={<ManageEvents />} />
                            {/* <Route path="*" element={<PageNotFound />} /> */}
                            <Route path="/*" element={<Navigate to="/" />} />
                        </>
                    ) : (
                        <>
                            <Route path="/landing" element={<DefaultSignup />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/verification" element={<Verification />} />
                            {/* <Route path="*" element={<PageNotFound />} /> */}
                            <Route path="/*" element={<Navigate to="/landing" />} />
                        </>
                    )
                }
            </Routes>
        </>
    )
}

export default App
