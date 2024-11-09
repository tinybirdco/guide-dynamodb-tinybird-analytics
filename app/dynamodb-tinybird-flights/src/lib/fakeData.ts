import { faker } from '@faker-js/faker';

export const users = [
    {
        passport_number: 9782364,
        name: "Gonzalo Gomez",
        meal_choice: "none",
        age: 21,
        email: "gonzalo@tinybird.email",
        role: "admin",
        company: "Tinybird"
    },
    {
        passport_number: 9605645,
        name: "Dan Chaffelson",
        meal_choice: "vegetarian",
        age: 72,
        email: "dan@tinybird.email",
        role: "member",
        company: "Tinybird"
    },
    {
        passport_number: 9234523,
        name: "Rafa Moreno",
        meal_choice: "halal",
        age: 34,
        email: "rafa@tinybird.email",
        role: "member",
        company: "Tinybird"
    }
]

const bagWeights = [
    { weight: 45, value: 0 },
    { weight: 35, value: 1 },
    { weight: 10, value: 2 },
    { weight: 4, value: 3 },
    { weight: 2, value: 4 },
    { weight: 1, value: 5 },
    { weight: 1, value: 6 },
    { weight: 1, value: 7 },
    { weight: 1, value: 8 },
    { weight: 1, value: 9 },
];

const mealWeights = [
    { weight: 60, value: "none" },
    { weight: 5, value: "vegan" },
    { weight: 10, value: "vegetarian" },
    { weight: 10, value: "halal" },
    { weight: 10, value: "kosher" },
    { weight: 5, value: "gluten" },
];

const airlineWeights = [
    { weight: 20, value: "BrianAir" },
    { weight: 5, value: "Fizz" },
    { weight: 15, value: "EasyPlane" },
    { weight: 20, value: "Skittish Airways" },
    { weight: 15, value: "GAS" },
    { weight: 10, value: "Ler Dingus" },
    { weight: 15, value: "Red Balloon" },
];

export const fakeData = function (user_id?: number) {
    if (user_id) {
        const event_time = new Date().toISOString();
        const transaction_id = faker.string.ulid({ refDate: event_time });
        return {
            "PK": "COMPANY#" + users[user_id - 1].company,
            "SK": "EMAIL#" + users[user_id - 1].email + "#TXID#" + transaction_id,
            "company": users[user_id - 1].company,
            "email": users[user_id - 1].email,
            "transaction_id": transaction_id,
            "name": users[user_id - 1].name,
            "timestamp": event_time,
            "age": users[user_id - 1].age,
            "passport_number": users[user_id - 1].passport_number,
            "flight_from": faker.airline.airport().iataCode,
            "flight_to": faker.airline.airport().iataCode,
            "extra_bags": faker.helpers.weightedArrayElement(bagWeights),
            "priority_boarding": faker.datatype.boolean(),
            "meal_choice": users[user_id - 1].meal_choice,
            "airline": faker.helpers.weightedArrayElement(airlineWeights),
            "cost": faker.number.int({ min: 100, max: 1000 })
        }
    } else {
        const event_time = faker.date.recent({ days: 30 });
        const company = faker.company.name();
        const email = faker.internet.email();
        const transaction_id = faker.string.ulid({ refDate: event_time });
        return {
            "PK": "COMPANY#" + company,
            "SK": "EMAIL#" + email + "#TXID#" + transaction_id,
            "company": company,
            "email": email,
            "transaction_id": transaction_id,
            "timestamp": event_time,
            "name": faker.person.fullName(),
            "age": faker.number.int({ min: 18, max: 99 }),
            "passport_number": faker.number.int({ min: 3456789, max: 9876543 }),
            "flight_from": faker.airline.airport().iataCode,
            "flight_to": faker.airline.airport().iataCode,
            "extra_bags": faker.helpers.weightedArrayElement(bagWeights),
            "priority_boarding": faker.datatype.boolean(),
            "meal_choice": faker.helpers.weightedArrayElement(mealWeights),
            "airline": faker.helpers.weightedArrayElement(airlineWeights),
            "cost": faker.number.int({ min: 100, max: 1000 })
        }
    }
}
