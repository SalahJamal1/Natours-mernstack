import styles from "./Mainaccount.module.css";
import Setting from "./Setting";
import SideBare from "./SideBare";
function Mainaccount() {
  return (
    <main className={styles.main}>
      <SideBare />
      <Setting />
    </main>
  );
}

export default Mainaccount;
