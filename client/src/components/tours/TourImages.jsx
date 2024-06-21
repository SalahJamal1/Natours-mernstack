import styles from "./TourImages.module.css";
function TourImages({ tour }) {
  return (
    <section className={styles.section}>
      <ul className={styles.imagesList}>
        {tour.images?.map((image, i) => (
          <li className={styles.image} key={i}>
            <img src={`../../public/img/tours/${image}`} alt="" />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TourImages;
