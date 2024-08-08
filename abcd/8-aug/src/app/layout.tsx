import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({
  weight : "400",
  subsets: ["latin"]
})
export const metadata: Metadata = {
  title: "Harmony Spiritual Center",
  description: "Discover peace, wisdom, and community at Harmony Spiritual Center. Join us for uplifting spiritual practices, enlightening teachings, and a welcoming environment for all seekers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Toaster position="bottom-right"/>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
