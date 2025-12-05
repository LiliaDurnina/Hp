import React, { useEffect, useState } from "react";
import { HPapi } from "../../api/hpApi";
import type { Character } from "../../types/HPCharacter";
import CharacterCard from "./CharacterCard";
import CharacterModal from "./CharacterModal";

const CharacterGrid: React.FC = () => {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [visibleCharacters, setVisibleCharacters] = useState<Character[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalCharacter, setModalCharacter] = useState<Character | null>(null);

  const charactersPerPage = 12;

  const getHouseClass = (house?: string) => {
    const houseMap: Record<string, string> = {
      Gryffindor: "gryffindor",
      Slytherin: "slytherin",
      Hufflepuff: "hufflepuff",
      Ravenclaw: "ravenclaw",
    };
    return house ? houseMap[house] || "" : "";
  };

  useEffect(() => {
    const loadCharacters = async () => {
      setLoading(true);
      try {
        const chars = await HPapi.getAllCharct();
        setAllCharacters(chars);
        setVisibleCharacters(chars.slice(0, charactersPerPage));
        setCurrentIndex(charactersPerPage);
      } catch {
        setError("Не удалось загрузить персонажей. Проверьте интернет соединение.");
      } finally {
        setLoading(false);
      }
    };
    loadCharacters();
  }, []);

  const loadMore = () => {
    const nextChars = allCharacters.slice(currentIndex, currentIndex + charactersPerPage);
    setVisibleCharacters([...visibleCharacters, ...nextChars]);
    setCurrentIndex(currentIndex + charactersPerPage);
  };

  const openModal = (char: Character) => {
    setModalCharacter(char);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalCharacter(null);
    document.body.style.overflow = "";
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      <div className="grid">
        {visibleCharacters.map(char => (
          <CharacterCard key={char.name} character={char} onClick={openModal} getHouseClass={getHouseClass} />
        ))}
      </div>

      {currentIndex < allCharacters.length && (
        <button onClick={loadMore}>Load More Characters</button>
      )}

      <CharacterModal character={modalCharacter} onClose={closeModal} />
    </div>
  );
};

export default CharacterGrid;
