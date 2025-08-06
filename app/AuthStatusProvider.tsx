import type React from "react"
import { getAuthStatus } from "@/app/actions/auth"
import { Header } from "@/components/header"

interface AuthStatusProviderProps {
  children: React.ReactNode
}

export default async function AuthStatusProvider({ children }: AuthStatusProviderProps) {
  const authStatus = await getAuthStatus() // Call server action here

  return (
    <>
      <Header initialAuthStatus={authStatus} />
      {children}
    </>
  )
}
