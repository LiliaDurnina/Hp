import React from "react";

interface Props {
  house: string;
  image: string;
  className: string;
  onClick?: () => void;
}

const HouseCard: React.FC<Props> = ({ house, image, className, onClick }) => {
  return (
    <div className={`house_card ${className}`} onClick={onClick}>
      <img src={image} alt={house} className="house_image" />
      <p className="house_name">{house}</p>
    </div>
  );
};

export default HouseCard;