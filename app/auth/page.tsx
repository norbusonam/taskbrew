"use client";

import {
  IconCoffee,
  IconGithub,
  IconGoogle,
  IconLogout,
} from "@taskbrew/components/icons";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function getHumanReadableError(error: "OAuthAccountNotLinked" | "da") {
  switch (error) {
    case "OAuthAccountNotLinked":
      return "You already have an account with this email address. Please sign in with the same provider as before.";
    default:
      return "An error occurred.";
  }
}

export default function Page() {
  const { data, status } = useSession();
  const searchParams = useSearchParams();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      {status === "authenticated" ? (
        <>
          {data.user && data.user.image && (
            <Image
              className="h-16 w-16 rounded-full"
              width={64}
              height={64}
              src={data.user.image}
              alt="Profile picture"
            />
          )}
          <p className="font-light">
            Signed in as{" "}
            <strong className="font-bold">{data.user?.email}</strong>
          </p>
          <Link
            className="flex w-64 items-center justify-center gap-2 rounded-md bg-gray-300 px-4 py-2 transition-colors hover:bg-gray-400 active:bg-gray-500"
            href="/today"
          >
            <IconCoffee className="h-6 w-6" />
            <p className="font-light">Continue to Taskbrew</p>
          </Link>
          <button
            className="flex w-64 items-center justify-center gap-2 rounded-md bg-gray-300 px-4 py-2 transition-colors hover:bg-red-300 active:bg-red-400"
            onClick={() => signOut()}
          >
            <IconLogout className="h-6 w-6" />
            <p className="font-light">Sign out</p>
          </button>
        </>
      ) : (
        <>
          <Link className="transition-opacity hover:opacity-50" href="/">
            <IconCoffee className="h-12 w-12" />
          </Link>
          <h1 className="text-lg font-medium">Welcome to Taskbrew</h1>
          <button
            className="flex w-64 items-center justify-center gap-2 rounded-md bg-gray-300 px-4 py-2 transition-colors hover:bg-gray-400 active:bg-gray-500"
            onClick={() => signIn("google", { callbackUrl: "/today" })}
          >
            <IconGoogle className="h-6 w-6" />
            <p className="font-light">Continue with Google</p>
          </button>
          <button
            className="flex w-64 items-center justify-center gap-2 rounded-md bg-gray-300 px-4 py-2 transition-colors hover:bg-gray-400 active:bg-gray-500"
            onClick={() => signIn("github", { callbackUrl: "/today" })}
          >
            <IconGithub className="h-6 w-6" />
            <p className="font-light">Continue with GitHub</p>
          </button>
          {searchParams.has("error") && (
            <p className="w-96 px-6 text-center text-red-500">
              {getHumanReadableError(
                searchParams.get("error") as "OAuthAccountNotLinked",
              )}
            </p>
          )}
        </>
      )}
    </div>
  );
}
