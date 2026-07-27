import axios from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response?.data) {
      const data = error.response.data;

      if (typeof data === "string" && data.trim().length > 0) {
        return data;
      }

      if (typeof data === "object") {
        if (data.message) return data.message;
        if (data.error) return data.error;
        if (data.title) return data.title;
      }
    }

    if (error.response?.status === 401) {
      return "Invalid username or password. Please try again.";
    }

    if (error.response?.status === 400) {
      return "Invalid request payload. Please check your inputs.";
    }

    if (error.response?.status === 409) {
      return "An account with these credentials already exists.";
    }

    if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
      return "Unable to connect to server. Please check your network or backend connection.";
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred. Please try again.";
};
