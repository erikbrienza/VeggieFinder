import axios from "axios";

export const getVegetarianRecipes = async (query) => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY; // Assicurati che la chiave API sia definita
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch`,
      {
        params: {
          query,
          diet: "vegetarian",
          number: 10, // Numero di risultati
          apiKey,
        },
      }
    );
    console.log("Risultati della ricerca:", response.data); // Log per debug
    return response.data.results;
  } catch (error) {
    console.error("Errore nella ricerca delle ricette:", error);
    return [];
  }
};