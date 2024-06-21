import { useState } from "react";
import styles from "./Formforget.module.css";
import { forgetPassword } from "../../service/Api";
function Formforget() {
  const [email, setemail] = useState("");
  async function handelforget(e) {
    e.preventDefault();
    if (!email) return;
    await forgetPassword({ email });
    setemail("");
  }
  return (
    <form className={styles.form} onSubmit={handelforget}>
      <h1 className={styles.form_heading}>forget your password</h1>
      <label className={styles.form_label} htmlFor="email">
        Email address
      </label>
      <input
        className={styles.form_input}
        type="email"
        name="email"
        id="email"
        placeholder="exampel@io.com"
        required
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />
      <div className={styles.forget}>
        <button className={styles.btn}>reset password</button>
      </div>
    </form>
  );
}

export default Formforget;
