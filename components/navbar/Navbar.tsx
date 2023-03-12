import getUser from '@/server/getUser';
import s from '@/styles/navbar.module.scss'
import Link from "next/link";
import HavbarLinks from "./NavbarLinks";

const Navbar = () => {
  return(
    <>
      <nav className={s.nav}>
        <HavbarLinks />
      </nav>
    </>
  )
}

export default Navbar;