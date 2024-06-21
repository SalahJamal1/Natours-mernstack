import { Link, useNavigate } from "react-router-dom";
import styles from "./FromLogin.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Accountlogin } from "../../store/Account";
function FromLogin() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { Auth } = useSelector((store) => store.Account);
  const dispatch = useDispatch();
  const nav = useNavigate();
  async function handelLogin(e) {
    e.preventDefault();
    if (!email && !password) return;
    dispatch(Accountlogin({ email, password }));
    setemail("");
    setpassword("");
  }

  useEffect(
    function () {
      if (Auth) return nav("/");
    },
    [Auth, nav]
  );

  return (
    <form className={styles.form} onSubmit={handelLogin}>
      <h1 className={styles.form_heading}>LOG INTO YOUR ACCOUNT</h1>
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
      <div className={styles.btns}>
        <button className={styles.btn}>LOGIN</button>
        <Link to="/forgetpassword">Forget your password</Link>
      </div>
    </form>
  );
}

export default FromLogin;
