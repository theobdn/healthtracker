import {User} from "../../Corelogic/Models/User";
import {FoodPreference, Profile, Sexe} from "../../Corelogic/Models/Profile";
import {MealType} from "../../Corelogic/Models/Aliment";
import {Parameter} from "../../Corelogic/Models/Parameter";

/** USER & PROFILE **/
export const usersData: User[] = [
    {
        id: 1,
        email: "user1@gmail.com",
        password: "test",
        profileId: 1
    },
    {
        id: 2,
        email: "user2@gmail.com",
        password: "test",
        profileId: 2
    }
]

export const sexeData: Sexe[] = [
    {
        "id": 1,
        "code": "MAN",
        "label": "Male"
    },
    {
        "id": 2,
        "code": "WOMAN",
        "label": "Female"
    },
    {
        "id": 3,
        "code": "UNKNOW",
        "label": "Transgenre"
    }
]

export const foodPreferenceData: FoodPreference[] = [
    {
        "id": 1,
        "code": "NONE",
        "label": "Carnivore"
    },
    {
        "id": 2,
        "code": "GLUTENFREE",
        "label": "Vegan"
    },
    {
        "id": 3,
        "code": "VEGE",
        "label": "Cetogene"
    },
    {
        "id": 3,
        "code": "LACTOSEFREE",
        "label": "Cetogene"
    },
    {
        "id": 3,
        "code": "VEGAN",
        "label": "Cetogene"
    }
]

export const profilesData: Profile[] = [
    {
        id: 1,
        user_id: 1,
        name: "Doe",
        surname: "John",
        sexe: sexeData[0],
        height: 182,
        weight: 88,
        created_at: new Date("10/01/2022"),
        birth: new Date("11/17/1998"),
        food_preference: foodPreferenceData[0]
    },
    {
        id: 2,
        user_id: 2,
        name: "Johnson",
        surname: "Boris",
        sexe: sexeData[0],
        height: 170,
        weight: 65,
        created_at: new Date("05/09/2022"),
        birth: new Date("05/06/2001"),
        food_preference: foodPreferenceData[1]
    },
    {
        id: 3,
        user_id: 3,
        name: "Kris",
        surname: "Sylvie",
        sexe: sexeData[1],
        height: 160,
        weight: 70,
        created_at: new Date("07/25/2022"),
        birth: new Date("04/20/1985"),
        food_preference: foodPreferenceData[2]
    }
]

/** FOOD **/
export const alimentsFamilyData: Parameter[] = [
    {
        id: 1,
        label: "Family 1",
        code: "FAM1"
    },
    {
        id: 2,
        label: "Family 2",
        code: "FAM2"
    },
    {
        id: 3,
        label: "Family 3",
        code: "FAM3"
    }
]

export const mealType: MealType[] = [
    {
        id: 1,
        code: "MT1",
        label: "Breakfast"
    },
    {
        id: 2,
        code: "MT2",
        label: "Lunch"
    },
    {
        id: 3,
        code: "MT3",
        label: "Diner"
    },
    {
        id: 4,
        code: "MT4",
        label: "Snack"
    }
]

/** STATS & GRAPHS **/

export const dataWeightGraph = [
    {
        name: 'Janvier',
        kg: 82,
    },
    {
        name: 'Fevrier',
        kg: 85,
    },
    {
        name: 'Mars',
        kg: 90,
    },
    {
        name: 'Avril',
        kg: 95,
    },
    {
        name: 'Mai',
        kg: 92,
    },
    {
        name: 'Juin',
        kg: 88,
    },
    {
        name: 'Juillet',
        kg: 85,
    },
]

export const dataNutrimentsGraph = [
    {
        subject: 'Math',
        A: 120,
        B: 110,
        fullMark: 150,
    },
    {
        subject: 'Chinese',
        A: 98,
        B: 130,
        fullMark: 150,
    },
    {
        subject: 'English',
        A: 86,
        B: 130,
        fullMark: 150,
    },
    {
        subject: 'Geography',
        A: 99,
        B: 100,
        fullMark: 150,
    },
    {
        subject: 'Physics',
        A: 85,
        B: 90,
        fullMark: 150,
    },
    {
        subject: 'History',
        A: 65,
        B: 85,
        fullMark: 150,
    },
]

export const data01 = [
    {name: 'Group A', value: 400},
    {name: 'Group B', value: 300},
    {name: 'Group C', value: 300},
    {name: 'Group D', value: 200},
    {name: 'Group E', value: 278},
    {name: 'Group F', value: 189},
]

export const data02 = [
    {name: 'Group A', value: 2400},
    {name: 'Group B', value: 4567},
    {name: 'Group C', value: 1398},
    {name: 'Group D', value: 9800},
    {name: 'Group E', value: 3908},
    {name: 'Group F', value: 4800},
]

export const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
]