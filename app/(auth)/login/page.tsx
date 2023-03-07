import { Metadata } from "next";
import Form from "./Form";

export const metadata: Metadata = {
  title: 'Log In'
}

const Login = async () => {
  return(
    <>
      <Form />
    </>
  )
}

export default Login;