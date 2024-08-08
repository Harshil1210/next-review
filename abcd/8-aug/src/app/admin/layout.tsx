import React from "react";
import { Metadata } from "next";
import AdminNav from "@/Components/AdminNav";

export const metadata: Metadata = {
  title: "Admin | Spiritual-Centre",
};

function Navbar({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen">
      <AdminNav />
      {children}
    </div>
  );
}

export default Navbar;
