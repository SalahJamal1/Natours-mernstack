import { useState } from "react";
import styles from "./FromSignup.module.css";
import { Signup } from "../../service/Api";
import { useNavigate } from "react-router-dom";
function FromSignup() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordConfrim, setpasswordConfrim] = useState("");
  const [name, setname] = useState("");
  const [error, sererror] = useState("");
  const nav = useNavigate();
  async function handelSignup(e) {
    e.preventDefault();

    if (!email && !password && !name && !passwordConfrim) return;
    try {
      const data = await Signup({ email, password, name, passwordConfrim });
      if (data.data.status === "success") nav("/login");
    } catch (err) {
      console.log(err);
      sererror(err);
    }
  }
  return (
    <form className={styles.form} onSubmit={handelSignup}>
      <h1 className={styles.form_heading}>SIGN UP YOUR ACCOUNT</h1>
      {error && <p className="errors">{error.response.data.message}</p>}

      <div className={styles.forms}>
        <div className="">
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
        </div>
        <div className="">
          <label className={styles.form_label} htmlFor="name">
            Name
          </label>
          <input
            className={styles.form_input}
            type="text"
            name="name"
            id="name"
            placeholder="name"
            required
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>
        <div className="">
          <label className={styles.form_label} htmlFor="password">
            Password
          </label>
          <input
            className={styles.form_input}
            type="password"
            placeholder="*********"
            name="password"
            id="password"
            required
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <div className="">
          <label className={styles.form_label} htmlFor="passwordConfrim">
            Confirm The Password
          </label>
          <input
            className={styles.form_input}
            type="password"
            placeholder="*********"
            name="passwordConfrim"
            id="passwordConfrim"
            required
            value={passwordConfrim}
            onChange={(e) => setpasswordConfrim(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.btns}>
        <button className={styles.btn}>SIGN UP</button>
      </div>
    </form>
  );
}

export default FromSignup;
