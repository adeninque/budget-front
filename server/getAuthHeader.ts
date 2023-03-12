import authHeader from '@/utils/authHeader'
import { cookies } from 'next/headers'
import redirectToLogin from './redirectToLogin'

const getAuthHeader = async () => {
  const cookieStore = cookies()
  const tokenCookie = cookieStore.get('token')

  if (!tokenCookie) redirectToLogin()
  const header = await authHeader(tokenCookie!.value)

  if (!header) redirectToLogin()
  return header!
 }

export default getAuthHeader