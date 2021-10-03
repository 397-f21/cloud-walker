import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from "react";
// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
  apiKey: '<your-api-key>',
  authDomain: '<your-auth-domain>',
  databaseURL: '<your-database-url>',
  storageBucket: 'gs://cloud-walker-c72ce.appspot.com'
};
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);

export const UpdatePhotos = (paths, photos, setPhotos) => {
  console.log("UpdatePhoto called")

  if (paths.length === 0) {
    setPhotos([]);
    return;
  }

  var results = [];

  paths.map(path => 
    getDownloadURL(ref(storage, path)).then((url) => {
      console.log("UpdatedPhotoURL:", url)
      results.push(url)
    })
  )
  setPhotos(results);
  return 0;
}