import { Link } from 'react-router-dom';
import styles from './logo.module.scss';

export default function LogoLink() {
  return (
    <Link className={styles.logo} to="/">todo</Link>
  );
}
