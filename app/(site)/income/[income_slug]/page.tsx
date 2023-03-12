import ICat from "@/interfaces/ICat";
import { IIncome } from "@/interfaces/IIncome";
import getAuthHeader from "@/server/getAuthHeader";
import { IAuthHeader } from "@/utils/authHeader";
import { notFound } from "next/navigation";
import s from "@/styles/detailIncome.module.scss";
import joinClasses from "@/utils/joinClasses";
import Link from "next/link";
import getIncome from "@/server/getIncome";
import formatNum from "@/utils/formatNum";

const getCats = async (
  income_slug: string,
  header: IAuthHeader
): Promise<ICat[]> => {
  const res = await fetch(
    `${process.env.API_HOST}api/v1/incomes/${income_slug}/categories/`,
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

const DetailIncome = async ({
  params,
}: {
  params: { income_slug: string };
}) => {
  const authHeader = await getAuthHeader();
  const income = await getIncome(params.income_slug, authHeader);
  const cats = await getCats(params.income_slug, authHeader);

  return (
    <>
      <div className={joinClasses("container", s.income)}>
        <div className={s.income__title}>
          <span>{income.title}</span> {income.date}
        </div>
        <div className={joinClasses(s.income__remain, s.remain)}>
          <h2 className={s.remain__title}>Remains</h2>
          <h2 className={s.remain__amount}>{formatNum(income.remains)}</h2>
          <div className={s.remain__meta}>
            <h2 className={s.remain__budget}>Budget: {income.budget}</h2>
            <h2 className={s.remain__waste}>Wastes: {income.wastes}</h2>
          </div>
        </div>
        <h1 className={s.income__seperator}>Wastes</h1>
        <div className={joinClasses(s.income__cats, s.cats)}>
          {cats.map((cat) => (
            <Link
              href={`/income/${params.income_slug}/category/${cat.slug}/`}
              className={joinClasses(s.cats__cat, s.cat)}
              key={cat.id}
            >
              <h2 className={s.cat__title}>{cat.title}</h2>
              <p className={s.cat__seperator}>- total -</p>
              <h2 className={s.cat__total}>{formatNum(cat.total)}</h2>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default DetailIncome;
