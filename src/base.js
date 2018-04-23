import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  // input db credentials from firebase
  apiKey: 'AIzaSyCDZHV3JNPMM7yDEMZVmpt7yfNSiJQOuks',
  authDomain: 'catch-of-the-day-muller.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-muller.firebaseio.com',
});

const base = Rebase.createClass(firebaseApp.database());

// named export
export { firebaseApp };

// default export...obviously
export default base;
