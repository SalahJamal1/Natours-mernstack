import styles from "./Cards.module.css";
import Card from "./Card";
import Loader from "../../ui/Loader";
import Error from "../../ui/Error";
function Cards({ tours, error, isLoading }) {
  if (isLoading) return <Loader />;
  if (error) return <Error error={error} />;
  return (
    <ul className={styles.main_cards}>
      {tours.map((tour) => (
        <Card tour={tour} key={tour.id} />
      ))}
    </ul>
  );
}

export default Cards;
