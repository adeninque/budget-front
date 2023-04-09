"use client";

import useInput from "@/hooks/useInput";
import { FormEvent, useState, useEffect } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import s from "@/styles/login.module.scss";
import joinClasses from "@/utils/joinClasses";
import useHidden from "@/hooks/useHidden";
import Alert from "@/components/Alert";

const Form = () => {
  const username = useInput("", "username");
  const password = useInput("", "password");
  const router = useRouter();
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const { hidden, toggleHidden } = useHidden();

  useEffect(() => {
    if (localStorage.getItem("username"))
      username.setValue(localStorage.getItem("username")!);
  }, []);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}auth/token/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.bind.value,
            password: password.bind.value,
          }),
        }
      );

      if (res.ok) {
        const data: { auth_token: string } = await res.json();
        setCookie("token", data.auth_token);
        rememberUsername();
        router.push("/");
      } else {
        const { non_field_errors: err } = await res.json();
        setError(err[0]);
        toggleHidden();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggleRemember = () => {
    setRemember((prev) => !prev);
    console.log(remember);
  };

  const rememberUsername = () => {
    if (remember && username) {
      localStorage.setItem("username", username.bind.value);
    }
  };

  return (
    <>
      {!hidden && <Alert msg={error} toggler={toggleHidden} />}
      <div className={s.wrapper}>
        <div className={s.fs}>
          <div className="container">
            <div className={s.login}>
              <form
                onSubmit={submitHandler}
                className={joinClasses(s.login__form, s.form)}
              >
                <h2 className={s.form__title}>Login</h2>
                <label htmlFor={username.bind.name} className={s.form__label}>
                  Username
                  <input
                    className={s.form__input}
                    type="text"
                    {...username.bind}
                    tabIndex={1}
                    required
                  />
                </label>
                <label htmlFor={password.bind.name} className={s.form__label}>
                  Password
                  <input
                    className={s.form__input}
                    type="password"
                    {...password.bind}
                    tabIndex={2}
                    required
                  />
                </label>
                <button className={s.form__btn} type="submit">
                  Submit
                </button>
                <div
                  className={joinClasses(s.form__remember, s.remember)}
                  onClick={toggleRemember}
                >
                  <div
                    className={joinClasses(
                      s.remember__checkbox,
                      remember ? s.remember__checkbox_checked : ""
                    )}
                  ></div>
                  <h1>Remember me</h1>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
