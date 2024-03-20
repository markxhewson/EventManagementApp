import { Link } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"

export default function Navbar() {

    const { isLoggedIn, logout, user } = useAuthContext();

    return (
        <>
            <div className='h-[75px]'></div>
            <nav className="flex items-center h-[75px] bg-white fixed top-0 left-0 w-full z-10">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-12">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 text-black">
                                <img src="/icon.png" className="h-12 w-12 hover:cursor-pointer hover:animate-spin" />
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <Link to="/" className="text-black hover:border-black border-2 border-transparent px-3 py-2 rounded-md text-xl font-medium">
                                        <h1>HOME</h1>
                                    </Link>
                                    <Link to="/event-list" className="text-black hover:border-black border-2 border-transparent px-3 py-2 rounded-md text-xl font-medium">
                                        <h1>OUR EVENTS</h1>
                                    </Link>
                                    <Link to="/about" className="text-black hover:border-black border-2 border-transparent px-3 py-2 rounded-md text-xl font-medium">
                                        <h1>ABOUT US</h1>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block ml-auto">
                            {!isLoggedIn && <div className="ml-4 flex items-center md:ml-6">
                                <Link to="/login" className="text-black hover:border-black border-2 border-transparent px-3 py-2 rounded-md text-xl font-medium">
                                    <h1>LOGIN</h1>
                                </Link>
                                <Link to="/signup" className="text-black hover:border-black border-2 border-transparent px-3 py-2 rounded-md text-xl font-medium">
                                    <h1>SIGN UP</h1>
                                </Link>
                            </div>}
                            {isLoggedIn && <div className="flex flex-row gap-4 items-center">
                                {
                                    user?.role === 'organiser' && (
                                        <div className='mx-4 flex items-center'>
                                            <Link to="/organiser-applications" className="text-black hover:border-black border-2 border-transparent py-2 px-3 rounded-md text-xl font-medium">
                                                <h1>ORGANISER APPLICATIONS</h1>
                                            </Link>
                                        </div>
                                    )
                                }
                                {
                                    user?.role === 'organiser' && (
                                        <div className='mx-4 flex items-center'>
                                            <Link to="/manage-events" className="text-black hover:border-black border-2 border-transparent py-2 px-3 rounded-md text-xl font-medium">
                                                <h1>MANAGE EVENTS</h1>
                                            </Link>
                                        </div>
                                    )
                                }
                                {
                                    user?.role === 'attendee' && (
                                        <div className='mx-4 flex items-center'>
                                            <Link to="/organiser-signup" className="text-black hover:border-black border-2 border-transparent py-2 px-3 rounded-md text-xl font-medium">
                                                <h1>BECOME AN ORGANISER</h1>
                                            </Link>
                                        </div>
                                    )
                                }
                                <Link to="/account" className="mx-4 text-black hover:border-black border-2 border-transparent py-2 px-3 rounded-md text-xl font-medium">
                                    <h1>ACCOUNT</h1>
                                </Link>
                                <button onClick={logout} type="submit" className="mx-4 text-black hover:border-black border-2 border-transparent px-3 py-2 rounded-md text-xl font-medium">
                                    <h1>LOG OUT</h1>
                                </button>
                            </div>}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}