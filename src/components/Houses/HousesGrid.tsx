import React, { useEffect, useState } from "react";
import { housesApi } from "../../api/housesApi";
import HouseSection from "./HousesSection";
import type { House } from "../../types/HPHouse";
// import type { CharacterDetails } from "../../types/HPCharacter";

import gryffindorImg from "../../assets/images/houses/gryffindor.png";
import slytherinImg from "../../assets/images/houses/slytherin.png";
import ravenclawImg from "../../assets/images/houses/ravenclaw.png";
import hufflepuffImg from "../../assets/images/houses/hufflepuff.png";

const houseImages: Record<string, string> = {
  Gryffindor: gryffindorImg,
  Slytherin: slytherinImg,
  Ravenclaw: ravenclawImg,
  Hufflepuff: hufflepuffImg,
};

const houseDescriptions: Record<string, string> = {
    Gryffindor: "Gryffindor House is known for courage, bravery, nerve, and chivalry. Its emblematic animal is the lion, and its colors are scarlet and gold. Gryffindor students are daring, determined, and ready to stand up for what is right. They often become leaders and heroes, never afraid to take risks in pursuit of justice and honor.",
    Slytherin: "Slytherin House values ambition, cunning, leadership, and resourcefulness. Represented by the serpent, its colors are green and silver. Slytherins are determined and strategic, often choosing the most efficient path to achieve greatness. Many influential wizards and witches come from this house, both great and infamous.",
    Ravenclaw: "Ravenclaw House celebrates intelligence, creativity, learning, and wit. The eagle represents their soaring intellect, and their colors are blue and bronze. Ravenclaws seek knowledge above all else, valuing curiosity and wisdom. Their common room is filled with books and open-minded discussion about the mysteries of magic and life.",
    Hufflepuff: "Hufflepuff House is known for hard work, patience, loyalty, and fair play. Its animal symbol is the badger, and its colors are yellow and black. Hufflepuffs are kind-hearted, inclusive, and value honesty and friendship. They believe that everyone deserves respect and a fair chance, and their strength lies in their unity and perseverance."
};

interface HouseStats {
  male: number;
  female: number;
  students: number;
  staff: number;
}

const HousesGrid: React.FC = () => {
    const [houses, setHouses] = useState<House[]>([]);
    const [stats, setStats] = useState<Record<string, HouseStats>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
        const load = async () => {
          setLoading(true);
          try {
            const loadedHouses = await housesApi.getAllHouses();
            console.log('Загружены факультеты:', loadedHouses);
            setHouses(loadedHouses);
      
            // Создаем промисы для каждого факультета
            const housePromises = loadedHouses.map(async (house) => {
              try {
                console.log(`Начинаем загрузку для: ${house.name}`);
                const members = await housesApi.getStudentsByHouse(house.name.toLowerCase());
                console.log(`Для ${house.name} получено ${members.length} студентов`);
                
                return {
                  houseName: house.name,
                  stats: {
                    male: members.filter((s) => s?.gender === 'male').length,
                    female: members.filter((s) => s?.gender === 'female').length,
                    students: members.filter((s) => s?.hogwartsStudent).length,
                    staff: members.filter((s) => s?.hogwartsStaff).length,
                  }
                };
              } catch (houseError) {
                console.error(`Ошибка для ${house.name}:`, houseError);
                return {
                  houseName: house.name,
                  stats: {
                    male: 0,
                    female: 0,
                    students: 0,
                    staff: 0,
                  }
                };
              }
            });
      
            // Ждем загрузки всех факультетов
            const results = await Promise.all(housePromises);
            console.log('Все факультеты загружены:', results);
            
            // Собираем статистику
            const statsData: Record<string, HouseStats> = {};
            results.forEach(result => {
              statsData[result.houseName] = result.stats;
            });
            
            console.log('Итоговая статистика:', statsData);
            setStats(statsData);
            
          } catch (e) {
            console.error('Общая ошибка загрузки:', e);
            setError("Не удалось загрузить факультеты. Проверьте интернет соединение.");
          } finally {
            setLoading(false);
          }
        };
      
        load();
      }, []);
  
    if (loading && houses.length === 0) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
  
    return (
      <div className="houses-grid">
        {houses.map((house, index) => {
  
          return (
            <HouseSection
              key={house.name}
              house={house.name}
              image={houseImages[house.name]}
              description={houseDescriptions[house.name]}
              stats={stats[house.name]}
              index={index}
            />
          );
        })}
      </div>
    );
  };

export default HousesGrid;