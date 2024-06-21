import styles from "./Card.module.css";
import { Link } from "react-router-dom";
function Card({ tour }) {
  const date = new Date(tour.startDates[0]).toLocaleString("en-us", {
    year: "numeric",
    month: "long",
  });

  return (
    <li className={styles.card}>
      <div className={styles.main_cards__box_image}>
        <img
          src={`/public/img/tours/${tour.images[0]}`}
          alt={tour.name}
          className={styles.main_cards_image}
        />
        <h1 className={styles.card_tours}>{tour.name}</h1>
      </div>
      <div className={styles.main_cards_text}>
        <h6>
          {tour.difficulty} {tour.locations[0].day}-DAY TOUR
        </h6>
        <p>{tour.summary}</p>
        <ul className={styles.main_cards_text_list}>
          <li className={styles.main_cards_text_item}>
            {tour.startLocation.description}
          </li>
          <li className={styles.main_cards_text_item}>{date}</li>
          <li className={styles.main_cards_text_item}>
            {tour.locations[0].day} stops
          </li>
          <li className={styles.main_cards_text_item}>
            {tour.maxGroupSize} people
          </li>
        </ul>
      </div>
      <div className={styles.main_card_footer}>
        <div className="">
          <p className={styles.main_card_footer_text}>
            $<b>{tour.price}</b> per person
          </p>
          <p className={styles.main_card_footer_text}>
            <b> {tour.ratingsAverage}</b> rating ({tour.ratingsQuantity})
          </p>
        </div>
        <Link to={`/tour/${tour.slug}`} className={styles.details}>
          details
        </Link>
      </div>
    </li>
  );
}

export default Card;
