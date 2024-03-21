import { Link, useLocation } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";

const DefaultSignup = () => {
    const location = useLocation();
    const isLogin = location.pathname === '/login';

    return (
        <div className="flex flex-col lg:flex-row bg-neutral-900 w-screen min-h-screen p-10 items-center justify-center">
            <div className='flex flex-col gap-3 lg:w-1/2 mx-10'>
                <h1 className="text-orange-800 text-5xl font-bold text-center">EVENTBLOOM</h1>
                <h3 className="text-slate-200 text-sm text-center">Sign up today to take advantage of one of our many services!</h3>

                <Link to={isLogin ? "/signup" : "/login"} className="text-orange-800 text-center">
                    {isLogin ? 'Create an account today!' : 'Already a member? Login here'}
                </Link>
            </div>

            <div className="flex flex-col justify-center items-center mt-12 lg:mt-0 lg:w-1/2">
                {/* <Link to="/signup" className="bg-red-700 text-center justify-center items-center rounded-xl p-2 w-80 text-2xl font-bold">SIGN UP</Link> */}
                {
                    isLogin ? <Login /> : <Signup />
                }
            </div>
        </div>
    )
};

export default DefaultSignup;