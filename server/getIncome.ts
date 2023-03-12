import { IIncome } from "@/interfaces/IIncome";
import { IAuthHeader } from "@/utils/authHeader";
import { notFound } from "next/navigation";

const getIncome = async (
  income_slug: string,
  header: IAuthHeader
): Promise<IIncome> => {
  const res = await fetch(
    `${process.env.API_HOST}api/v1/incomes/${income_slug}/`,
    {
      method: "GET",
      headers: {
        ...header!.header,
      },
      next: {
        revalidate: 10
      }
    }
  );

  if (!res.ok) notFound();
  return res.json();
};

export default getIncome