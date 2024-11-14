"use client";
import { useState } from "react";
import Link from "next/link";
import Logo from "../Logo";
import NavLinks from "./NavLinks";
import { Chevron } from "@/components/svg/Chevron";
import { Button } from "@/components/Button";

export default function SideNav() {
  const [view, setView] = useState<boolean>(true);
  return (
    <div
      className={`group relative p-3 ${
        !view && "border-r border-blue-200 h-full"
      }`}
    >
      {view && (
        <div className="flex h-full flex-col">
          <Link
            className="mb-4 flex h-[16%] items-center justify-start p-4 border-b-[1px] border-blue-400"
            href="/management"
          >
            <Logo />
          </Link>
          <div className="flex grow flex-col justify-between">
            <NavLinks />
            <div className="hidden h-auto w-full grow md:block"></div>
          </div>
        </div>
      )}
      <Button
        onClick={() => setView((prev) => !prev)}
        variant="destructive"
        className={`h-6 w-6 rounded-full absolute right-0 top-20 -translate-y-1/2 translate-x-1/2 transform bg-gray-100 p-1 text-black-800 shadow-md hover:bg-blue-400 hover:text-white-900
        ${
          view
            ? "opacity-0 group-hover:opacity-100 p-1"
            : "opacity-100 bg-blue-400 text-white-900"
        } transition-opacity duration-300
      `}
      >
        <Chevron direction={view ? "left" : "right"} width={16} height={16} />
      </Button>
    </div>
  );
}
