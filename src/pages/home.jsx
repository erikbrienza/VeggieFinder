import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getVegetarianRecipes } from "../api/api";  // Assicurati che esista questa funzione API

const Home = () => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    const results = await getVegetarianRecipes(search);
    setRecipes(results);
  };

  return (
    <div style={styles.container}>
      <h2>Cerca ricette vegetariane</h2>
      <form onSubmit={handleSearch} style={styles.form}>
        <input
          type="text"
          placeholder="Inserisci una ricetta..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Cerca</button>
      </form>

      {/* Mostra le ricette */}
      <div style={styles.recipes}>
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            style={styles.recipeCard}
            onClick={() => navigate(`/recipe/${recipe.id}`)}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img src={recipe.image} alt={recipe.title} style={styles.image} />
            <h3 style={styles.title}>{recipe.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
    container: {
      textAlign: "center",
      padding: "40px 20px",
      backgroundColor: "#FFFFFF",
      minHeight: "100vh",
      fontFamily: "'Poppins', sans-serif",
    },
    form: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
      marginBottom: "20px",
    },
    input: {
      padding: "12px",
      fontSize: "16px",
      width: "300px",
      borderRadius: "8px",
      border: "2px #00BF63",
      outline: "none",
    },
    button: {
      padding: "12px 18px",
      fontSize: "16px",
      backgroundColor: "#00BF63",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "background-color 0.3s",
    },
    recipes: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "20px",
      marginTop: "20px",
      padding: "0 10px",
    },
    recipeCard: {
      border: "1px solid #ddd",
      borderRadius: "12px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      backgroundColor: "#FFFFFF",
      cursor: "pointer",
      transition: "transform 0.3s",
    },
    image: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
    },
    title: {
      fontSize: "18px",
      fontWeight: "600",
      margin: "16px",
      color: "#333",
    },
  };  

export default Home;