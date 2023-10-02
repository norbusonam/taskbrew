import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <h1 className="text-lg">Welcome to Taskbrew</h1>
      <Link
        className="flex w-64 items-center justify-center gap-2 rounded-md bg-gray-300 px-4 py-2 font-light transition-colors hover:bg-gray-400 active:bg-gray-500"
        href="/auth"
      >
        Get Started
      </Link>
    </div>
  );
}
