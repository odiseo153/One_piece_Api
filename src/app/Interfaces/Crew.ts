export interface Crew {
    id: number;
    name: string;
    description: string | null; // Puede ser nulo
    status: string;
    number: string;
    roman_name: string;
    total_prime: string;
    is_yonko: boolean;
  }