import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateAddr(
  str: string | undefined,
  n: number = 6
): string | undefined {
  if (!str) return "undefined";
  return str?.length > n
    ? str.slice(0, n) + "..." + str.slice(str.length - 4)
    : str;
}

export function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  if (diff < 60 * 1000) return `${Math.floor(diff / 1000)}s ago`;
  if (diff < 60 * 60 * 1000) return `${Math.floor(diff / (60 * 1000))}m ago`;
  if (diff < 24 * 60 * 60 * 1000)
    return `${Math.floor(diff / (60 * 60 * 1000))}h ago`;

  return `${Math.floor(diff / (24 * 60 * 60 * 1000))}d ago`;
}

export function generateRandomId(): number {
  return Math.floor(Math.random() * Date.now());
}

export function handleErrorMessage(error: any) {
  if (error.code === "ACTION_REJECTED") {
    throw new Error("Transaction rejected by user");
  } else if (error.code === "INSUFFICIENT_FUNDS") {
    throw new Error("Insufficient funds for gas");
  } else if (error.code === "UNPREDICTABLE_GAS_LIMIT") {
    throw new Error("Transaction may fail");
  }
}
