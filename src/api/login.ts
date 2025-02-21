import { UserAuth } from "../types/types.tsx";

interface AuthApiPayload {
  username: string;
  password: string;
}

const BASE_URL = 'http://localhost:200/api';

export async function login(loginPayload: AuthApiPayload): Promise<UserAuth> {
  const url = `${BASE_URL}/Auth/login`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginPayload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Authentication failed');
    }

    return response.json();
  } catch (error) {
    console.error('Error during authentication API request:', error);
    throw error;
  }
}
