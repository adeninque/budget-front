"use client";

import Modal from "@/components/Modal";
import useHidden from "@/hooks/useHidden";
import { FormEvent } from "react";
import s from "@/styles/addIncome.module.scss";
import useAuthHeader from "@/hooks/useAuthHeader";
import { useRouter } from "next/navigation";

const AddIncome = () => {
  const modal = useHidden();
  const { header } = useAuthHeader();
  const router = useRouter();
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}api/v1/incomes/`,
      {
        method: "POST",
        headers: {
          ...header?.header,
        },
        body: data,
      }
    );

    if (!res.ok) {
      throw new Error(JSON.stringify(await res.json()));
    }

    modal.toggleHidden();
    router.refresh();
  };

  return (
    <>
      <button onClick={modal.toggleHidden} className={s.add__btn}>
        Add Income
      </button>
      {!modal.hidden && (
        <Modal toggler={modal.toggleHidden}>
          <>
            <form onSubmit={submitHandler} className={s.form}>
              <label htmlFor="title" className={s.form__label}>
                <h1>Title</h1>
                <input
                  className={s.form__input}
                  type="text"
                  required
                  name="title"
                />
              </label>
              <label htmlFor="budget" className={s.form__label}>
                <h1>Budget</h1>
                <input
                  className={s.form__input}
                  type="number"
                  required
                  name="budget"
                />
              </label>
              <label htmlFor="date" className={s.form__label}>
                <h1>Date</h1>
                <input
                  className={s.form__date}
                  type="date"
                  required
                  name="date"
                />
              </label>
              <button className={s.form__btn} type="submit">
                Submit Adding Income
              </button>
            </form>
          </>
        </Modal>
      )}
    </>
  );
};

export default AddIncome;
