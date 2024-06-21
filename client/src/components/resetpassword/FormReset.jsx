import { useNavigate, useParams } from "react-router-dom";
import styles from "./FormReset.module.css";
import { useState } from "react";
import { resetpassword } from "../../service/Api";
function FormReset() {
  const [password, setpassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const { id } = useParams();
  const nav = useNavigate();
  async function handelReset(e) {
    e.preventDefault();
    if (!password && !passwordConfirm) return;
    await resetpassword(id, { password, passwordConfirm });
    setpassword("");
    setpasswordConfirm("");
    nav("/login");
  }
  return (
    <div className={styles.setting}>
      <div className={styles.dataSetting}>
        <h3>PASSWORD CHANGE</h3>
        <form className={styles.data} onSubmit={handelReset}>
          <label className={styles.label} htmlFor="password">
            New password
          </label>
          <input
            className={styles.input}
            type="password"
            placeholder="*******"
            id="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <label className={styles.label} htmlFor="Confirmpassword">
            Confirm password
          </label>
          <input
            className={styles.input}
            type="password"
            placeholder="*******"
            id="Confirmpassword"
            value={passwordConfirm}
            onChange={(e) => setpasswordConfirm(e.target.value)}
          />

          <div className={styles.btn}>
            <button className={styles.cta}>Save password</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormReset;
