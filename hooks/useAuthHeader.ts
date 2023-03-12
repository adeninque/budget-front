'use client'
import authHeader, { IAuthHeader } from "@/utils/authHeader"
import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const useAuthHeader = () => {
  const router = useRouter()
  const token = getCookie('token')?.toString()
  const [header, setHeader] = useState<IAuthHeader | null>(null)

  const redirectToLogin = () => router.push('/login')

  useEffect(() => {
    if (!token) return router.push('/login')
    // console.log('adfads')
    authHeader(token!)
    .then(res => {
      if(!res) redirectToLogin()
      setHeader(res!)
    })
  }, [])

  return {
    header,
    redirectToLogin
  }
}

export default useAuthHeader