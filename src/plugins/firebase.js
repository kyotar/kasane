import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app';
import 'firebase/firestore';

Vue.use(firestorePlugin)

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB-bZ90pVESpyCeKBR_w-UjB5P1WQvLxXs",
  authDomain: "kasane-app.firebaseapp.com",
  databaseURL: "https://kasane-app.firebaseio.com",
  projectId: "kasane-app",
  storageBucket: "kasane-app.appspot.com",
  messagingSenderId: "418693322497",
  appId: "1:418693322497:web:f15047aa4a1b51db"
});

const db = firebaseApp.firestore();
export default db
