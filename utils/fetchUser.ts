import IUser from "@/interfaces/IUser";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function getToken(): RequestCookie | undefined {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (!token) goLogin();
  return token;
}

function goLogin() {
  redirect("/login");
}

const fetchUser = async (): Promise<IUser> => {
  const token = getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}auth/users/me/`, {
    method: "GET",
    headers: {
      Authorization: `Token ${token!.value}`,
    },
  });

  if (!res.ok) goLogin();
  return await res.json();
};

export default fetchUser;
