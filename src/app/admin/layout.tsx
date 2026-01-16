import SideNav from "@/components/Sidenav";



export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
