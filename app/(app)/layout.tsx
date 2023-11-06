"use client";

import {
  IconCalendar,
  IconCheckSquare,
  IconCoffee,
  IconComment,
  IconLogout,
  IconProject,
  IconSetting,
  IconUnorderedList,
  IconUser,
} from "@taskbrew/components/icons";
import {
  AccountModalContent,
  FeedbackModalContent,
  Modal,
  SettingsModalContent,
} from "@taskbrew/components/modal";
import { SidebarButton } from "@taskbrew/components/sidebar-button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const MAX_SIDEBAR_WIDTH = 300;
const MIN_SIDEBAR_WIDTH = 70;

const computerNewWidth = (
  initialWidth: number,
  initialX: number,
  currentX: number,
) => {
  const newWidth = initialWidth + (currentX - initialX);
  return Math.round(
    Math.min(Math.max(newWidth, MIN_SIDEBAR_WIDTH), MAX_SIDEBAR_WIDTH),
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const session = useSession();
  const router = useRouter();
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const isSmallSidebarView = sidebarWidth < 172;

  if (session.status === "unauthenticated") {
    redirect("/auth");
  }

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setSidebarWidth(MIN_SIDEBAR_WIDTH);
    } else {
      const savedWidth = localStorage.getItem("sidebarWidth");
      if (savedWidth) {
        setSidebarWidth(parseInt(savedWidth));
      }
    }
  }, []);

  const onStartResize = (e: React.MouseEvent<HTMLButtonElement>) => {
    const initialX = e.clientX;
    const initialWidth = sidebarWidth;

    // update width on mouse moves
    const onMouseMove = (e: MouseEvent) => {
      const newWidth = computerNewWidth(initialWidth, initialX, e.clientX);
      setSidebarWidth(newWidth);
    };

    // remove event listeners, finalize width and save to local storage
    const onMouseUp = (e: MouseEvent) => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      const newWidth = computerNewWidth(initialWidth, initialX, e.clientX);
      setSidebarWidth(newWidth);
      localStorage.setItem("sidebarWidth", newWidth.toString());
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="flex">
      {/* sidebar */}
      <div className="h-screen">
        <div
          className="flex h-full flex-col justify-between bg-neutral-100 py-4 pl-4 pr-3 shadow-md dark:bg-neutral-900"
          style={{
            width: sidebarWidth,
            minWidth: MIN_SIDEBAR_WIDTH,
            maxWidth: MAX_SIDEBAR_WIDTH,
          }}
        >
          <div
            className={`space-y-2 overflow-scroll ${
              isSmallSidebarView ? "text-center" : "text-left"
            }`}
          >
            <Link
              href="/list"
              className="mb-4 inline-block space-x-2 transition-opacity hover:opacity-80 active:opacity-60"
            >
              <IconCoffee className="inline h-6 w-6" />
              <h2
                className={`align-bottom text-xl font-medium leading-none ${
                  isSmallSidebarView ? "hidden" : "inline"
                }`}
              >
                Taskbrew
              </h2>
            </Link>
            <h3 className="text-xs font-bold">VIEWS</h3>
            <div className="space-y-1">
              <SidebarButton
                text="List"
                icon={<IconUnorderedList className="h-6 w-6" />}
                hideText={isSmallSidebarView}
                active={pathname === "/list"}
                onClick={() => router.push("/list")}
              />
              <SidebarButton
                text="Board"
                icon={<IconProject className="h-6 w-6" />}
                hideText={isSmallSidebarView}
                active={pathname === "/board"}
                onClick={() => router.push("/board")}
              />
              <SidebarButton
                text="Calendar"
                icon={<IconCalendar className="h-6 w-6" />}
                hideText={isSmallSidebarView}
                active={pathname === "/calendar"}
                onClick={() => router.push("/calendar")}
              />
            </div>
            <h3 className="text-xs font-bold">OTHER</h3>
            <div className="space-y-1">
              <SidebarButton
                text="Completed"
                icon={<IconCheckSquare className="h-6 w-6" />}
                hideText={isSmallSidebarView}
                active={pathname === "/completed"}
                onClick={() => router.push("/completed")}
              />
            </div>
          </div>
          <div className="space-y-1 border-t-[1px] border-neutral-200 pt-2 dark:border-neutral-800">
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
              hideText={isSmallSidebarView}
              onClick={() => setIsAccountModalOpen(true)}
            />
            <SidebarButton
              text="Settings"
              icon={<IconSetting className="h-6 w-6" />}
              hideText={isSmallSidebarView}
              onClick={() => setIsSettingsModalOpen(true)}
            />
            <SidebarButton
              text="Feedback"
              icon={<IconComment className="h-6 w-6" />}
              hideText={isSmallSidebarView}
              onClick={() => setIsFeedbackModalOpen(true)}
            />
            <SidebarButton
              text="Sign out"
              icon={<IconLogout className="h-6 w-6" />}
              hideText={isSmallSidebarView}
              className="hover:bg-red-300 active:bg-red-400 dark:hover:bg-red-500 dark:active:bg-red-600"
              onClick={signOut}
            />
          </div>
        </div>
      </div>

      {/* width slider */}
      <button
        className="h-screen w-1 cursor-col-resize bg-neutral-100 transition-colors hover:bg-neutral-200 active:bg-neutral-300 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:active:bg-neutral-700"
        onPointerDown={onStartResize}
      />

      {/* account modal */}
      <Modal
        isOpen={isAccountModalOpen}
        closeModal={() => setIsAccountModalOpen(false)}
        title="Account"
        description="Your account details"
        hasCloseButton
      >
        <AccountModalContent />
      </Modal>

      {/* settings modal */}
      <Modal
        isOpen={isSettingsModalOpen}
        closeModal={() => setIsSettingsModalOpen(false)}
        title="Settings"
        hasCloseButton
      >
        <SettingsModalContent />
      </Modal>

      {/* feedback modal */}
      <Modal
        isOpen={isFeedbackModalOpen}
        closeModal={() => setIsFeedbackModalOpen(false)}
        title="Feedback"
        description="Tell us about your experience"
        hasCloseButton
      >
        <FeedbackModalContent
          closeModal={() => setIsFeedbackModalOpen(false)}
        />
      </Modal>

      {/* page */}
      {children}

      {/* toast setup */}
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: "dark:bg-neutral-800 dark:text-white min-w-[250px]",
        }}
      />
    </div>
  );
}
