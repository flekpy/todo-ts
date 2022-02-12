import imgBanner from '../../assets/person2.png';
import styles from './imgBanner.module.scss';

export default function ImgBanner() {
  return (
    <img className={styles.imgBanner} src={imgBanner} alt="" />
  );
}
