import React from 'react';
import styles from './modal.module.scss';
import { TagsContext } from '../../context/Context';

interface Props {
  active: boolean | undefined,
  setActive: (arg: boolean) => void,
  setModalEdit: (arg: boolean) => void
  children?: React.ReactNode
}

export default function Modal({
  active, setActive, setModalEdit, children,
}: Props) {
  const tagsContext = React.useContext(TagsContext);

  function handlerModal() {
    setActive(false);
    setModalEdit(true);
    tagsContext?.setSelectedTags([]);
  }
  return (
    <div
      className={active
        ? `${styles.modal} ${styles.modalActive}` : `${styles.modal}`}
      onClick={handlerModal}
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
