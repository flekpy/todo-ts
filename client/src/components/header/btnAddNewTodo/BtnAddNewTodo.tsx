import imgBtnAdd from '../../../assets/add.png';
import styles from './btn.module.scss';
import { SetActive } from '../../../models/interfaces/interfaces';

export default function BtnAddNewTodo({ setActive }: SetActive) {
  return (
    <div>
      <img onClick={() => setActive(true)} className={styles.btnAddNewTodo} src={imgBtnAdd} alt="" />
    </div>
  );
}
