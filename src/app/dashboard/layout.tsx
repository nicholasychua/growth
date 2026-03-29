export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-white text-foreground min-h-screen">{children}</div>;
}
