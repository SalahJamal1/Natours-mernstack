import { useSelector } from "react-redux";
import styles from "./Setting.module.css";
import { useState } from "react";
import { updateMe, updateMyPassword } from "../../service/Api";
function Setting() {
  const { user } = useSelector((store) => store.Account);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [photo, setphoto] = useState("");
  const [password, setpassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [currentpassword, setcurrentpassword] = useState("");
  async function handelupdateDate(e) {
    e.preventDefault();
    const form = new FormData();
    if (photo) form.append("photo", photo);
    if (name) form.append("name", name);
    if (email) form.append("email", email);
    const data = await updateMe(form);
    if (data.data.status === "success") location.reload();
  }
  async function handelupdatepass(e) {
    e.preventDefault();

    await updateMyPassword({ password, passwordConfirm, currentpassword });
  }
  return (
    <div className={styles.setting}>
      <div className={styles.dataSetting}>
        <h3>YOUR ACCOUNT SETTINGS</h3>
        <form className={styles.data} onSubmit={handelupdateDate}>
          <label className={styles.label} htmlFor="name">
            name
          </label>
          <input
            className={styles.input}
            type="text"
            placeholder="name"
            id="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <label className={styles.label} htmlFor="email">
            Email address
          </label>
          <input
            className={styles.input}
            type="email"
            placeholder="email@example.com"
            id="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <div className={styles.photo}>
            <img src={`/img/users/${user?.photo}`} alt={user?.name} />
            <label className={styles.labels} htmlFor="photo">
              Choose new photo
            </label>
            <input
              type="file"
              name="photo"
              id="photo"
              hidden
              accept="image/*"
              value={""}
              onChange={(e) => setphoto(e.target.files[0])}
            />
          </div>
          <div className={styles.btn}>
            <button className={styles.cta}>Save settings</button>
          </div>
        </form>
      </div>
      <div className={styles.dataSetting}>
        <h3>PASSWORD CHANGE</h3>
        <form className={styles.data} onSubmit={handelupdatepass}>
          <label className={styles.label} htmlFor="Currentpassword">
            Current password
          </label>
          <input
            className={styles.input}
            type="password"
            placeholder="*******"
            id="Currentpassword"
            value={currentpassword}
            onChange={(e) => setcurrentpassword(e.target.value)}
          />
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

export default Setting;
