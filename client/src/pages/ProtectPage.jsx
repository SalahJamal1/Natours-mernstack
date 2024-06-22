import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../ui/Loader";

function ProtectPage({ children }) {
  const nav = useNavigate("/");
  const { Auth, isLoading } = useSelector((store) => store.Account);

  useEffect(
    function () {
      if (!Auth && !isLoading) nav("/");
    },
    [Auth, nav, isLoading]
  );
  if (isLoading) return <Loader />;
  return Auth ? children : null;
}

export default ProtectPage;
