import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { IconUser } from "./icons";

export function AccountModalContent() {
  const session = useSession();

  if (session.status === "unauthenticated") {
    redirect("/auth");
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {session.data?.user?.image ? (
        <Image
          className="m-2 h-16 w-16 rounded-full"
          width={64}
          height={64}
          src={session.data.user.image}
          alt="Profile picture"
        />
      ) : (
        <IconUser className="m-2 h-16 w-16" />
      )}
      <h3 className="text-lg font-medium">{session.data?.user?.name}</h3>
      <span className="text-sm text-neutral-500">
        {session.data?.user?.email}
      </span>
    </div>
  );
}
