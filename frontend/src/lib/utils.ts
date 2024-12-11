import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { TaskResponse } from "@/types/task";
import { AxiosError } from 'axios';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Wrapper for API calls
export const handleApiCall = async (apiCall: () => Promise<TaskResponse>) => {
  try {
    const response = await apiCall();
    return { data: response.data, error: null };
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    const errorMessage = (axiosError.response?.data as { message: string })?.message || 'An unexpected error occurred';
    return { data: null as null, error: errorMessage };
  }
};