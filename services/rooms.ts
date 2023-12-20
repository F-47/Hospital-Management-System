import { adminAPI } from "./axios";

export type BaseRoom = {
  Number: string;
  Type: string;
  WardboyID: number;
  Wardboy: {
    ID: number;
    Name: string;
  };
};

export type GetRoom = BaseRoom & {
  ID: number;
};

// Get Requests for Rooms

export async function getRooms() {
  const response = await adminAPI.get<GetRoom[]>(`/rooms`);
  return response.data;
}

export async function getRoom(id: number) {
  const response = await adminAPI.get<GetRoom>(`/rooms/${id}`);
  return response.data;
}

// Post Requests for Rooms

export async function createRoom(data: BaseRoom) {
  const response = await adminAPI.post<GetRoom>(`/rooms`, data);
  return response.data;
}

// Update Requests for Rooms

export async function updateRoom(id: number, data: BaseRoom) {
  const response = await adminAPI.put<GetRoom>(`/rooms/${id}`, data);
  return response.data;
}

// Delete Requests for Rooms

export async function deleteRoom(id: number) {
  const response = await adminAPI.delete<GetRoom>(`/rooms/${id}`);
  return response.data;
}
