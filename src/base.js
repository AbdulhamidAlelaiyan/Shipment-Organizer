import Rebase from 're-base';
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDh16_XxNS1I_Eyg5WUpr4uM3niLZghO10",
    authDomain: "shipments-organizer.firebaseapp.com",
    databaseURL: "https://shipments-organizer.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp};

export default base;