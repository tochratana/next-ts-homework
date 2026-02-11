export default function ParallelLayout({
  user,
  data,
  children,
}: Readonly<{
  user: React.ReactNode;
  data: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <div>
      {user}
      {data}
      {children}
    </div>
  );
}
