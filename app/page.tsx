import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Link className={buttonVariants()} href="/auth">
        Get Started
      </Link>
    </div>
  );
}
