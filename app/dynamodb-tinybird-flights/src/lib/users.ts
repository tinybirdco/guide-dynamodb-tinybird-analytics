export type User = {
  passport_number: number;
  name: string;
  surname: string;
  meal_choice: string;
  age: number;
  email: string;
  role: string;
  company: string;
};

export const users: User[] = [
  {
    passport_number: 9605645,
    name: "Dan",
    surname: "Chaffelson",
    meal_choice: "vegetarian",
    age: 72,
    email: "dan@tinybird.email",
    role: "member",
    company: "Tinybird",
  },
  {
    passport_number: 9234523,
    name: "Rafa",
    surname: "Moreno",
    meal_choice: "halal",
    age: 34,
    email: "rafa@tinybird.email",
    role: "member",
    company: "Tinybird",
  },
  {
    passport_number: 9782364,
    name: "Gonzalo",
    surname: "Gomez",
    meal_choice: "none",
    age: 21,
    email: "gonzalo@tinybird.email",
    role: "admin",
    company: "Tinybird",
  },
];
