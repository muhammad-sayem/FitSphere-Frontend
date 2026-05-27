export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-9/10 mx-auto">
      {children}
    </div>
  );
}
