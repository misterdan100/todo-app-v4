import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Footer, Sidebar, Topmenu } from "@/components";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ToDo V4 | Next.js",
  description: "Todo List Tasks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative h-screen`}>
        <Topmenu />

        <div
          className="flex bg-white pt-16 h-full overflow-hidden"
        >
          <Sidebar />

          <div
            id="main-content"
            className="h-full w-full bg-gray-50 relative lg:ml-64 overflow-y-auto"
          >
            <main className="pt-6 px-4 flex-1">{children}</main>
            <Footer />
          </div>
        </div>

        
      </body>
    </html>
  );
}
