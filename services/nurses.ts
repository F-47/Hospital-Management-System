import { adminAPI } from "./axios";
import { GetPatient } from "./patients";

export type BaseNurse = {
  Name: string;
  Patients: GetPatient[];
};

export type GetNurse = BaseNurse & {
  ID: number;
};

// Get Requests for Nurses

export async function getNurses() {
  const response = await adminAPI.get<GetNurse[]>(`/nurses`);
  return response.data;
}

export async function getNurse(id: number) {
  const response = await adminAPI.get<GetNurse>(`/nurses/${id}`);
  return response.data;
}

// Post Requests for Nurses

export async function createNurse(data: BaseNurse) {
  const response = await adminAPI.post<GetNurse>(`/nurses`, data);
  return response.data;
}

// Update Requests for Nurses

export async function updateNurse(id: number, data: BaseNurse) {
  const response = await adminAPI.put<GetNurse>(`/nurses/${id}`, data);
  return response.data;
}

// Delete Requests for Nurses

export async function deleteNurse(id: number) {
  const response = await adminAPI.delete<GetNurse>(`/nurses/${id}`);
  return response.data;
}
