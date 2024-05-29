import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Periksa impor useParams
import ReactMarkdown from 'react-markdown';

const ViewRecipe = () => {
  const { id } = useParams(); // Gunakan useParams untuk mengambil id dari URL
  const [recipe, setRecipe] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/whattoeat/GetRecipe?id=${id}`);
        setRecipe(response.data.recipe || "No recipe found");
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setRecipe("No recipe found"); // Handle error case
      }
    };
    fetchRecipe();
  }, [id]);

  return (
    <div style={{ backgroundColor: "#0f1a2b", padding: "20px", color: "white", minHeight: "100vh" }}>
      <h2 style={{ color: "#CDEEFD", marginBottom: "20px", fontSize:"20px" }}>Add/Edit Recipe</h2>
      <div
        className="markdown-body"
        style={{
          width: "100%",
          height: "80vh", 
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          backgroundColor: "lightskyblue",
          color: "#0f1a2b", 
          border: "2px solid steelblue",
          overflowY: "auto"
        }}
      >
        <ReactMarkdown>{recipe}</ReactMarkdown>
      </div>
    </div>
  );
  
};

export default ViewRecipe;
