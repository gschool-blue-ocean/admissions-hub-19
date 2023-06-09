import React from "react";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
// import "codemirror";
// import Firepad, {
//   IDatabaseAdapter,
//   IEditorAdapter,
//   IFirepadConstructorOptions,
// } from "@hackerrank/firepad";

function CodeEditor() {
  const [config, setConfig] = useState({
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    databaseURL: import.meta.env.VITE_databaseURL,
    projectId: import.meta.env.VITE_projectID,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appID,
  });
  const [firepadRef, setFirePadRef] = useState(null);
  const [firebaseApp, setFirebaseApp] = useState(initializeApp(config));
  const [db, setDb] = useState(getDatabase(firebaseApp));
  const [dbRef, setDbRef] = useState(ref(db));
  // template for generating session keys
  // console.log(dbRef);

  // const getExampleRef = () => {
  // var ref = getDatabase().ref();
  //   var hash = window.location.hash.replace(/#/g, "");
  //   if (hash) {
  //     ref = ref.child(hash);
  //   } else {
  //     ref = ref.push(); // generate unique location.
  //     window.location = window.location + "#" + ref.key; // add it as a hash to the URL.
  //   }
  //   if (typeof console !== "undefined") {
  //     console.log("Firebase data: ", ref.toString());
  //   }
  //   return ref;
  // };

  useEffect(() => {
    // let app = initializeApp(config);
    // setFirePadRef(getExampleRef());
  }, []);
  return <div>test</div>;
}

// use this to validate input !

// function replaceInvalidCharacters(str, replaceStr) {
//   return str.replace(/[ ./#$[\] ]/g, replaceStr);
// }

export default CodeEditor;
