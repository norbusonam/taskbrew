export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full flex-col">
      {/* header */}
      <div className="p-4">
        <h1 className="text-4xl font-bold">List</h1>
      </div>

      {children}
    </div>
  );
}
