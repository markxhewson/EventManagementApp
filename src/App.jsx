import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import PageNotFound from "./pages/error/PageNotFound"
import DefaultSignup from "./pages/auth/DefaultSignup"

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="signup" element={<DefaultSignup />} />
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	)
}

export default App
