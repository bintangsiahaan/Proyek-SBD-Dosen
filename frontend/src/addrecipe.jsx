import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AddRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await axios.get(`http://localhost:3000/api/whattoeat/GetRecipe?id=${id}`);
      setRecipe(response.data.recipe || "");
    };
    fetchRecipe();
  }, [id]);

  const handleSaveRecipe = async () => {
    await axios.post('http://localhost:3000/api/whattoeat/AddRecipe', { id, recipe });
    navigate("/recipe");
  };

  return (
    <div style={{ backgroundColor: "#0f1a2b", padding: "20px", color: "white", minHeight: "100vh" }}>
      <h2 style={{ color: "#CDEEFD", marginBottom: "20px", fontSize:"20px" }}>Add/Edit Recipe</h2>
      <textarea
        value={recipe}
        onChange={(e) => setRecipe(e.target.value)}
        style={{
          width: "100%", /* Mengatur textarea agar mengisi lebar jendela */
          height: "80vh", /* Tinggi textarea sesuai dengan 80% tinggi viewport */
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          backgroundColor: "lightskyblue",
          color: "#0f1a2b", /* Warna teks */
          border: "2px solid steelblue" /* Garis tepi */
        }}
      />
      <br />
      <button
        onClick={handleSaveRecipe}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#003F88",
          color: "white",
          border: "none",
          borderRadius: "5px",
          marginTop: "10px" /* Jarak dari textarea */
        }}
      >
        Save
      </button>
    </div>
  );

};

export default AddRecipe;
