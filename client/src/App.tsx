import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './app.module.scss';
import Auth from './components/auth/Auth';
import { MainLayout } from './components/mainLayout/MainLayout';
import { PrivateRoute } from './components/privateRoute/PrivateRoute';
import { authUser } from './store/actions/userAction';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authUser());
  }, [dispatch]);

  return (
    <div className={styles.appContainer}>
      <div className={styles.appContentContainer}>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route
            path="/users/:id"
            element={(
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
          )}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
