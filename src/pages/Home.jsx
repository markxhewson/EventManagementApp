import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import verifyToken from "../util/verifyToken";

const Home = () => {
  const { isLoggedIn } = useAuthContext();

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
    <div className="flex justify-center items-center h-fit min-h-screen">
      {isLoggedIn ? (<p>Logged in</p>) : (<p>Not logged in</p>)}
    </div>
  )
};

export default Home;