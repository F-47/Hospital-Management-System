import { adminAPI } from "./axios";

export type BaseDoctor = {
  Name: string;
  Number: string;
  Email: string;
  Specialization: string;
};

export type GetDoctor = BaseDoctor & {
  ID: number;
};

export type PostDoctor = BaseDoctor;

// Get Requests for Doctors

export async function getDoctors() {
  const response = await adminAPI.get<GetDoctor[]>(`/doctors`);
  return response.data;
}

export async function getDoctor(id: number) {
  const response = await adminAPI.get<GetDoctor>(`/doctors/${id}`);
  return response.data;
}

// Post Requests for Doctors

export async function createDoctor(data: BaseDoctor) {
  const response = await adminAPI.post<PostDoctor>(`/doctors`, data);
  return response.data;
}

// Update Requests for Doctors

export async function updateDoctor(id: number, data: BaseDoctor) {
  const response = await adminAPI.put<GetDoctor>(`/doctors/${id}`, data);
  return response.data;
}

// Delete Requests for Doctors

export async function deleteDoctor(id: number) {
  const response = await adminAPI.delete<GetDoctor>(`/doctors/${id}`);
  return response.data;
}
