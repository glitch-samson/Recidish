import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const APP_ID = import.meta.env.VITE_APP_ID;
const APP_KEY = import.meta.env.VITE_APP_KEY;

const RecipeDetails = () => {
	const { state } = useLocation();
	const navigate = useNavigate();
	const recipe = state?.recipe;

	const [fullRecipe, setFullRecipe] = useState(null);
	const [loading, setLoading] = useState(true);

	// Fetch full recipe details
	const fetchFullRecipe = async (uri) => {
		setLoading(true);
		try {
			const res = await fetch(
				`https://api.edamam.com/api/recipes/v2${uri}?app_id=${APP_ID}&app_key=${APP_KEY}`
			);
			const data = await res.json();
			setFullRecipe(data.recipe);
		} catch (error) {
			console.log(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (recipe?.uri) {
			fetchFullRecipe(recipe.uri);
		}
	}, [recipe]);

	if (!recipe) {
		return <div>Recipe not found!</div>;
	}

	return (
		<div className="p-5">
			<button
				className="bg-gray-200 py-1 px-3 rounded-md mb-3"
				onClick={() => navigate(-1)}
			>
				Back
			</button>
			{loading ? (
				<div>Loading recipe details...</div>
			) : (
				<div>
					<h1 className="text-2xl font-bold mb-4">{fullRecipe?.label}</h1>
					<img
						src={fullRecipe?.image}
						alt={fullRecipe?.label}
						className="w-full h-64 object-cover rounded-md mb-4"
					/>
					<p className="mb-4">
						<strong>Cuisine:</strong>{" "}
						{fullRecipe?.cuisineType?.join(", ") || "Not specified"}
					</p>
					<h2 className="text-xl font-bold">Ingredients:</h2>
					<ul className="list-disc pl-5 mb-4">
						{fullRecipe?.ingredients?.map((ingredient, idx) => (
							<li key={idx}>{ingredient.text}</li>
						))}
					</ul>
					<h2 className="text-xl font-bold">Instructions:</h2>
					<p>{fullRecipe?.instructions || "Instructions not available."}</p>
				</div>
			)}
		</div>
	);
};

export default RecipeDetails;
