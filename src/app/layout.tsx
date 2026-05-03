import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

export const metadata: Metadata = {
  title: "Aura | Autonomous Carbon Intelligence",
  description: "Real-time Scope 3 carbon accounting and AI-driven supply chain optimization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          <Sidebar />
          <div className="main-wrapper">
            <TopBar />
            <main className="content">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
