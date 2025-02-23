import { Booster } from "../types/types.tsx";

const BASE_URL_BOOSTERS = "http://localhost:200/api/catalogs/boosters";

function getAuthToken(): string | null {
  return localStorage.getItem("authToken");
}

export async function getBoostersApi(): Promise<Response> {
  return fetch(BASE_URL_BOOSTERS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getAuthToken()}`
    }
  });
}

export async function getBoosterByIdApi(boosterId: string): Promise<Response> {
  const url = `${BASE_URL_BOOSTERS}/${boosterId}`;
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getAuthToken()}`
    }
  });
}

export async function createBoosterApi(booster: Booster, catalogId: string | undefined): Promise<Response> {
  if (!catalogId) {
    throw new Error("Index is required to create a booster.");
  }

  return fetch(`${BASE_URL_BOOSTERS}/${catalogId}/boosters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getAuthToken()}`
    },
    body: JSON.stringify(booster)
  });
}

export async function updateBoosterApi(booster: Booster, index: number): Promise<Response> {
  const url = `${BASE_URL_BOOSTERS}/${boosterId}`;
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getAuthToken()}`
    },
    body: JSON.stringify(booster)
  });
}

//TODO
export async function deleteBoosterApi(boosterIndex: string | undefined,
                                       catalogId: string | undefined): Promise<Response> {
  if (!boosterIndex || !catalogId) throw new Error("boosterIndex and catalogId are required to delete a booster.");

  const url = `${BASE_URL_BOOSTERS}/${catalogId}/boosters/${boosterIndex}`;
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getAuthToken()}`
    }
  });
}
