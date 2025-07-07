import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase';

export const trackUserAction = (action: string, email?: string, additionalData?: any) => {
  logEvent(analytics, action, {
    user_email: email || 'anonymous',
    timestamp: new Date().toISOString(),
    ...additionalData,
  });
};

export const trackProductView = (productId: string, productName: string, email?: string) => {
  logEvent(analytics, 'view_item', {
    item_id: productId,
    item_name: productName,
    user_email: email || 'anonymous',
  });
};

export const trackAddToCart = (productId: string, productName: string, price: number, email?: string) => {
  logEvent(analytics, 'add_to_cart', {
    currency: 'USD',
    value: price,
    items: [{
      item_id: productId,
      item_name: productName,
      price: price,
    }],
    user_email: email || 'anonymous',
  });
};

export const trackPurchase = (orderId: string, value: number, items: any[], email?: string) => {
  logEvent(analytics, 'purchase', {
    transaction_id: orderId,
    value: value,
    currency: 'USD',
    items: items,
    user_email: email || 'anonymous',
  });
};