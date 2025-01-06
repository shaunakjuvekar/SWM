import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const SearchBar = ({ mapRef }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!mapRef?.current) return;

    const searchManager = new Microsoft.Maps.Search.SearchManager(mapRef.current);
    const searchRequest = {
      where: query,
      callback: (result) => {
        if (result && result.results && result.results.length > 0) {
          const location = result.results[0].location;
          mapRef.current.setView({ center: location, zoom: 14 });
        } else {
          console.error("No results found for query:", query);
        }
      },
      errorCallback: (error) => {
        console.error("Search error:", error);
      },
    };
    searchManager.geocode(searchRequest);
  };

  return (
    <div style={{ position: "absolute", top: "10px", left: "10px", zIndex: 1000 }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search location"
        style={{
          padding: "5px",
          width: "250px",
          border: "1px solid #ccc",
          fontSize: "14px",
          borderRadius: "4px",
        }}
      />
      <Button variant="primary"
        onClick={handleSearch}
        style={{
          padding: "7px",
          width: "80px",
          fontSize: "14px",
          marginLeft: "5px",
          cursor: "pointer",
        }}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
