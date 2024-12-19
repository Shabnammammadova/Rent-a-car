import { clsx, type ClassValue } from "clsx"
import moment from "moment"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatPrice(price: number) {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  })
}

export function formatDate(date: string) {
  return moment(date).format("DD/MM/YYYY")
}

export function calculateDateDifference(startDate: Date | string, endDate: Date | string) {
  const start = moment(startDate);
  const end = moment(endDate);
  return end.diff(start, "days")
}