export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full overflow-y-scroll">
      {/* header */}
      <div className="p-4">
        <h1 className="text-4xl font-bold">Board</h1>
      </div>

      {children}
    </div>
  );
}
