import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import logoutPNG from '../../assets/logout.png';
import styles from './logout.module.scss';
import { logoutUser } from '../../store/actions/userAction';

export const Logout: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <button onClick={() => dispatch(logoutUser())} type="button" className={styles.divLogoutContainer}>
      <img src={logoutPNG} alt="" />
      <p className={styles.pLogout}>выйти</p>
    </button>
  );
};
