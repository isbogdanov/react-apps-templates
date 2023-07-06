import { initializeApp, getApps } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { firebaseConfig } from "./firebase.config";

const initialize = () => {
  const firebaseApp = initializeApp(firebaseConfig.firebase);
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  //console.log("firestore:", firestore);
  return { firebaseApp, firestore, auth };
};

const connectToEmulators = ({ firebaseApp, auth, firestore }) => {
  //console.log("connectin to emulator");
  if (location.hostname === "localhost") {
    connectAuthEmulator(auth, "http://localhost:9099", {
      // disableWarnings: true,
    });
    //console.log("Auth emulator connected");
    connectFirestoreEmulator(firestore, "localhost", 8080);
    //console.log("connected to emulator");
  }
  return { firebaseApp, auth, firestore };
};

const getFirebase = () => {
  console.log("getting fb apps: ", getApps());
  const existingApp = getApps().at(0);
  if (existingApp) return initialize();
  return connectToEmulators(initialize());
};

export default getFirebase;
