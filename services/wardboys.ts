import { adminAPI } from "./axios";

export type BaseWardboy = {
  Name: string;
};

export type GetWardboy = BaseWardboy & {
  ID: number;
};

// Get Requests for Wardboys

export async function getWardboys() {
  const response = await adminAPI.get<GetWardboy[]>(`/Wardboy`);
  return response.data;
}

export async function getWardboy(id: number) {
  const response = await adminAPI.get<GetWardboy>(`/Wardboy/${id}`);
  return response.data;
}

// Post Requests for Wardboys

export async function createWardboy(data: BaseWardboy) {
  const response = await adminAPI.post<GetWardboy>(`/Wardboy`, data);
  return response.data;
}

// Update Requests for Wardboys

export async function updateWardboy(id: number, data: BaseWardboy) {
  const response = await adminAPI.put<GetWardboy>(`/Wardboy/${id}`, data);
  return response.data;
}

// Delete Requests for Wardboys

export async function deleteWardboy(id: number) {
  const response = await adminAPI.delete<GetWardboy>(`/Wardboy/${id}`);
  return response.data;
}
