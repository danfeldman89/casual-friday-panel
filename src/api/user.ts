import { User } from "../types/types.tsx";

const BASE_URL_USERS = "http://localhost:200/api/users"; // Replace with your actual API base URL

export async function getUsers(): Promise<Response> {
  const url = `${BASE_URL_USERS}`;
  const token = localStorage.getItem("authToken");

  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
}

export async function getUserById(userId: string): Promise<Response> {
  const url = `${BASE_URL_USERS}/${userId}`;
  const token = localStorage.getItem("authToken");

  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
}

export async function createUser(user: User): Promise<Response> {
  const token = localStorage.getItem("authToken");

  return fetch(BASE_URL_USERS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(user)
  });
}

export async function updateUser(userId: string, user: User): Promise<Response> {
  const url = `${BASE_URL_USERS}/${userId}`;
  const token = localStorage.getItem("authToken");

  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(user)
  });
}

export async function deleteUser(userId: string): Promise<Response> {
  const url = `${BASE_URL_USERS}/${userId}`;
  const token = localStorage.getItem("authToken");

  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
}
