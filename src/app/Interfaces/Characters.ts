import { Crew } from "./Crew";
import { Fruit } from "./Fruits";

  
export interface Character {
    id: number;
    name: string;
    size: string;
    age: string;
    bounty: string;
    crew?: Crew;
    fruit?: Fruit;
    job: string;
    status: string;
  }