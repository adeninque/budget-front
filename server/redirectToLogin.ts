import { redirect } from "next/navigation";

export default function redirectToLogin() {
  redirect('/login')
}