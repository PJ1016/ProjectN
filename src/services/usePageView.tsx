import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logEvent, setUserId, setUserProperties } from "firebase/analytics";
import { analytics } from "../firebase";
import { useAppSelector } from "../store/hooks";

export const usePageView = () => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Set user ID and properties if logged in
    if (user) {
      setUserId(analytics, user.uid);
      setUserProperties(analytics, {
        email: user.email,
        display_name: user.displayName,
      });
    }

    // Log page view with user context
    logEvent(analytics, "page_view", {
      page_path: location.pathname,
      user_email: user?.email || "anonymous",
      user_id: user?.uid || null,
    });
  }, [location, user]);
};
