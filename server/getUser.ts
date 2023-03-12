import IUser from "@/interfaces/IUser";
import { cache } from "react";
import getAuthHeader from "./getAuthHeader";
import redirectToLogin from "./redirectToLogin";

const getUser = cache(async (): Promise<IUser>  => {
  const { header } = await getAuthHeader()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}auth/users/me/`, {
    method: "GET",
    headers: {
      ...header
    },
  });
  if (!res.ok) redirectToLogin();
  return res.json();
})

export default getUser