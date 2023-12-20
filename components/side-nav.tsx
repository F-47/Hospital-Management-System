"use client";

import React, { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SIDENAV_ITEMS } from "@/constants";
import { SideNavItem } from "@/types";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

const SideNav = () => {
  return (
    <div className="md:w-60 bg-white h-screen flex-1 fixed hidden md:flex">
      <div className="flex flex-col space-y-6 w-full">
        <Link
          href="/"
          className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b border-zinc-200 h-12 w-full"
        >
          <span className="h-7 w-7 bg-zinc-300 rounded-lg" />
          <span className="font-bold text-xl hidden md:flex">Logo</span>
        </Link>

        <div className="flex flex-col space-y-2  md:px-6 ">
          {SIDENAV_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();

  return (
    <Link
      href={item.path}
      className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-secondary ${
        item.path === pathname
          ? "bg-primary/50 text-white hover:bg-primary/50"
          : ""
      }`}
    >
      <Image src={item.iconPath} width="26" height="26" alt={item.title} />
      <span className="font-semibold text-lg flex">{item.title}</span>
    </Link>
  );
};
