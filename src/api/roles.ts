import { Permission, Role } from "../types/types.tsx";

const BASE_URL_ROLES = "http://localhost:200/api/roles";

function getAuthToken(): string | null {
  return localStorage.getItem("authToken");
}

export async function getRoles(): Promise<Response> {
  return fetch(BASE_URL_ROLES, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getAuthToken()}`
    }
  });
}

export async function getRoleById(roleId: string): Promise<Response> {
  const url = `${BASE_URL_ROLES}/${roleId}`;
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getAuthToken()}`
    }
  });
}

export async function createRole(role: {
  name: string;
  description: string;
  permissions: Permission[];
}): Promise<Response> {
  return fetch(BASE_URL_ROLES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getAuthToken()}`
    },
    body: JSON.stringify(role)
  });
}

export async function updateRole(
  roleId: string,
  updatedData: Role): Promise<Response> {
  const url = `${BASE_URL_ROLES}/${roleId}`;
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getAuthToken()}`
    },
    body: JSON.stringify(updatedData)
  });
}

export async function deleteRole(roleId: string): Promise<Response> {
  const url = `${BASE_URL_ROLES}/${roleId}`;
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getAuthToken()}`
    }
  });
}
