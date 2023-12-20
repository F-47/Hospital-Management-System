import { adminAPI } from "./axios";

export type BaseTreatment = {
  Type: string;
};

export type GetTreatment = BaseTreatment & {
  ID: number;
};

// Get Requests for Treatments

export async function getTreatments() {
  const response = await adminAPI.get<GetTreatment[]>(`/treatments`);
  return response.data;
}

export async function getTreatment(id: number) {
  const response = await adminAPI.get<GetTreatment>(`/treatments/${id}`);
  return response.data;
}

// Post Requests for Treatments

export async function createTreatment(data: BaseTreatment) {
  const response = await adminAPI.post<GetTreatment>(`/treatments`, data);
  return response.data;
}

// Update Requests for Treatments

export async function updateTreatment(id: number, data: BaseTreatment) {
  const response = await adminAPI.put<GetTreatment>(`/treatments/${id}`, data);
  return response.data;
}

// Delete Requests for Treatments

export async function deleteTreatment(id: number) {
  const response = await adminAPI.delete<GetTreatment>(`/treatments/${id}`);
  return response.data;
}
