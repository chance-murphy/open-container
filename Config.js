import firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAAdtX7DGO9cRB3DaIPibbvxRqtCPBMbj8",
  authDomain: "open-container.firebaseapp.com",
  databaseURL: "https://open-container.firebaseio.com",
  projectId: "open-container",
  storageBucket: "open-container.appspot.com",
  messagingSenderId: "661149819762",
  appId: "1:661149819762:web:9f37176f7a9411baeef3eb"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();