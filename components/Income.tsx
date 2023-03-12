import s from '@/styles/income.module.scss'
import { IIncome } from "@/interfaces/IIncome";
import Link from 'next/link';
import joinClasses from '@/utils/joinClasses';

interface PageProps {
  income: IIncome
}

const Income = ({ income }: PageProps) => {
  return(
    <>
      <Link href={`/income/${income.slug}`} className={s.income}>
        <h1 className={s.income__title}>{income.title}</h1>
        <p className={s.income__date}>{income.date  }</p>
        <div className={joinClasses(s.income__meta, s.meta)}>
          <div className={s.meta__budget}>Budget: {income.budget}</div>
          <div className={s.meta__waste}>Waste: {income.wastes}</div>
          <div className={s.meta__remains}>Reamins: {income.remains}</div>
        </div>
      </Link>
    </>
  )
}

export default Income;