import { Link } from "react-router-dom";
import styles from "./sideBare.module.css";
function SideBare() {
  return (
    <div className={styles.sideBare}>
      <ul className={styles.setting}>
        <li className={styles.link}>
          <Link className={styles.item}>SETTINGS</Link>
        </li>
        <li className={styles.link}>
          <Link className={styles.item}>MY BOOKINGS</Link>
        </li>
        <li className={styles.link}>
          <Link className={styles.item}>MY REVIEWS</Link>
        </li>
        <li className={styles.link}>
          <Link className={styles.item}>BILLING</Link>
        </li>
      </ul>
      <div className={styles.x}>
        <h3 className={styles.heading}>ADMIN</h3>
      </div>
      <ul className={styles.admin}>
        <li className={styles.link}>
          <Link className={styles.item}>MANAGE TOURS</Link>
        </li>
        <li className={styles.link}>
          <Link className={styles.item}>MANAGE USERS</Link>
        </li>
        <li className={styles.link}>
          <Link className={styles.item}>MANAGE REVIEWS</Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBare;
