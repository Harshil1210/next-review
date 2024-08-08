import { logout } from "@/Actions/adminAction";
import Link from "next/link";
import React from "react";

const AdminNav = () => {


  return (
   <header>
      <nav>
        <ul>
          <li>
            <Link id="myPaymentsBtn" href={"/admin/userlist"}>
              Userlist
            </Link>
          </li>
          <li>
            <Link id="userCreateBtn" href={"/admin/createuser"}>
              Createuser
            </Link>
          </li>
          <li>
            <Link id="profileBtn" href={"/admin/donations"}>
              Donations
            </Link>
          </li>
          <li>
            <Link id="chat" href={"/chat"}>
              Chat
            </Link>
          </li>
          <li>
            <form action={logout}>
              <button type="submit">SIGN OUT</button>
            </form>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AdminNav;
