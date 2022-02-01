import React from 'react';
import styles from './modal.module.scss';

interface Props {
  active: boolean,
  setActive: (arg: boolean) => void,
  children?: React.ReactNode
}

export default function Modal({ active, setActive, children }: Props) {
  return (
    <div
      className={active
        ? `${styles.modal} ${styles.modalActive}` : `${styles.modal}`}
      onClick={() => setActive(false)}
    >
      <div
        className={active
          ? `${styles.modalContent} ${styles.modalContentActive}` : `${styles.modalContent}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
