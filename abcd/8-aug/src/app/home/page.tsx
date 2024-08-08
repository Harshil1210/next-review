"use client"
import axios from "axios";
import Link from "next/link";

export default  function Home() {
  // async function call() {
  //   const formData = new FormData();
  //   formData.append("name", "harshil");
  //   formData.append("age", "12");
  //   // const response = await axios.get("http://localhost:4000/user",{withCredentials : true});
  //   // return response;
  //   const response = await fetch("http://localhost:4000/user", {
  //     method: "GET",
  //     credentials: "include",
  //   });
  // }
  // call();

  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </div>
  );
}
