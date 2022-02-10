import React from 'react';
import styles from './modalMenu.module.scss';

interface IModalMenu {
  modalMenuActive: boolean
  setModalMenu: (arg: boolean) => void
}

export const ModalMenu: React.FC<IModalMenu> = ({ modalMenuActive, setModalMenu, children }) => (
  <div
    className={modalMenuActive ? `${styles.modalMenu} ${styles.modalMenuActive}` : styles.modalMenu}
  >
    <div
      className={modalMenuActive ? `${styles.modalMenuContent} ${styles.modalMenuContentActive}` : styles.modalMenuContent}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  </div>
);
