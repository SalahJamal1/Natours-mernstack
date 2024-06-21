import styles from "./TourSection2.module.css";
function TourSection2({ tour }) {
  let date;
  if (tour.startDates) {
    date = new Date(tour.startDates[0]).toLocaleString("en-us", {
      year: "numeric",
      month: "long",
    });
  }
  const { guides } = tour;
  return (
    <section className={styles.section2}>
      <div className={styles.setion_2_lists}>
        <ul className={styles.details}>
          <h3 className={styles.heading}>QUICK FACTS</h3>
          <li className={styles.items}>
            NEXT DATE <span>{date}</span>
          </li>
          <li className={styles.items}>
            DIFFICULTY
            <span>{tour.difficulty}</span>
          </li>
          <li className={styles.items}>
            PARTICIPANTS
            <span>{tour.maxGroupSize} People</span>
          </li>
          <li className={styles.items}>
            RATING
            <span>{tour.ratingsAverage} / 5</span>
          </li>
        </ul>

        <ul className={styles.guides}>
          <h3 className={styles.heading}>YOUR TOUR GUIDES</h3>
          {guides?.map((guide, i) => (
            <li className={styles.guide} key={i}>
              <img
                src={`../../public/img/users/${guide.photo}`}
                alt="user.name"
              />
              <h6 className={styles.guide_heading}>
                {guide.role === "guide" ? "GUIDE" : guide.role}
                <span>{guide.name}</span>
              </h6>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.setion_2_descriptions}>
        <h3 className={styles.heading}>ABOUT THE PARK CAMPER TOUR</h3>
        <p>{tour.description}</p>
      </div>
    </section>
  );
}

export default TourSection2;
