import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';



const firebaseConfig = {
    apiKey: "AIzaSyCJgWJCJJKg6TBhJHE7d7RxsQmxB9YmEkQ",
    authDomain: "cs392-tutorial0.firebaseapp.com",
    databaseURL: "https://cs392-tutorial0-default-rtdb.firebaseio.com",
    projectId: "cs392-tutorial0",
    storageBucket: "cs392-tutorial0.appspot.com",
    messagingSenderId: "1034506961225",
    appId: "1:1034506961225:web:2b75b30bdcb6108c8c9a98",
    measurementId: "G-XM1QL22D5P"
  };

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const auth = getAuth(firebase);

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => (
    onValue(ref(database, path), (snapshot) => {
     setData( snapshot.val() );
    }, (error) => {
      setError(error);
    })
  ), [ path ]);

  return [ data, error ];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback(async(value) => {
    update(ref(database, path), value)
    .then(() => setResult(makeResult()))
    .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [updateData, result];
};

export { firebase, database, auth };

export const signInWithGoogle = () => {
  signInWithPopup(auth, new GoogleAuthProvider());
};

export const signOut = () => firebaseSignOut(auth);

export const useAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => (
      onAuthStateChanged(auth, setUser)
  ), []);

  return [user];
};