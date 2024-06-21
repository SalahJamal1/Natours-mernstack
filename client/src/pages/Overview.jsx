import { useEffect, useState } from "react";
import Cards from "../components/cards/Cards";
import Main from "../components/Main";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import { useTours } from "../hooks/useTours";

function Overview() {
  const [Searchtour, setSearchtour] = useState("");
  const { getApi1, tours, error, isLoading } = useTours(Searchtour);

  useEffect(
    function () {
      getApi1();
    },
    [getApi1]
  );
  return (
    <>
      <Header Searchtour={Searchtour} setSearchtour={setSearchtour} />
      <Main>
        <Cards tours={tours} error={error} isLoading={isLoading} />
      </Main>
      <Footer />
    </>
  );
}

export default Overview;
