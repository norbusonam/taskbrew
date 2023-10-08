export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* header */}
      <div className="pb-4">
        <h1 className="text-4xl font-bold">Home</h1>
      </div>

      {children}
    </div>
  );
}