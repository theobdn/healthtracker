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
    id: number,
    code?: string,
    label?: string,
    weight?: number,
    caloriesPerWeight?: number,
    family?: AlimentFamily
}