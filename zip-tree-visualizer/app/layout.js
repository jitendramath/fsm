import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ZipTree | Premium Folder Structure Visualizer",
  description: "Convert your ZIP files into a clean, accurate folder structure instantly. Built for developers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {/* Background Overlay for better mesh effect visibility */}
        <div className="fixed inset-0 -z-10 h-full w-full bg-[#0a0a0a]"></div>
        
        {children}
      </body>
    </html>
  );
}
