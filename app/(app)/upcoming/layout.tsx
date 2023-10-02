export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* header */}
      <div className="pb-4">
        <h1 className="text-4xl font-bold">Upcoming</h1>
        <p className="text-gray-500">After today</p>
      </div>

      {children}
    </div>
  );
}
