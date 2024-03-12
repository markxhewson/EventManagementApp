import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import verifyToken from "../util/verifyToken";
import { Link } from "react-router-dom";

const Home = () => {
  const { isLoggedIn, user, logout } = useAuthContext();

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


      <nav className="bg-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 text-white">
                <img src="/icon.png" className="h-16 w-16 hover:cursor-pointer hover:animate-spin" />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link to="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-xl font-medium">
                    <h1>HOME</h1>
                  </Link>
                  <Link to="/events" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-xl font-medium">
                    <h1>OUR EVENTS</h1>
                  </Link>
                  <Link to="/about" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-xl font-medium">
                    <h1>ABOUT US</h1>
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              {!isLoggedIn && <div className="ml-4 flex items-center md:ml-6">
                <Link to="/login" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-xl font-medium">
                  <h1>LOGIN</h1>
                </Link>
                <Link to="/signup" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-xl font-medium">
                  <h1>SIGN UP</h1>
                </Link>
              </div>}
              {isLoggedIn && <div className="ml-4 flex items-center md:ml-6">
                <Link to="/account" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-xl font-medium">
                  <h1>ACCOUNT</h1>
                </Link>
                <button onClick={logout} type="submit" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-xl font-medium">
                  <h1>LOG OUT</h1>
                </button>
              </div>}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Home;
