import { logout } from "@/Actions/adminAction";
import Link from "next/link";
import React from "react";

const DevoteeNav = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link id="myPaymentsBtn" href={"/devotee/mypayments"}>
              My Payments
            </Link>
          </li>
          <li>
            <Link id="payOnlineBtn" href={"/devotee/payonline"}>
              Pay Online
            </Link>
          </li>
          <li>
            <Link id="profileBtn" href={"/devotee/profile"}>
              Profile
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

export default DevoteeNav;
