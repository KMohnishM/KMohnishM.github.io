// Lightweight, safe Firebase initialization for Analytics
// Reads config from environment variables. Works in CRA when prefixed with REACT_APP_

import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

export async function initializeAnalytics() {
  try {
    // Only attempt if measurementId exists and window is available (browser)
    if (typeof window === "undefined" || !firebaseConfig.measurementId) {
      return null;
    }

    const app = initializeApp(firebaseConfig);
    const supported = await isSupported();
    if (!supported) {
      return null;
    }
    const analytics = getAnalytics(app);
    return analytics;
  } catch (_) {
    // Silently ignore analytics failures to avoid breaking the app
    return null;
  }
}


