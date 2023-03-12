import { cache } from "react";

export interface IAuthHeader {
  token: string,
  header: {
    Authorization: string
  }
}

const authHeader = cache(async (token: string): Promise<IAuthHeader | null> => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}auth/token/verify/`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
  
  if (!res.ok) return null

  return {
    token,
    header: {
      Authorization: `Token ${token}`
    }
  }
})
export default authHeader