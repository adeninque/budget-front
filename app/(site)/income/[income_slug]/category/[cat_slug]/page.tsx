import ICat from "@/interfaces/ICat";
import IWaste from "@/interfaces/IWaste";
import getAuthHeader from "@/server/getAuthHeader";
import { IAuthHeader } from "@/utils/authHeader";
import { notFound } from "next/navigation";
import s from "@/styles/cat.module.scss";
import getIncome from "@/server/getIncome";
import { headers } from "next/headers";
import joinClasses from "@/utils/joinClasses";
import formatNum from "@/utils/formatNum";
import AddWaste from "./AddWaste";
import Waste from "./Waste";
import Link from "next/link";

const getCat = async (
  income_slug: string,
  cat_slug: string,
  header: IAuthHeader
): Promise<ICat> => {
  const res = await fetch(
    `${process.env.API_HOST}api/v1/incomes/${income_slug}/categories/${cat_slug}/`,
    {
      method: "GET",
      headers: {
        ...header!.header,
      },
    }
  );

  if (!res.ok) notFound();
  return res.json();
};

const getWastes = async (
  income_slug: string,
  cat_slug: string,
  header: IAuthHeader
): Promise<IWaste[]> => {
  const res = await fetch(
    `${process.env.API_HOST}api/v1/incomes/${income_slug}/categories/${cat_slug}/wastes/`,
    {
      method: "GET",
      headers: {
        ...header!.header,
      },
    }
  );

  if (!res.ok) notFound();
  return res.json();
};

const DetailCategory = async ({
  params,
}: {
  params: { income_slug: string; cat_slug: string };
}) => {
  const authHeader = await getAuthHeader();
  const cat = await getCat(params.income_slug, params.cat_slug, authHeader);
  const wastes = await getWastes(
    params.income_slug,
    params.cat_slug,
    authHeader
  );
  const income = await getIncome(params.income_slug, authHeader);

  return (
    <div className={joinClasses("container", s.cat)}>
      <h1 className={s.cat__title}>
        <Link href={`income/${income.slug}/`}>{income.title}</Link> / <span>{cat.title}</span>
      </h1>
      <p className={s.cat__total}>Total wastes</p>
      <h1 className={s.cat__amount}>{formatNum(cat.total)}</h1>

      <AddWaste
        income_slug={params.income_slug}
        cat_slug={params.cat_slug}
        cat={cat}
        header={authHeader}
      />

      <div className={joinClasses(s.cat__wastes, s.wastes)}>
        <div className={s.wastes__head}>
          <h1>Purpose</h1>
          <h1>Amount</h1>
        </div>
        <div className={s.wastes__body}>
          {wastes.map((waste) => (
            <Waste
              header={authHeader}
              waste={waste}
              key={waste.id}
            />
          ))}
        </div>
      </div>

      <div style={{height: '5rem'}}></div>
    </div>
  );
};

export default DetailCategory;
