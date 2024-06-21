import styles from "./StartRatings.module.css";
function StartRatings({ rate }) {
  return (
    <span className={styles.stars}>
      {Array.from({ length: 5 }, (_, i) => (
        <ion-icon name={rate > i ? `star` : "star-outline"} key={i}></ion-icon>
      ))}
    </span>
  );
}

export default StartRatings;
