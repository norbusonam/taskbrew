export default function Layout({ children }: { children: React.ReactNode }) {
  const date = new Date();

  return (
    <div>
      {/* header */}
      <div className="pb-4">
        <h1 className="text-4xl font-bold">Completed</h1>
        <p className="text-sm text-neutral-500">
          Completed tasks are deleted after 30 days
        </p>
      </div>

      {children}
    </div>
  );
}
