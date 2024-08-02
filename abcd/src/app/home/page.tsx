import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const repsonse = await fetch("http://localhost:4000", { method: "POST" });
 const { cookie } = await repsonse.json()
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </div>
  );
}
