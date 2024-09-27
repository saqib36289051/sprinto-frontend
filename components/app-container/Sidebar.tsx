"use client";
import Projects from "@/app/(app-container)/projects/page";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

const Sidebar = (props: Props) => {
  const pathName = usePathname();
  const selectedPath = pathName.split("/")[1];
  console.log("🚀 ~ Sidebar ~ selectedPath:", selectedPath)

  const paths = [
    {
      href: "/projects",
      label: "Projects",
      page: "projects",
    },
    {
      href: "/settings",
      label: "Settings",
      page: "settings",
    },
  ];
  return (
    <aside className="p-10 w-[20rem] shadow bg-white mr-8">
      <ul className="space-y-2 font-medium">
        {paths.map((link, index) => {
          return (
            <li key={index}>
              <Link
                href={link.href}
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  selectedPath === link.page ? "active-link " : ""
                }`}
              >
                <span className="ms-3">{link.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
