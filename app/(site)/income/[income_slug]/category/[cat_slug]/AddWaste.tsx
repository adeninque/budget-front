"use client";
import Modal from "@/components/Modal";
import useHidden from "@/hooks/useHidden";
import ICat from "@/interfaces/ICat";
import s from "@/styles/addWaste.module.scss";
import { IAuthHeader } from "@/utils/authHeader";
import joinClasses from "@/utils/joinClasses";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

interface PageProps {
  income_slug: string;
  cat_slug: string;
  cat: ICat;
  header: IAuthHeader;
}

const AddWaste = ({ income_slug, cat_slug, header, cat }: PageProps) => {
  const modal = useHidden();
  const router = useRouter();
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}api/v1/incomes/${income_slug}/categories/${cat_slug}/wastes/`,
      {
        method: "POST",
        headers: {
          ...header!.header,
        },
        body: formData,
      }
    );
    if (!res.ok) {
      throw new Error(await res.json());
    }
    modal.toggleHidden();
    router.refresh();
  };

  return (
    <div className={s.add}>
      <h2 className={s.add__btn} onClick={modal.toggleHidden}>
        Add Waste
      </h2>
      {!modal.hidden && (
        <Modal toggler={modal.toggleHidden}>
          <form
            className={joinClasses(s.add__form, s.form)}
            onSubmit={submitHandler}
          >
            <p className={s.form__field}>
              <label className={s.form__label} htmlFor="purpose">
                Purpose
              </label>
              <input
                className={s.form__input}
                type="text"
                name="purpose"
                defaultValue={cat.title}
                required
              />
            </p>
            <p className={s.form__field}>
              <label className={s.form__label} htmlFor="amount">
                Amount
              </label>
              <input
                className={s.form__input}
                type="number"
                name="amount"
                required
              />
            </p>
            <button className={s.form__btn} type="submit">
              Submit
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AddWaste;
