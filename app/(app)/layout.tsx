"use client";

import {
  IconCalendar,
  IconCoffee,
  IconHome,
  IconProject,
  IconSetting,
  IconUnorderedList,
  IconUser,
} from "@taskbrew/components/icons";
import { SidebarButton } from "@taskbrew/components/sidebar-button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const session = useSession();
  const router = useRouter();

  return (
    <div className="flex">
      {/* sidebar */}
      <div className="h-screen p-4">
        <div className="flex h-full flex-col justify-between rounded-2xl bg-gray-200 p-4 md:w-64">
          <div className="space-y-2 overflow-scroll text-center md:text-left">
            <Link
              href="/home"
              className="mb-4 inline-block space-x-2 transition-opacity hover:opacity-50"
            >
              <IconCoffee className="inline h-6 w-6" />
              <h2 className="hidden align-bottom text-xl font-medium leading-none md:inline">
                Taskbrew
              </h2>
            </Link>
            <div>
              <SidebarButton
                text="Home"
                icon={<IconHome className="h-6 w-6" />}
                active={pathname === "/home"}
                onClick={() => router.push("/home")}
              />
            </div>
            <h4 className="text-xs font-bold">VIEWS</h4>
            <div className="font-light">
              <SidebarButton
                text="List"
                icon={<IconUnorderedList className="h-6 w-6" />}
                active={pathname === "/list"}
                onClick={() => router.push("/list")}
              />
              <SidebarButton
                text="Board"
                icon={<IconProject className="h-6 w-6" />}
                active={pathname === "/board"}
                onClick={() => router.push("/board")}
              />
              <SidebarButton
                text="Calendar"
                icon={<IconCalendar className="h-6 w-6" />}
                active={pathname === "/calendar"}
                onClick={() => router.push("/calendar")}
              />
            </div>
          </div>
          <div className="border-t-[1px] border-gray-300 pt-2">
            <SidebarButton
              text="Account"
              icon={
                session.data?.user?.image ? (
                  <Image
                    className="h-6 w-6 rounded-full"
                    width={24}
                    height={24}
                    src={session.data.user.image}
                    alt="Profile picture"
                  />
                ) : (
                  <IconUser className="h-6 w-6" />
                )
              }
            />
            <SidebarButton
              text="Settings"
              icon={<IconSetting className="h-6 w-6" />}
            />
            <SidebarButton
              text="Sign out"
              icon={<IconUser className="h-6 w-6" />}
              className="hover:bg-red-300 active:bg-red-400"
              onClick={signOut}
            />
          </div>
        </div>
      </div>

      {/* page */}
      <div className="h-screen w-full overflow-scroll py-4">{children}</div>
    </div>
  );
}
