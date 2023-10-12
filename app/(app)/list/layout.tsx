export default function Layout({ children }: { children: React.ReactNode }) {
  const date = new Date();

  return (
    <div>
      {/* header */}
      <div className="pb-4">
        <h1 className="text-4xl font-bold">List</h1>
      </div>

      {children}
    </div>
  );
}
