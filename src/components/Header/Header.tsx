import {ReactNode} from "react";
import styles from './Header.module.scss';

const Header = () : ReactNode => {
  return (
    <h1 className={styles.header}>CitySearch</h1>
  );
}

export default Header;