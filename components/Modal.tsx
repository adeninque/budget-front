'use client'

import s from '@/styles/modal.module.scss'

interface PageProps {
  toggler: () => void,
  children: React.ReactNode
}

const Modal = ({ toggler, children }: PageProps) => {
  return(
    <>
      <div className={s.modal}>
        <div className={s.modal__closer} onClick={toggler}></div>
        <div className={s.modal__wrapper}>
          {children}
        </div>
      </div>
    </>
  )
}

export default Modal;