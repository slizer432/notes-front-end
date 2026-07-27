import axios from "axios";

const authClient = axios.create({
  baseURL: "http://localhost:5164",
});

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  email: string;
}

export interface AuthResponse {
  token: string;
  message?: string;
}

export const loginUser = async ({ username, password }: LoginRequest) => {
  const response = await authClient.post<AuthResponse>("/auth/login", {
    username,
    password,
  });

  return response.data;
};

export const registerUser = async ({
  username,
  email,
  password,
}: RegisterRequest) => {
  const response = await authClient.post("/auth/register", {
    username,
    email,
    password,
  });

  return response.data;
};
