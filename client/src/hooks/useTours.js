import { useCallback, useState } from "react";
import { getTours } from "../service/Api";

export function useTours(Searchtour) {
  const [tour, settours] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState("");
  const getApi1 = useCallback(async function getApi1() {
    setisLoading(true);
    try {
      const { data } = await getTours();
      settours(data.data);
      setisLoading(false);
    } catch (err) {
      seterror(err.message);
      console.log(err.message);
      setisLoading(false);
    }
  }, []);
  const tours =
    Searchtour.length > 0
      ? tour.filter((el) =>
          `${el.name} ${el.description} ${el.difficulty}`
            .toLowerCase()
            .includes(Searchtour.toLowerCase())
        )
      : tour;
  return { getApi1, tours, isLoading, error };
}
