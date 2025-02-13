import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        console.log("API Key:727230f0476a4d4cbb70769378847fa3", apiKey); // Log the API key to verify it
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information`,
          {
            params: { apiKey },
          }
        );
        console.log("API Response:", response.data); // Log the API response
        setRecipe(response.data);
      } catch (error) {
        console.error("Errore nel caricamento dei dettagli:", error);
        setError("Errore nel caricamento dei dettagli. Per favore riprova più tardi.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) return <p>Caricamento...</p>;

  if (error) return <p>{error}</p>;

  if (!recipe) return <p>Ricetta non trovata.</p>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} style={{ width: "100%", borderRadius: "12px" }} />
      <p dangerouslySetInnerHTML={{ __html: recipe.instructions || "Nessuna istruzione disponibile" }} />
    </div>
  );
};

export default RecipeDetails;