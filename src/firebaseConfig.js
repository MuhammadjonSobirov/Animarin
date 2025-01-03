
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAunIDncdBe1ULYUOt8jgiLSE1NkVtpSsU",
  authDomain: "animarindatabase.firebaseapp.com",
  databaseURL: "https://animarindatabase-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "animarindatabase",
  storageBucket: "animarindatabase.firebasestorage.app",
  messagingSenderId: "313824387938",
  appId: "1:313824387938:web:837c207580b8220180023b",
  measurementId: "G-XT9QVFCHHJ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export default app
export { storage }