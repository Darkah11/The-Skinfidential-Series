import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <main className="pt-[80px]">{children}</main>
      <Footer />
    </div>
  );
}
