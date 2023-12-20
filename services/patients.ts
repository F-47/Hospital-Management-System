import { adminAPI } from "./axios";

export type BasePatient = {
  Name: string;
  BirthDate: string;
  Address: string;
  Disease: string;
  StartDate: string;
  DoctorID: number;
  RoomID: number;
  TreatmentID: number;
};

export type GetPatient = BasePatient & {
  ID: number;
  Doctor: {
    ID: number;
    Name: string;
  };
  Room: {
    ID: number;
    Number: string;
    Type: string;
    WardboyID: number;
    Wardboy: null;
  };
  Treatment: null;
  Numbers: {
    FamilyNumber: string;
    PatientNumber: string;
  };
  Nurses: {
    ID: number;
    Number: string;
  }[];
};

export type PostPatient = BasePatient & {
  Numbers: {
    FamilyNumber: string;
    PatientNumber: string;
  };
  Nurses: Array<String>;
};

// Get Requests for Patients

export async function getPatients() {
  const response = await adminAPI.get<GetPatient[]>(`/patients`);
  return response.data;
}

export async function getPatient(id: number) {
  const response = await adminAPI.get<GetPatient>(`/patients/${id}`);
  return response.data;
}

// Post Requests for Patients

export async function createPatient(data: BasePatient) {
  const response = await adminAPI.post<GetPatient>(`/patients`, data);
  return response.data;
}

// Update Requests for Patients

export async function updatePatient(id: number, data: BasePatient) {
  const response = await adminAPI.put<GetPatient>(`/patients/${id}`, data);
  return response.data;
}

// Delete Requests for Patients

export async function deletePatient(id: number) {
  const response = await adminAPI.delete<GetPatient>(`/patients/${id}`);
  return response.data;
}
