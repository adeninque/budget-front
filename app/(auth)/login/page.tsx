import { Metadata } from "next";
import Form from "./Form";

export const metadata: Metadata = {
  title: 'Log In'
}

const Login = async () => {
  return(
    <>
      <h1>Login</h1>
      <Form />
    </>
  )
}

export default Login;