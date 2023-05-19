import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "../css/Interview.css";

const StarRating = ({ onchange, title }) => {
  const [rating, setRating] = useState(0);

  return (
    <div className="star-rating">
      {title}
      {[...Array(5)].map((star, index) => {
        index += 1;

        const handleClick = () => {
          setRating(index);
          onchange(index);
        };
        {
          /* My comment here */
        }
        return (
          <Button
            variant="link"
            key={index}
            style={{
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
              cursor: "pointer",
              color: index <= rating ? "#000" : "#ccc",
            }}
            onClick={handleClick}
          >
            <span className="star">&#9733;</span>
          </Button>
        );
      })}
    </div>
  );
};

export default StarRating;
