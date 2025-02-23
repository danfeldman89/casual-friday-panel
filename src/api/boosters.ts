import { Booster } from "../types/types.tsx";

const BASE_URL_BOOSTERS = "http://localhost:200/api/catalogs/boosters";

function getAuthToken(): string | null {
  return localStorage.getItem("authToken");
}

export async function getBoosters(): Promise<Response> {
  return fetch(BASE_URL_BOOSTERS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getAuthToken()}`
    }
  });
}

export async function getBoosterById(boosterId: string): Promise<Response> {
  const url = `${BASE_URL_BOOSTERS}/${boosterId}`;
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getAuthToken()}`
    }
  });
}

export async function createBooster(booster: {
  name: string;
  description: string;
  isActive: boolean;
}): Promise<Response> {
  return fetch(BASE_URL_BOOSTERS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getAuthToken()}`
    },
    body: JSON.stringify(booster)
  });
}

export async function updateBooster(
  boosterId: string,
  updatedData: Booster
): Promise<Response> {
  const url = `${BASE_URL_BOOSTERS}/${boosterId}`;
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getAuthToken()}`
    },
    body: JSON.stringify(updatedData)
  });
}

//TODO
export async function deleteBooster(boosterId: string): Promise<Response> {
  const url = `${BASE_URL_BOOSTERS}/${boosterId}`;
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getAuthToken()}`
    }
  });
}
