import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logEvent } from "firebase/analytics";
import { analytics } from "../firebase";

export const usePageView = () => {
  const location = useLocation();

  useEffect(() => {
    logEvent(analytics, "page_view", {
      page_path: location.pathname,
    });
  }, [location]);
};
