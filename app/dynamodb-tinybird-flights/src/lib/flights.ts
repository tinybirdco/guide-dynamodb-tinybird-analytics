export type Flight = {
  airline: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
};

export function generateRandomFlights(count: number): Flight[] {
  const airlines = [
    "American Airlines",
    "Delta Air Lines",
    "United Airlines",
    "Southwest Airlines",
    "British Airways",
    "Lufthansa",
    "Emirates",
    "Qatar Airways",
    "Singapore Airlines",
    "Air France",
    "KLM Royal Dutch Airlines",
    "Cathay Pacific",
    "Japan Airlines",
    "Turkish Airlines",
    "Qantas Airways",
    "Ethiopian Airlines",
    "Ryanair",
    "EasyJet",
    "JetBlue Airways",
    "Alaska Airlines",
  ];
  const minPrice = 50;
  const maxPrice = 1000;

  function getRandomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getRandomTime(): string {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }

  function calculateDuration(departure: string, arrival: string): string {
    const [depHours, depMinutes] = departure.split(":").map(Number);
    const [arrHours, arrMinutes] = arrival.split(":").map(Number);

    let durationHours = arrHours - depHours;
    let durationMinutes = arrMinutes - depMinutes;

    if (durationMinutes < 0) {
      durationMinutes += 60;
      durationHours -= 1;
    }

    if (durationHours < 0) {
      durationHours += 24;
    }

    return `${durationHours}h ${durationMinutes}min`;
  }

  function generateRandomFlight(): Flight {
    const departureTime = getRandomTime();
    let arrivalTime = getRandomTime();

    while (arrivalTime <= departureTime) {
      arrivalTime = getRandomTime();
    }

    const duration = calculateDuration(departureTime, arrivalTime);

    return {
      airline: getRandomElement(airlines),
      departureTime,
      arrivalTime,
      duration,
      price: Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice,
    };
  }

  return Array.from({ length: count }, generateRandomFlight);
}
