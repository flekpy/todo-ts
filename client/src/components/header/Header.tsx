import LogoLink from './logoLink/LogoLink';
import BtnAddNewTodo from './btnAddNewTodo/BtnAddNewTodo';
import styles from './header.module.scss';
import { SetActive } from '../../models/interfaces/interfaces';

export default function Header({ setActive }: SetActive) {
  return (
    <div className={styles.headerContainer}>
      <LogoLink />
      <BtnAddNewTodo setActive={setActive} />
    </div>
  );
}
