import { Permission } from "../types/types.tsx";

const BASE_URL_PERMISSIONS = "http://localhost:200/api/permissions";

function getAuthToken(): string | null {
  return localStorage.getItem("authToken");
}

export async function getPermissions(): Promise<Response> {
  const token = getAuthToken();
  return fetch(BASE_URL_PERMISSIONS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : ""
    }
  });
}

export async function getPermissionById(permissionId: string): Promise<Response> {
  const token = getAuthToken();
  const url = `${BASE_URL_PERMISSIONS}/${permissionId}`;
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : ""
    }
  });
}

export async function createPermission(permission: Permission): Promise<Response> {
  const token = getAuthToken();
  return fetch(BASE_URL_PERMISSIONS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : ""
    },
    body: JSON.stringify(permission)
  });
}

export async function updatePermission(
  permissionId: string,
  updatedData: Permission): Promise<Response> {
  const token = getAuthToken();
  const url = `${BASE_URL_PERMISSIONS}/${permissionId}`;
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : ""
    },
    body: JSON.stringify(updatedData)
  });
}

export async function deletePermission(permissionId: string): Promise<Response> {
  const token = getAuthToken();
  const url = `${BASE_URL_PERMISSIONS}/${permissionId}`;
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : ""
    }
  });
}
