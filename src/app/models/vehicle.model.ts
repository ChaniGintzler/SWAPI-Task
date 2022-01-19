import {Pilot} from'./pilot.model';

export interface Vehicle{
    name: string;
    pilots :Pilot [];
    sumPopulation:number;
}