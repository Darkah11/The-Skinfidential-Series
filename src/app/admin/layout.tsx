import SideNav from "@/components/Sidenav";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div className="flex h-screen flex-row lg:overflow-hidden">
      <div className="lg:w-64">
        <SideNav />
      </div>
      <div className=" lg:flex-1 grow lg:overflow-y-auto min-w-0">{children}</div>
    </div>
  );
}
