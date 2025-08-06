"use server"

import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const secretKey = process.env.SESSION_SECRET || "your_secret_key_here_please_change_this_in_production"
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d") // Session expires in 7 days
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    })
    return payload
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null
  }
}

// تابع کمکی جدید برای دریافت ایمن شیء cookies
function getCookieStore() {
  try {
    const store = cookies();
    if (!store) {
      console.error("cookies() returned null or undefined.");
      return null;
    }
    return store;
  } catch (e) {
    console.error("Error calling cookies():", e);
    return null;
  }
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  const session = await encrypt({ userId, expiresAt })

  const cookieStore = getCookieStore(); // استفاده از تابع کمکی
  if (!cookieStore) {
    console.error("Failed to get cookie store in createSession. Cannot set cookie.");
    return;
  }

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  })
}

export async function deleteSession() {
  const cookieStore = getCookieStore(); // استفاده از تابع کمکی
  if (!cookieStore) {
    console.error("Failed to get cookie store in deleteSession. Cannot delete cookie.");
    return;
  }
  cookieStore.delete("session")
}

export async function getSession() {
  const cookieStore = getCookieStore(); // استفاده از تابع کمکی
  if (!cookieStore) {
    console.error("Failed to get cookie store in getSession. Returning null session.");
    return null;
  }
  const session = cookieStore.get("session")?.value
  if (!session) return null
  return await decrypt(session)
}

export async function isAuthenticated() {
  const session = await getSession()
  return !!session
}

export async function logout() {
  await deleteSession()
  redirect("/login")
}
