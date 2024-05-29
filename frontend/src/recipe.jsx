import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'github-markdown-css/github-markdown.css';

const Recipe = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [newRecommendation, setNewRecommendation] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    const response = await axios.get('http://localhost:3000/api/whattoeat/GetRecommendation');
    setRecommendations(response.data);
  };

  const handleAddRecommendation = async () => {
    const formData = new FormData();
    formData.append("newRecommendation", newRecommendation);
    formData.append("image", image);

    await axios.post('http://localhost:3000/api/whattoeat/AddRecommendation', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    setNewRecommendation(""); 
    setImage(null); 
    fileInputRef.current.value = ""; 
    fetchRecommendations();
  };

  const handleDeleteRecommendation = async (id) => {
    await axios.delete(`http://localhost:3000/api/whattoeat/DeleteRecommendation?id=${id}`);
    fetchRecommendations();
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#0f1a2b", minHeight: "100vh", color: "white" }}>
      <header style={{ marginBottom: "20px" }}>
        <h1 style={{ fontFamily:"EB Garamond", fontWeight:"bold", fontSize:"40px", color: "#CDEEFD", padding: "10px", borderRadius: "8px", textAlign: "center" }}>TASTY SPOT</h1>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "10vh" }}>
          <Link to="/recipe" style={{
            marginRight: "10px",
            color: "white",
            backgroundColor: "#003F88",
            padding: "10px 30px",
            borderRadius: "5px",
            textDecoration: "none",
            transition: "background-color 0.3s ease", 
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "steelblue"; 
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#003F88"; 
          }}>
          Profile
          </Link>
          <Link to="/contact" style={{
            marginRight: "10px",
            color: "white",
            backgroundColor: "#003F88",
            padding: "10px 30px",
            borderRadius: "5px",
            textDecoration: "none",
            transition: "background-color 0.3s ease", 
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "steelblue"; 
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#003F88"; 
          }}>
            Contact
          </Link>
        </div>
      </header>
      <main>
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ color: "#CDEEFD", marginBottom: "7px" }}>Add a New Recommendation</h2>
          <input
            type="text"
            placeholder="Enter the name of the food"
            value={newRecommendation}
            onChange={(e) => setNewRecommendation(e.target.value)}
            style={{
              marginRight: "10px",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              color: "#333",
              backgroundColor: "#fff", 
              border: "1px solid #ccc",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", 
              transition: "box-shadow 0.3s ease", 
              width: "215px"
            }}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => setImage(e.target.files[0])}
            style={{ display: "none" }}
            id="fileInput"
          />
          <label htmlFor="fileInput" style={{
            marginRight: "10px",
            padding: "5px 10px",
            fontSize: "16px",
            backgroundColor: "#003F88",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease", 
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = 'steelblue'} 
          onMouseLeave={(e) => e.target.style.backgroundColor = '#003F88'} 
          >
          Choose Photo
          </label>
          <button onClick={handleAddRecommendation} style={{
            padding: "5px 10px",
            fontSize: "16px",
            backgroundColor: "#003F88",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = 'steelblue'} 
          onMouseLeave={(e) => e.target.style.backgroundColor = '#003F88'}
          >
          Add</button>
          </div>
        <div>
        <h2 style={{ color: "#CDEEFD" }}>Recommendations</h2>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {recommendations.map((rec) => (
              <div key={rec.id} style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "10px", margin: "10px", width: "350px", backgroundColor: "lightskyblue", color: "black" }}>
                <img src={`http://localhost:3000${rec.image}`} alt={rec.description} style={{ width: "100%", borderRadius: "8px" }} />
                <p style={{ color: "midnightblue", fontWeight: "bold", marginBottom: "10px", marginTop: "10px", fontSize: "23px", textAlign: "center" }}>{rec.description}</p>
                <Link to={`/addrecipe/${rec.id}`} style={{ display: "block", marginBottom: "7px", padding: "5px 10px", fontSize: "16px", backgroundColor: "steelblue", color: "white", border: "none", borderRadius: "5px", textAlign: "center", textDecoration: "none" }}>
                  Add Recipe
                </Link>
                <Link to={`/viewrecipe/${rec.id}`} style={{ display: "block", marginBottom: "7px", padding: "5px 10px", fontSize: "16px", backgroundColor: "steelblue", color: "white", border: "none", borderRadius: "5px", textAlign: "center", textDecoration: "none" }}>
                  View Recipe
                </Link>
                <button onClick={() => handleDeleteRecommendation(rec.id)} style={{ padding: "5px 10px", fontSize: "16px", backgroundColor: "#003F88", color: "white", border: "none", borderRadius: "5px" }}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Recipe;
