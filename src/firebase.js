import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyB-bZ90pVESpyCeKBR_w-UjB5P1WQvLxXs",
  authDomain: "kasane-app.firebaseapp.com",
  databaseURL: "https://kasane-app.firebaseio.com",
  projectId: "kasane-app",
  storageBucket: "kasane-app.appspot.com",
  messagingSenderId: "418693322497",
  appId: "1:418693322497:web:f15047aa4a1b51db"
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase
