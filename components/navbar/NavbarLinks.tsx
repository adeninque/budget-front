"use client";

import Link from "next/link";
import s from "@/styles/navbar.module.scss";
import { usePathname } from "next/navigation";
import joinClasses from "@/utils/joinClasses";

const HavbarLinks = () => {
  const pathname = usePathname();

  return (
    <>
      <div className={s.nav__body}>
        <Link
          href={"/"}
          className={joinClasses(
            s.nav__link,
            pathname === "/" ? s.nav__link_active : ""
          )}
        >
          Incomes
        </Link>
        <Link
          href={"/profile"}
          className={joinClasses(
            s.nav__link,
            pathname === "/profile" ? s.nav__link_active : ""
          )}
        >
          Profile
        </Link>
      </div>
    </>
  );
};

export default HavbarLinks;
