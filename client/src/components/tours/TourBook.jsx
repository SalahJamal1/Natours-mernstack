import { loadStripe } from "@stripe/stripe-js";
import { Link } from "react-router-dom";
import styles from "./TourBook.module.css";
import { useSelector } from "react-redux";
import { booking } from "../../service/Api";
function TourBook({ tour }) {
  async function handelbook(e) {
    const stripe = await loadStripe(
      "pk_test_51PNdhAKdu5i7flk3zTO3PhFFXx4hOy5KspRSSB2YYT7X2llhhSy00PkURRfbmoWeHcRqRORNVzkkdCH6UFdKHcH000dhq0dHmY"
    );
    e.preventDefault();
    const x = await booking(tour.id);
    console.log(x);
    stripe.redirectToCheckout({
      sessionId: x.data.session.id,
    });
  }

  const { user } = useSelector((store) => store.Account);
  return (
    <section className={styles.section}>
      <div className={styles.book}>
        <div className={styles.images}>
          {tour.images?.map((image, i) => (
            <img src={`../../public/img/tours/${image}`} alt="" key={i} />
          ))}
        </div>
        <div className={styles.text}>
          <div className="">
            <h3>WHAT ARE YOU WAITING FOR?</h3>
            <p>10 days. 1 adventure. Infinite memories. Make it yours today!</p>
          </div>
          {user ? (
            <Link className={styles.btns} onClick={handelbook}>
              Book tour!
            </Link>
          ) : (
            <Link to="/login" className={styles.btns}>
              Login to Book tour!
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default TourBook;
