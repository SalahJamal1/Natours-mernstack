import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Logout } from "../service/Api";
import { logout } from "../store/Account";
function Header({ Searchtour, setSearchtour }) {
  const { user } = useSelector((store) => store.Account);
  const dispatch = useDispatch();
  async function handelLogout(e) {
    e.preventDefault();
    const res = await Logout();
    console.log(res);
    if (res.data.status === "success") {
      dispatch(logout());
    }
  }
  return (
    <header className="header">
      <nav className="nav">
        <div className="se">
          <Link to="/" className="nav_heading">
            ALL Tours
          </Link>
          <input
            type="text"
            className="search"
            placeholder="tour..."
            value={Searchtour}
            onChange={(e) => setSearchtour(e.target.value)}
          />
        </div>
        <img src="/public/img/logo-white.png" alt="logo" className="logo" />
        <ul className="nav_list">
          {user ? (
            <>
              <img
                src={`../../public/img/users/${user.photo}`}
                alt={user.name}
                className="nav_image"
              />
              <li>
                <NavLink to="/account" className="nav_links">
                  {user.name}
                </NavLink>
              </li>
              <li>
                <NavLink className="nav_links" onClick={handelLogout}>
                  Log out
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink className="nav_links" to="/login">
                  Log in
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup" className="nav_links btns">
                  SIGN UP
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
