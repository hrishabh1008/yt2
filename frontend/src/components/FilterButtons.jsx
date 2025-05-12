import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FilterButtons = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const navigate = useNavigate();

  const filters = [
    { id: "all", label: "All" },
    { id: "music", label: "Music" },
    { id: "gaming", label: "Gaming" },
    { id: "news", label: "News" },
    { id: "live", label: "Live" },
    { id: "sports", label: "Sports" },
    { id: "learning", label: "Learning" },
    { id: "fashion", label: "Fashion & Beauty" },
  ];

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);

    if (onFilterChange) {
      onFilterChange(filterId);
    }

    // Optional: Navigate to filtered view
    if (filterId === "all") {
      navigate("/");
    } else {
      navigate(`/?filter=${filterId}`);
    }
  };

  return (
    <div className="flex overflow-x-auto py-3 px-1 mb-4 scrollbar-hide">
      <div className="flex space-x-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => handleFilterClick(filter.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === filter.id
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}>
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterButtons;
