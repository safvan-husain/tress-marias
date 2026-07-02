import { getOptionalSession } from "@/app/lib/auth/dal";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";

export default async function StorefrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getOptionalSession();

  return (
    <>
      <Nav session={session} />
      {children}
      <Footer />
      <ScrollReveal />
    </>
  );
}
