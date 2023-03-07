"use client";

import s from "@/styles/alert.module.scss";
import { useEffect } from "react";

interface CompProps {
  toggler: () => void;
  msg: string;
}

const Alert = ({ toggler, msg }: CompProps) => {

  useEffect(() => {
    const interval = setInterval(() => {
      toggler()
    }, 10*1000)

    return () => {
      clearInterval(interval)
    }
  }, [toggler])

  return (
    <>
      <div className={s.alert} onClick={toggler}>
        <h1 className={s.alert__title}>{msg}</h1>
      </div>
    </>
  );
};

export default Alert;
