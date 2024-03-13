import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import verifyToken from "../util/verifyToken";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  const { isLoggedIn, user } = useAuthContext();

  useEffect(() => {
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
  }, []);

  return (
    <>
      <div className={!isLoggedIn || (user && !user.authenticated) ? 'hidden' : 'absolute'}>
        <div className="fixed bottom-5 right-5">
          <div className="p-4 w-auto max-w-xs bg-red-700 rounded-md text-white">
            <h1 className="text-lg mb-2">Account Not Verified!</h1>
            <p className="mb-4 text-sm">Your account is not authenticated. Please verify your account to access all features.</p>
            <Link to={{ pathname: "/verification", state: { signupVerification: true } }} className="block text-center bg-white text-red-700 px-4 py-2 rounded-md hover:bg-red-600 hover:text-white">
              VERIFY NOW
            </Link>
          </div>
        </div>
      </div>

      <Navbar />
    </>
  );
};

export default Home;
