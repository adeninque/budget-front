import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'


async function getToken() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  if (token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}auth/users/me/`, {
      method: "POST",
      headers: {
        'Authorization': `Token ${token.value}`
      }
    })

    if (res.ok) {
      return await res.json()
    } else goLogin()
  }
  else goLogin()
}

function goLogin() {
  redirect('/login')
}

const fetchUser = async () => {
  const token = await getToken()

  return {
    token, 
    getToken
  }
}

export default fetchUser