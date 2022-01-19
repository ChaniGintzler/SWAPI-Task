import { Planet } from './planet';

export interface Pilot {
  homeworld: string;
  name: string;
  planet: Planet;
  url: string;
}
