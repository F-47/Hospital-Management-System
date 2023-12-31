"use server";

import { revalidatePath } from "next/cache";
import { adminAPI } from "./axios";
import { BasePatient, GetPatient } from "./patients";
import { BaseDoctor } from "./doctors";

export async function CreatePatient(data: BasePatient) {
  const res = await adminAPI.post(`/patients`, data);
  if (res.status === 200) {
    revalidatePath("/patients");
    return { success: true, message: res?.data?.message };
  } else {
    return { success: false, message: res?.data?.message };
  }
}

export async function UpdatePatient(id: number, data: BasePatient) {
  const res = await adminAPI.put(`/patients/${id}`, data);
  if (res.status === 200) {
    revalidatePath("/patients");
    return { success: true, message: res?.data?.message };
  } else {
    return { success: false, message: res?.data?.message };
  }
}

export async function DeletePatient(id: number) {
  const res = await adminAPI.delete(`/patients/${id}`);
  if (res.status === 200) {
    revalidatePath("/patients");
    return { success: true, message: res?.data?.message };
  } else {
    return { success: false, message: res?.data?.message };
  }
}

export async function CreateDoctor(data: BaseDoctor) {
  const res = await adminAPI.post(`/doctors`, data);
  if (res.status === 200) {
    revalidatePath("/doctors");
    return { success: true, message: res?.data?.message };
  } else {
    return { success: false, message: res?.data?.message };
  }
}

export async function UpdateDoctor(id: number, data: BaseDoctor) {
  const res = await adminAPI.put(`/doctors/${id}`, data);
  if (res.status === 200) {
    revalidatePath("/doctors");
    return { success: true, message: res?.data?.message };
  } else {
    return { success: false, message: res?.data?.message };
  }
}

export async function DeleteDoctor(id: number) {
  const res = await adminAPI.delete(`/doctors/${id}`);
  if (res.status === 200) {
    revalidatePath("/doctors");
    return { success: true, message: res?.data?.message };
  } else {
    return { success: false, message: res?.data?.message };
  }
}
