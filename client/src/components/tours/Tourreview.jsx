import StartRatings from "../StartRatings";
import styles from "./Tourreview.module.css";
function Tourreview({ tour }) {
  const { reviews } = tour;

  return (
    <section className={styles.section}>
      <ul className={styles.list}>
        {reviews?.map((review, i) => (
          <li className={styles.item} key={i}>
            <div className={styles.user}>
              <img src={`/img/users/${review.user.photo}`} alt="" />
              <h3>{review.user.name}</h3>
            </div>
            <p className={styles.text}>{review.review}</p>
            <StartRatings rate={review.rating} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Tourreview;
