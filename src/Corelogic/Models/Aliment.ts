import {Parameter} from "./Parameter";

export interface MealType extends Parameter {

}

export interface AlimentFamily extends Parameter {

}

export interface Meal {
    id: number,
    label?: string,
    mealType?: MealType
}

export interface Aliment {
    calories: number
    carbohydrates_total_g: number
    cholesterol_mg: number
    fat_saturated_g: number
    fat_total_g: number
    fiber_g: number
    name: string
    potassium_mg: number
    protein_g: number
    serving_size_g: number
    sodium_mg: number
    sugar_g: number
}