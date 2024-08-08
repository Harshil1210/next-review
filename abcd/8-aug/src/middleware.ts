import { NextRequest, NextResponse } from "next/server";
import CryptoJS from "crypto-js";
import { cookies } from "next/headers";

export function decryptUserData(encryptedData: string, secretKey: string) {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  } catch (error: any) {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const sessionData = request.cookies.get("session")?.value;
  const url = request.nextUrl.clone();
  const path = url.pathname;


  let decryptedUser;
  if (sessionData) {
    decryptedUser = decryptUserData(
      sessionData,
      process.env.COOKIE_ENCRYPTION_KEY!
    );
  }
  if (!decryptedUser) {
    // cookies().delete("session")
    if (path.startsWith("/api")) {
      return NextResponse.json({ message: "UnAuthenticated" }, { status: 401 });                        
    }
    if (path !== "/login") {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }
  const role = decryptedUser.role;

  if (path === "/login" || path === "/") {
    if (role === "admin") {
      url.pathname = "/admin/userlist";
      return NextResponse.redirect(url);
    } else if (role === "devotee") {
      url.pathname = "/devotee/mypayments";
      return NextResponse.redirect(url);
    }
  }
  if (path.startsWith("/api")) {
    console.log("in Api");
    
    if(path.startsWith("/api/alluserlist")) {
      return NextResponse.next()
    }
    if (role === "admin" && !path.startsWith("/api/admin")) {
      console.log("In Api Admin");
      return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });
    }

    if (role === "devotee" && !path.startsWith("/api/devotee")) {
      console.log("In Api Devotee");
      return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });
    }

    return NextResponse.next();
  }

  if (role === "admin" && !path.startsWith("/admin")) {
    console.log("In routes admin");
    url.pathname = "/admin/userlist";
    return NextResponse.redirect(url);
  }

  if (role === "devotee" && !path.startsWith("/devotee")) {
    console.log("In routes devotee");
    url.pathname = "/devotee/mypayments";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/devotee/:path*", "/api/:path*", "/login", "/"],
};
