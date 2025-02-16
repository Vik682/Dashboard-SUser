import type { Metadata } from "next";
import Footer from '@/components/Dashboard/Footer';
import Header from "@/components/Dashboard/Header";
import SideNavBar from "@/components/Dashboard/SideNavBar";


export const metadata: Metadata = {
  title: " Dashboard1",
  description: "Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex">
        {/* Sidebar */}
        <SideNavBar />
        
        {/* Main Content Section (Dynamic Content Area) */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header />
          
          {/* Main Content */}
          <main className="ml-48 p-6">{children}</main>

          {/* Footer */}
          <Footer />
        </div>
      </body>
    </html>
  );
}