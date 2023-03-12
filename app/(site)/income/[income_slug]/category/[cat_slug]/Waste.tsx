"use client";

import IWaste from "@/interfaces/IWaste";
import s from "@/styles/cat.module.scss";
import sf from "@/styles/addWaste.module.scss";
import { IAuthHeader } from "@/utils/authHeader";
import useHidden from "@/hooks/useHidden";
import Modal from "@/components/Modal";
import ICat from "@/interfaces/ICat";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

interface PageProps {
  header: IAuthHeader;
  waste: IWaste;
}

const Waste = ({ header, waste }: PageProps) => {
  const modal = useHidden();
  const router = useRouter()

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.target as HTMLFormElement)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}api/v1/wastes/${waste.id}/`, {
      method: "PUT",
      headers: {
        ...header.header
      },
      body: formData
    })

    if (!res.ok) {
      throw new Error(JSON.stringify(await res.json()))
    }
    modal.toggleHidden()
    router.refresh()
  }

  return (
    <>
      <div className={s.waste} onClick={modal.toggleHidden}>
        <h1 className={s.waste__purpose}>{waste.purpose}</h1>
        <h1 className={s.waste__amount}>{waste.amount}</h1>
      </div>
      {!modal.hidden && (
        <Modal toggler={modal.toggleHidden}>
          <form className={sf.form} onSubmit={submitHandler}>
            <p className={sf.form__field}>
              <label className={sf.form__label} htmlFor="purpose">
                Purpose
              </label>
              <input
                type="text"
                className={sf.form__input}
                name="purpose"
                defaultValue={waste.purpose}
                required
              />
            </p>
            <p className={sf.form__field}>
              <label className={sf.form__label} htmlFor="amount">
                Amount
              </label>
              <input
                type="text"
                className={sf.form__input}
                name="amount"
                defaultValue={waste.amount}
                required
              />
            </p>
            <button className={sf.form__btn} type="submit">
              Submit
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default Waste;
