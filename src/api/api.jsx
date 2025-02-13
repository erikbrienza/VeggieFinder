import axios from "axios";

const API_KEY = "727230f0476a4d4cbb70769378847fa3";
const BASE_URL = "https://api.spoonacular.com/recipes/complexSearch";

export const getVegetarianRecipes = async (query) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apiKey: API_KEY,
        query: query,
        diet: "vegetarian",
        number: 10,  // Numero di ricette da ottenere
      },
    });
    return response.data.resulats;  // Restituisce le ricette trovate
  } catch (error) {
    console.error("Errore nella chiamata API:", error);
    return [];
  }
};