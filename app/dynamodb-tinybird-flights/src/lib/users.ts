import { StaticImageData } from "next/image";
import avatar1Image from "./assets/avatar_1.jpg";
import avatar2Image from "./assets/avatar_2.jpg";
import avatar3Image from "./assets/avatar_3.jpg";

export type User = {
  passport_number: number;
  name: string;
  surname: string;
  meal_choice: string;
  age: number;
  email: string;
  role: string;
  company: string;
  avatar: StaticImageData;
  phone_number: string;
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
    avatar: avatar1Image,
    phone_number: "100000000000",
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
    avatar: avatar2Image,
    phone_number: "200000000000",
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
    avatar: avatar3Image,
    phone_number: "300000000000",
  },
];
