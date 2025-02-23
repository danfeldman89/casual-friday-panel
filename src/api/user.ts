import { User } from "../types/types.tsx";

const BASE_URL_USERS = "http://localhost:200/api/users";

export async function getUsersApi(): Promise<Response> {
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

export async function getUserByIdApi(userId: string): Promise<Response> {
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

export async function createUserApi(user: User): Promise<Response> {
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

export async function updateUserApi(user: User): Promise<Response> {
  const url = `${BASE_URL_USERS}/${user.id}`;
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

export async function deleteUserApi(userId: string): Promise<Response> {
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
