// utils/houseColors.ts

export const getHouseClass = (house: string): string => {
  if (!house) return '';
  
  const houseMap: Record<string, string> = {
    'Gryffindor': 'gryffindor',
    'Slytherin': 'slytherin',
    'Hufflepuff': 'hufflepuff',
    'Ravenclaw': 'ravenclaw'
  };
  
  return houseMap[house] || '';
};

export const getHouseColor = (house: string): string => {
  if (!house) return '#9CA3AF';
  
  const colorMap: Record<string, string> = {
    'Gryffindor': '#BC1F26',
    'Slytherin': '#267A3C',
    'Hufflepuff': '#B48019',
    'Ravenclaw': '#181446'
  };
  
  return colorMap[house] || '#9CA3AF';
};

export const getHouseGradient = (house: string): string => {
  const gradients: Record<string, string> = {
    'Gryffindor': 'linear-gradient(135deg, #BC1F26 0%, #FFD700 100%)',
    'Slytherin': 'linear-gradient(135deg, #267A3C 0%, #C0C0C0 100%)',
    'Hufflepuff': 'linear-gradient(135deg, #B48019 0%, #FFE55C 100%)',
    'Ravenclaw': 'linear-gradient(135deg, #181446 0%, #946B2D 100%)'
  };
  
  return gradients[house] || 'linear-gradient(135deg, #9CA3AF 0%, #D1D5DB 100%)';
};

export const getHouseEmblem = (house: string): string => {
  const emblems: Record<string, string> = {
    'Gryffindor': '🦁',
    'Slytherin': '🐍',
    'Hufflepuff': '🦡',
    'Ravenclaw': '🦅'
  };
  
  return emblems[house] || '⚡';
};