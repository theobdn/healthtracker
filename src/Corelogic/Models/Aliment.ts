import {Parameter} from "./Parameter";

export interface MealType extends Parameter {

}

export interface Meal {
    id: number,
    label?: string,
    mealType?: MealType
}

export interface Aliment {
    id: number,
    label?: string,
    weight?: number,
    caloriesPerWeight?: number,
    family?: Parameter
}