'use client'

import useInput from "@/hooks/useInput";
import { FormEvent } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const Form = () => {
  const username = useInput('')
  const password = useInput('')
  const router = useRouter()

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}auth/token/login/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      })
    })

    if (res.ok) {
      const { auth_token:token } = await res.json() as {auth_token: string}
      setCookie('token', token)
      router.push('/')
    } else {
      
    }
  }

  return(
    <>
      <form onSubmit={submitHandler}>
        <input type="text" {...username.bind}/>
        <input type="password" {...password.bind}/>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default Form;