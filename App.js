// src/App.js
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!query.trim()) {
      toast.error("Please enter a query!");
      return;
    }

    setLoading(true);
    setResponse("");

    try {
      const result = await axios.post("/api/analyze", { query });
      setResponse(result.data.response);
      toast.success("Analysis complete!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to analyze the query.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>Social Media Performance Analysis</h1>
      <textarea
        placeholder="Enter your query/prompt here..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        rows="6"
        style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
      />
      <button
        onClick={handleAnalyze}
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
      <div>
        <h3>Generated Output:</h3>
        <pre
          style={{
            background: "#f4f4f4",
            padding: "10px",
            borderRadius: "5px",
            overflowX: "auto",
          }}
        >
          {response || "No output yet."}
        </pre>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
