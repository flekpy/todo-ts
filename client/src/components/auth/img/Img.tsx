import React from 'react';
import person1 from '../../../assets/person.png';
import person2 from '../../../assets/person2.png';
import person3 from '../../../assets/person3.png';
import styles from './imgAuth.module.scss';

export const Img: React.FC = () => (
  <div className={styles.imgAuth}>
    <img src={person2} alt="" />
    <img src={person3} alt="" />
    <img src={person1} alt="" />
  </div>
);
