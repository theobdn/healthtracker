import {Parameter} from "./Parameter";

export interface Sexe extends Parameter {
}

export interface FoodPreference extends Parameter {
}

export interface Profile {
    id: number,
    user_id: number,
    name: string,
    surname: string,
    sexe: Sexe,
    height: number,
    weight: number,
    created_at: Date,
    birth: Date,
    food_preference: FoodPreference
}