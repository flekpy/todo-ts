import styles from './app.module.scss';
// import { useTypedSelector } from './hooks/useTypeSelector';

function App() {
  // const user = useTypedSelector((state) => state.user);

  // console.log(user);

  return (
    <div className={styles.appContainer}>
      <div className={styles.appContentContainer}>
        Hello Friends
      </div>
    </div>
  );
}

export default App;
