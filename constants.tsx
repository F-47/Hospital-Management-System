import { Folder, HelpCircle, Home, Mail, Settings } from "lucide-react";
import { SideNavItem } from "./types/index";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/",
    iconPath: "/icons/home.png",
  },
  {
    title: "Patients",
    path: "/patients",
    iconPath: "/icons/patient.png",
  },
  {
    title: "Doctors",
    path: "/doctors",
    iconPath: "/icons/doctor.png",
  },
  {
    title: "Rooms",
    path: "/rooms",
    iconPath: "/icons/room.png",
  },
  {
    title: "Nurses",
    path: "/nurses",
    iconPath: "/icons/nurse.png",
  },
  {
    title: "Wardboys",
    path: "/wardboys",
    iconPath: "/icons/cleaner.png",
  },
  {
    title: "Treatment",
    path: "/treatments",
    iconPath: "/icons/medical.png",
  },
  {
    title: "Numbers",
    path: "/numbers",
    iconPath: "/icons/phone.png",
  },
  {
    title: "Bills",
    path: "/bills",
    iconPath: "/icons/bill.png",
  },
];
