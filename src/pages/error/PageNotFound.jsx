import { Link } from "react-router-dom";

const pageNotFound = () => {
	return (
		<main className="flex flex-col h-screen justify-center items-center p-4">
			<img className="rounded-xl mb-12 w-32 h-24" src="swing.gif"></img>
			<div className="flex flex-row">
				<h1 className="text-[40px] text-red-700 font-bold border-r-2 border-black pr-6">404</h1>
				<div className="flex flex-col pl-6">
					<h2 className="text-[20px] text-slate-500 font-bold">Page not found</h2>
					<Link to="/" className="text-[15px] text-blue-600">Return home {"➔"}</Link>
				</div>

			</div>
		</main>
	)
}

export default pageNotFound;