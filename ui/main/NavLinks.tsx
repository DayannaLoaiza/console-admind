"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Cell } from "@/components/svg/Cell";
import { Stackoverflow } from "@/components/svg/Stackoverflow";

const links = [
  {
    name: "Gestión",
    href: "/management",
    icon: <Cell width={24} height={24} />,
  },
  {
    name: "Registros de transición",
    href: "/transitionLogs",
    icon: <Stackoverflow width={24} height={24} />,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-full px-2 py-2 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-5",
              {
                "bg-blue-200 text-blue-600": pathname === link.href,
              }
            )}
          >
            {link.icon}
            <p className="hidden md:block text-sm">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
