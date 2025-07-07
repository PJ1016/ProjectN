import { logEvent } from "firebase/analytics";
import { analytics } from "../firebase";

const getCountryFromPhone = (phoneNumber?: string) => {
  if (!phoneNumber) return 'unknown';
  if (phoneNumber.startsWith('+1')) return 'US';
  if (phoneNumber.startsWith('+91')) return 'IN';
  return 'other';
};

export const trackUserAction = (
  action: string,
  email?: string,
  phoneNumber?: string,
  additionalData?: any
) => {
  logEvent(analytics, action, {
    user_email: email || "anonymous",
    phone_number: phoneNumber || "not_provided",
    user_country: getCountryFromPhone(phoneNumber),
    timestamp: new Date().toISOString(),
    ...additionalData,
  });
};

export const trackProductView = (
  productId: string,
  productName: string,
  email?: string,
  phoneNumber?: string
) => {
  logEvent(analytics, "view_item", {
    item_id: productId,
    item_name: productName,
    user_email: email || "anonymous",
    phone_number: phoneNumber || "not_provided",
    user_country: getCountryFromPhone(phoneNumber),
  });
};
