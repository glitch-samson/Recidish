import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import RecipeDetails from "./components/RecipeDetails";

function App() {
	return (
		<div className='flex'>
			<Sidebar />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/favorites' element={<FavoritesPage />} />
				<Route path="/details/:id" element={<RecipeDetails />} />
			</Routes>
		</div>
	);
}

export default App;
