'use client'

import useAuthHeader from "@/hooks/useAuthHeader";
import { removeCookies } from "cookies-next";

const Logout = () => {
  const { header, redirectToLogin } = useAuthHeader()
  const logoutHandler = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_HOST}auth/token/logout/`, {
      method: 'POST',
      headers: {
        ...header?.header
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(JSON.stringify(res.json()))
      }
      removeCookies('token')
      redirectToLogin()
    })
  }
  return(
    <>
      <button onClick={logoutHandler}>Logout</button>
    </>
  )
}

export default Logout;