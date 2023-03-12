import { IIncome } from "@/interfaces/IIncome";
import getAuthHeader from "./getAuthHeader";

const getIncomes = async (): Promise<IIncome[] | null> => {
  const authheader = await getAuthHeader()
  const res = await fetch(`${process.env.API_HOST}api/v1/incomes/`, {
    method: 'GET',
    headers: {
      ...authheader.header
    }
  })
  if (!res.ok) {
    throw new Error('Failed to fetch Incomes');
  }
  return res.json()
}

export default getIncomes