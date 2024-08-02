import React from "react";
import { Metadata } from "next";
import DevoteeNav from "@/Components/DevoteeNav";

export const metadata: Metadata = {
  title: "Devotee | Spiritual-Centre",
};
function Navbar({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen">
      <DevoteeNav />
      {children}
    </div>
  );
}

export default Navbar;
