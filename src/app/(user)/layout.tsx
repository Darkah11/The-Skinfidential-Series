import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getCategories } from "@/utils/firebase";
import { getSessionUser } from "@/utils/users";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();
  const user = await getSessionUser();
  return (
    <div>
      <Navbar categories={categories} user={user} />
      <main className="pt-[80px]">{children}</main>
      <Footer />
    </div>
  );
}
