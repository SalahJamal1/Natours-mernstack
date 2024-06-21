import styles from "./MainTour.module.css";
import TourSection2 from "./TourSection2";
import TourImages from "./TourImages";
import Map from "./Map";
import Tourreview from "./Tourreview";
import TourBook from "./TourBook";
import TourHeader from "./TourHeader";
import Error from "../../ui/Error";
import Loader from "../../ui/Loader";
import { useTour } from "../../hooks/useTour";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
function MainTour() {
  const params = useParams();
  const { id } = params;
  const { isLoading, error, getApi, tour } = useTour();
  useEffect(
    function () {
      getApi(id);
    },
    [id, getApi]
  );
  if (isLoading) return <Loader />;
  if (error) return <Error error={error} />;
  else
    return (
      <main className={styles.main}>
        <TourHeader tour={tour} />
        <TourSection2 tour={tour} />
        <TourImages tour={tour} />
        <Map />
        <Tourreview tour={tour} />
        <TourBook tour={tour} />
      </main>
    );
}

export default MainTour;
