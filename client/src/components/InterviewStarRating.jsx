import React from "react";
import { Button } from "react-bootstrap";
import StarBorderIcon from '@mui/icons-material/StarBorder';

const StarRating = ({ onchange, title, rating, setRating }) => {

  return (
    <div>
      {/* {title} */}
      {[...Array(5)].map((_, index) => {
        index += 1;

        const handleClick = () => {
          setRating(index);
          // onchange(index);
        };

        return (
          <Button
            variant="link"
            key={index}
            style={{
              cursor: "pointer",
              color: index <= rating ? "#000" : "#ccc",
            }}
            onClick={handleClick}
          >
            <StarBorderIcon />
          </Button>
        );
      })}
    </div>
  );
};

export default StarRating;
