import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(str?: string) {
  return str?.toLowerCase().replace(/(^|\s)\S/g, (char) => char.toUpperCase());
}