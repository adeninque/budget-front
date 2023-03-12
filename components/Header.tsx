import s from '@/styles/header.module.scss'

const Header = () => {
  return(
    <>
    <header className={s.header}>
      <h1 className={s.header__logo}>BUDGET</h1>
    </header>
    </>
  )
}

export default Header;