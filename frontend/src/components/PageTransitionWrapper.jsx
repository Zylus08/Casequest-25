import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SwordLoader from "./SwordLoader";

export default function PageTransitionWrapper({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [location.pathname]);

  return (
    <>
      {loading ? (
        <SwordLoader onFinished={() => setLoading(false)} />
      ) : (
        children
      )}
    </>
  );
}