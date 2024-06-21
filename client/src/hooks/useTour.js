import { useCallback, useState } from "react";
import { getTourslug } from "../service/Api";

export function useTour() {
  const [tour, settour] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState("");

  const getApi = useCallback(async function getApi(slug) {
    setisLoading(true);
    try {
      const { data } = await getTourslug(slug);
      settour(data.data);
      setisLoading(false);
    } catch (err) {
      seterror(err.message);
      setisLoading(false);
      console.log(err.message);
    }
  }, []);
  return { tour, isLoading, error, getApi };
}
