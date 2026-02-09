import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getCategories } from "@/utils/firebase";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();
  return (
    <div>
      <Navbar categories={categories} />
      <main className="pt-[80px]">{children}</main>
      <Footer />
    </div>
  );
}
