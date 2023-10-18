export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full flex-col">
      {/* header */}
      <div className="p-4">
        <h1 className="text-4xl font-bold">Completed</h1>
        <p className="text-sm text-neutral-500">
          Completed tasks are deleted after 30 days
        </p>
      </div>

      {children}
    </div>
  );
}
