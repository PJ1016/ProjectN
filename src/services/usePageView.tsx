import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logEvent, setUserId, setUserProperties } from "firebase/analytics";
import { analytics } from "../firebase";
import { useAppSelector } from "../store/hooks";

export const usePageView = () => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      // Only use internal or anonymized user ID — not email
      setUserId(analytics, user.uid);

      // You can set safe user properties, like a user type or role
      setUserProperties(analytics, {
        user_role: user.role || "user", // custom safe property
      });
    }

    // Log page view without any PII
    logEvent(analytics, "page_view", {
      page_path: location.pathname,
      user_id: user?.uid || null, // okay if this is an internal ID
    });
  }, [location, user]);
};
