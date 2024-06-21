import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <img
        src="/public/img/logo-green.png"
        alt="footer-logo"
        className="footer-logo"
      />
      <div className="footer_">
        <ul className="footer_list">
          <li>
            <Link className="footer_item">About us</Link>
          </li>
          <li>
            <Link className="footer_item">Download apps</Link>
          </li>
          <li>
            <Link className="footer_item">Become a guide</Link>
          </li>
          <li>
            <Link className="footer_item">Careers</Link>
          </li>
          <li>
            <Link className="footer_item">Contact</Link>
          </li>
        </ul>
        <p className="footer_text">
          © {new Date().getFullYear()} by Salah abu-farha.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
