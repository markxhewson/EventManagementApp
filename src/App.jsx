import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import DefaultSignup from "./pages/auth/DefaultSignup"
import { useEffect } from "react"
import AccountDetailsPage from "./pages/account/AccountDetailsPage"
import Verification from "./pages/auth/Verification"
import { useAuthContext } from "./context/AuthContext"
import ManageEvents from "./pages/manage-events/ManageEvents"
import OrganiserSignup from "./pages/auth/OrganiserSignup"
import OrganiserApplications from "./pages/manage-events/OrganiserApplications"
import ManageEventDetails from "./pages/manage-events/ManageEventDetails"
import PageNotFound from "./pages/error/PageNotFound"
import verifyToken from "./util/verifyToken"
import About from "./pages/About"
import EventList from "./pages/EventList"

function App() {
    const { isLoggedIn } = useAuthContext();

    const checkToken = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            return;
        }

        verifyToken(token).then((response) => {
            if (!response) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                alert('Your session has expired. Please log in again');
                window.location.reload();
            }
        });

        setTimeout(() => {
            if (!isLoggedIn) {
                checkToken();
            }
        }, 10000);
    }

    const handleVisibilityChange = () => {
        document.title = document.hidden ? "Come back :(" : "Event Bloom";
    };

    useEffect(() => {
        checkToken();

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
                            <Route path="event-list" element={<EventList />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/events" element={<EventList />} />
                            <Route path="/account" element={<AccountDetailsPage />} />
                            <Route path="/verification" element={<Verification />} />
                            <Route path='/manage-events' element={<ManageEvents />} />
                            <Route path='/manage-events/:id' element={<ManageEventDetails />} />
                            <Route path='/organiser-signup' element={<OrganiserSignup />} />
                            <Route path='/organiser-applications' element={<OrganiserApplications />} />
                            <Route path="*" element={<PageNotFound />} />
                        </>
                    ) : (
                        <>
                            <Route path="/verification" element={<Verification />} />
                            <Route path="*" element={<DefaultSignup />} />
                        </>
                    )
                }
            </Routes>
        </>
    )
}

export default App
