import React from "react";
import HouseCard from "./HousesCard";

interface HouseStats {
  male: number;
  female: number;
  students: number;
  staff: number;
}

interface Props {
  house: string;
  image: string;
  description: string;
  stats?: HouseStats;
  index: number; 
}

const HouseSection: React.FC<Props> = ({ house, image, description, stats }) => {
  const houseClass = house.toLowerCase();

  const male = stats?.male ?? 0;
  const female = stats?.female ?? 0;
  const students = stats?.students ?? 0;
  const staff = stats?.staff ?? 0;

  return (
    <div className="house-section">

      {/* Карточка факультета */}
      <div className="house-card-wrapper">
        <HouseCard 
          house={house}
          image={image}
          className={houseClass}
        />
      </div>

      {/* Описание факультета + статистика */}
      <div className="house-description description-container">

        <p className="house-description__text">{description}</p>

        <div className="house-stats">
          <ul className="header__row">

            <li className="header__row-item">
              <span>{male}</span>
              Male
            </li>

            <span></span>

            <li className="header__row-item">
              <span>{female}</span>
              Female
            </li>

            <span></span>

            <li className="header__row-item">
              <span>{students}</span>
              Students
            </li>

            <span></span>

            <li className="header__row-item">
              <span>{staff}</span>
              Staff
            </li>

          </ul>
        </div>

      </div>
    </div>
  );
};

export default HouseSection;
