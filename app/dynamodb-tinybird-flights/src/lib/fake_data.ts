import { faker } from '@faker-js/faker';
import { User, users } from './users';
import { Booking } from './bookings';

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

export const fakeData = function (now: boolean): Booking {
    let event_time: Date;
    if (now) {
        event_time = new Date();
    } else {
        event_time = faker.date.past();
    }
    const company = faker.company.name();
    const email = faker.internet.email();
    const transaction_id = faker.string.ulid({ refDate: event_time });
    const booking: Booking = {
        "PK": "COMPANY#" + company,
        "SK": "EMAIL#" + email + "#TXID#" + transaction_id,
        "company": company,
        "email": email,
        "transaction_id": transaction_id,
        "timestamp": event_time.toISOString(),
        "name": faker.person.fullName(),
        "age": faker.number.int({ min: 18, max: 99 }),
        "passport_number": faker.number.int({ min: 3456789, max: 9876543 }),
        "flight_from": faker.airline.airport().iataCode,
        "flight_to": faker.airline.airport().iataCode,
        "extra_bags": faker.helpers.weightedArrayElement(bagWeights),
        "priority_boarding": faker.datatype.boolean(),
        "meal_choice": faker.helpers.weightedArrayElement(mealWeights),
        "airline": faker.helpers.weightedArrayElement(airlineWeights),
        "cost": faker.number.int({ min: 100, max: 1000 }),
        "phone_number": faker.phone.number(),
        ...randomFlightTimes()
    }
    return booking;
}

export const fakeUserData = function (user: User, now: boolean): Booking {
    let event_time: Date;
    if (now) {
        event_time = new Date();
    } else {
        event_time = faker.date.past();
    }
    const transaction_id = faker.string.ulid({ refDate: event_time });
    const booking: Booking = {
        "PK": "COMPANY#" + user.company,
        "SK": "EMAIL#" + user.email + "#TXID#" + transaction_id,
        "company": user.company,
        "email": user.email,
        "transaction_id": transaction_id,
        "name": user.name,
        "timestamp": event_time.toISOString(),
        "age": user.age,
        "passport_number": user.passport_number,
        "flight_from": faker.airline.airport().iataCode,
        "flight_to": faker.airline.airport().iataCode,
        "extra_bags": faker.helpers.weightedArrayElement(bagWeights),
        "priority_boarding": faker.datatype.boolean(),
        "meal_choice": user.meal_choice,
        "airline": faker.helpers.weightedArrayElement(airlineWeights),
        "cost": faker.number.int({ min: 100, max: 1000 }),
        "phone_number": user.phone_number,
        ...randomFlightTimes()
    }
    return booking;
}

export const fakeCompanyData = function (now: boolean): Booking {
    let event_time: Date;
    if (now) {
        event_time = new Date();
    } else {
        event_time = faker.date.past();
    }
    const transaction_id = faker.string.ulid({ refDate: event_time });
    const user = faker.helpers.arrayElement(users);
    const booking: Booking = {
        "PK": "COMPANY#" + user.company,
        "SK": "EMAIL#" + user.email + "#TXID#" + transaction_id,
        "company": user.company,
        "email": user.email,
        "transaction_id": transaction_id,
        "name": user.name,
        "timestamp": event_time.toISOString(),
        "age": user.age,
        "passport_number": user.passport_number,
        "flight_from": faker.airline.airport().iataCode,
        "flight_to": faker.airline.airport().iataCode,
        "extra_bags": faker.helpers.weightedArrayElement(bagWeights),
        "priority_boarding": faker.datatype.boolean(),
        "meal_choice": user.meal_choice,
        "airline": faker.helpers.weightedArrayElement(airlineWeights),
        "cost": faker.number.int({ min: 100, max: 1000 }),
        "phone_number": user.phone_number,
        ...randomFlightTimes()
    }
    return booking;
}

function randomFlightTimes() {
    const departure = faker.date.soon();
    const arrival = faker.date.soon({ days: 1, refDate: departure });
    return {
        departure_time: formatTime(departure),
        arrival_time: formatTime(arrival),
        duration: calculateDuration(departure, arrival)
    }
}

function calculateDuration(departure: Date, arrival: Date): string {
    const duration = arrival.getTime() - departure.getTime();
    const durationHours = Math.floor(duration / (1000 * 60 * 60));
    const durationMinutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

    return `${durationHours}h ${durationMinutes}min`;
}

function formatTime(time: Date): string {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
}