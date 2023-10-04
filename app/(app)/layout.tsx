"use client";

import {
  IconCalendar,
  IconClockCircle,
  IconCoffee,
  IconRocket,
  IconSetting,
  IconUser,
} from "@taskbrew/components/icons";
import { SignOutButton } from "@taskbrew/components/sign-out-button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ROUTES = [
  {
    name: "Today",
    path: "/today",
    icon: <IconRocket className="h-6 w-6" />,
  },
  {
    name: "Upcoming",
    path: "/upcoming",
    icon: <IconClockCircle className="h-6 w-6" />,
  },
  {
    name: "Calendar",
    path: "/calendar",
    icon: <IconCalendar className="h-6 w-6" />,
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const session = useSession();

  return (
    <div className="flex">
      {/* sidebar */}
      <div className="h-screen p-4">
        <div className="flex h-full flex-col justify-between rounded-2xl bg-gray-200 p-4 md:w-64">
          <div className="space-y-2 overflow-scroll">
            <Link
              href="/today"
              className="flex items-center justify-center gap-2 md:justify-start"
            >
              {/* make coffee icon transition between smaller and larger screens */}
              <IconCoffee className="h-6 w-6" />
              <h2 className="hidden text-xl font-medium leading-none md:inline">
                Taskbrew
              </h2>
            </Link>
            <h4 className="text-xs font-bold">TASKS</h4>
            <ul className="font-light">
              {ROUTES.map((route) => (
                <li key={route.path}>
                  <Link
                    className={`flex flex-row items-center justify-center gap-2 rounded-md p-2 transition-colors hover:bg-gray-300 active:bg-gray-400 md:justify-start ${
                      pathname === route.path && "bg-gray-300"
                    }`}
                    href={route.path}
                  >
                    {route.icon}
                    <p className="hidden md:block">{route.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t-[1px] border-gray-300 pt-2">
            {session.status === "authenticated" && session.data.user && (
              <button className="flex w-full flex-row items-center justify-center gap-2 rounded-md p-2 font-light transition-colors hover:bg-gray-300 active:bg-gray-400 md:justify-start">
                {session.data.user.image ? (
                  <Image
                    className="h-6 w-6 rounded-full"
                    width={24}
                    height={24}
                    src={session.data.user.image}
                    alt="Profile picture"
                  />
                ) : (
                  <IconUser className="h-6 w-6" />
                )}
                <p className="hidden md:block">Account</p>
              </button>
            )}
            <button className="flex w-full flex-row items-center justify-center gap-2 rounded-md p-2 font-light transition-colors hover:bg-gray-300 active:bg-gray-400 md:justify-start">
              <IconSetting className="h-6 w-6" />
              <p className="hidden md:block">Settings</p>
            </button>
            <SignOutButton />
          </div>
        </div>
      </div>

      {/* page */}
      <div className="h-screen w-full overflow-scroll pt-4">{children}</div>
    </div>
  );
}
