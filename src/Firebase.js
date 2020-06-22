/* eslint-disable no-debugger, no-console*/
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


// Firebase configuration
firebase.initializeApp({
    apiKey: "AIzaSyDNWr8ZawjMF3ndaChNRGozTecjUkTJ2C0",
    authDomain: "econocoin-web.firebaseapp.com",
    databaseURL: "https://econocoin-web.firebaseio.com",
    projectId: "econocoin-web",
    storageBucket: "econocoin-web.appspot.com",
    messagingSenderId: "79453815661",
    appId: "1:79453815661:web:c78b81ace8155bda"
});

// Exporting Firebase instances
export const FA = firebase.auth();
export const FFS = firebase.firestore();
