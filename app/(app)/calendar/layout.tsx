export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full flex-col px-4 pt-4">
      {/* header */}
      <div className="pb-4">
        <h1 className="text-4xl font-bold">Calendar</h1>
      </div>

      {children}
    </div>
  );
}
