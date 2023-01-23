import {Parameter} from "./parameter";

export interface Aliment {
    id: number,
    label?: string,
    weight?: number,
    caloriesPerWeight?: number,
    family?: Parameter
}