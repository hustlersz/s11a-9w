"use server"

import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"
import { createSession, deleteSession, getSession } from "@/lib/auth"
import { redirect } from "next/navigation"

// Initialize Neon client using the DATABASE_URL environment variable
const databaseUrl = process.env.DATABASE_URL // Changed from NEON_DATABASE_URL

if (!databaseUrl) {
  // Throw a more descriptive error if the environment variable is missing
  throw new Error("DATABASE_URL environment variable is not set. Please configure it in your Vercel project settings.")
}

const sql = neon(databaseUrl)

export async function signup(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { success: false, message: "ایمیل و رمز عبور الزامی هستند." }
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    // Check if user already exists
    const existingUsers = await sql`SELECT id FROM users WHERE email = ${email}`

    if (existingUsers.length > 0) {
      return { success: false, message: "این ایمیل قبلاً ثبت‌نام شده است." }
    }

    // Insert new user
    const newUsers = await sql`
      INSERT INTO users (email, password_hash)
      VALUES (${email}, ${hashedPassword})
      RETURNING id
    `

    if (newUsers.length === 0) {
      return { success: false, message: "خطا در ثبت‌نام. لطفاً دوباره تلاش کنید." }
    }

    const newUser = newUsers[0]
    await createSession(newUser.id)
    redirect("/")
  } catch (error) {
    console.error("Signup error:", error)
    return { success: false, message: "خطا در ثبت‌نام. لطفاً دوباره تلاش کنید." }
  }
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { success: false, message: "ایمیل و رمز عبور الزامی هستند." }
  }

  try {
    const users = await sql`SELECT id, password_hash FROM users WHERE email = ${email}`

    if (users.length === 0) {
      return { success: false, message: "ایمیل یا رمز عبور اشتباه است." }
    }

    const user = users[0]
    const passwordMatch = await bcrypt.compare(password, user.password_hash)

    if (!passwordMatch) {
      return { success: false, message: "ایمیل یا رمز عبور اشتباه است." }
    }

    await createSession(user.id)
    redirect("/")
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, message: "خطا در ورود. لطفاً دوباره تلاش کنید." }
  }
}

// New Server Action to get authentication status
export async function getAuthStatus() {
  const session = await getSession()
  return !!session
}

// New Server Action to perform logout
export async function performLogout() {
  await deleteSession()
  redirect("/login")
}
