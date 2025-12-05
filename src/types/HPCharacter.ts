export interface Wand {
  wood?: string;
  core?: string;
  length?: number;
}

export interface Character {
  name: string;
  house?: string;
  actor?: string;
  dateOfBirth?: string;
  patronus?: string;
  wand?: Wand;
  alternate_names?: string[];
}

export interface CharacterDetails {
  name: string;
  gender: string;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
}
