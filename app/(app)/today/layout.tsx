export default function Layout({ children }: { children: React.ReactNode }) {
  const date = new Date();

  return (
    <div>
      {/* header */}
      <div className="pb-4">
        <h1 className="text-4xl font-bold">Today</h1>
        <p className="text-gray-500">
          {date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {children}
    </div>
  );
}
