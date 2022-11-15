import {Parameter} from "./parameter";

export interface Sexe extends Parameter {
}

export interface FoodPreference extends Parameter {
}

export interface Profile {
    id: number,
    name: string,
    firstName: string,
    sexe: Sexe,
    height: number,
    weight: number,
    creationDate: Date,
    dateOfBirth: Date,
    foodPreference: FoodPreference
}