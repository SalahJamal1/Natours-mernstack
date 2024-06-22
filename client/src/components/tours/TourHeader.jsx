import styles from "./TourHeader.module.css";
function TourHeader({ tour }) {
  return (
    <section className={styles.header}>
      <img
        src={`/img/tours/${tour.imageCover}`}
        alt=""
        className={styles.imageCover}
      />
      <div className={styles.box}>
        <h1 className={styles.heading}>{tour.name}</h1>
        <span className={styles.days}>{tour.locations?.at(0).day} DAYS</span>
        <span className={styles.city}>{tour.startLocation?.description}</span>
      </div>
    </section>
  );
}

export default TourHeader;
