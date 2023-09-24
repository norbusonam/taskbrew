"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ROUTES = [
  {
    name: "Today",
    path: "/today",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
        />
      </svg>
    ),
  },
  {
    name: "Upcoming",
    path: "/upcoming",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
        />
      </svg>
    ),
  },
  {
    name: "Calendar",
    path: "/calendar",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
        />
      </svg>
    ),
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex">
      {/* sidebar */}
      <div className="w-56 bg-gray-200 rounded-2xl m-4 p-4">
        <h2 className="text-xl font-bold">Menu</h2>
        <h4 className="text-xs font-bold py-2">TASKS</h4>
        <ul className="font-light">
          {ROUTES.map((route) => (
            <li key={route.path}>
              <Link
                className={`hover:bg-gray-300 transition-colors rounded-md py-1 px-2 active:bg-gray-400 flex flex-row gap-2 items-center ${
                  pathname === route.path && "bg-gray-300"
                }`}
                href={route.path}
              >
                {route.icon}
                <p>{route.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* page */}
      {children}
    </div>
  );
}
