import Income from "@/components/Income";
import Margin from "@/components/Margin";
import getIncomes from "@/server/getIncomes";
import getUser from "@/server/getUser";
import s from "@/styles/incomes.module.scss";
import Link from "next/link";
import AddIncome from "./AddIncome";

const Home = async () => {
  const incomes = await getIncomes();
  return (
    <>
      <div className={s.incomes}>
        <div className="container">
          <div className={s.incomes__body}>
            <AddIncome />
            <div className={s.incomes__grid}>
              {incomes &&
                incomes.map((income) => (
                  <Income income={income} key={income.id} />
                ))}
            </div>
            <Margin />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
