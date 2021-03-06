import {initializeApp} from "firebase/app";
// import {getStorage} from "firebase/storage";
import {useState, useEffect} from "react";
import {getDatabase, ref, onValue, set, push} from "firebase/database";
import {getDownloadURL, getStorage} from "firebase/storage";
import {getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut} from 'firebase/auth';
import data from "bootstrap/js/src/dom/data";
// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
    apiKey: "AIzaSyBnpa0B7Ny2YkM9TYy2oKojRoPB7nvqSUU",
    authDomain: "cloud-walker-c72ce.firebaseapp.com",
    databaseURL: "https://cloud-walker-c72ce-default-rtdb.firebaseio.com",
    projectId: "cloud-walker-c72ce",
    storageBucket: "cloud-walker-c72ce.appspot.com",
    messagingSenderId: "1052972835713",
    appId: "1:1052972835713:web:9ca801f35080576ed8fe80",
    measurementId: "G-V752NXG2FK"
};


// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);
const database = getDatabase(firebaseApp);

export const setRealtimeDb = (path, content) => {
    set(ref(database, path), content)
}
export const signInWithGoogle = () => {
    signInWithPopup(getAuth(firebaseApp), new GoogleAuthProvider());
};
export const useUserState = () => {
    const [user, setUser] = useState();

    useEffect(() => {
        onIdTokenChanged(getAuth(firebaseApp), setUser);
    }, []);

    return [user];
};

const firebaseSignOut = () => signOut(getAuth(firebaseApp));

export {firebaseSignOut as signOut};

// append a content to the array at path
export const pushRealtimeDb = (path, content, setPhotos) => {
    onValue(ref(database, path), (snapshot) => {
        let data = snapshot.val();
        console.log(data);

        if (!data) {
            data = [];
        }
        data.push(content);
        setRealtimeDb(path, data);
        setPhotos(data);
    }, {onlyOnce: true});


}
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


export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const dbRef = ref(database, '/');
        console.log(database);
        const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
        if (devMode) {
            console.log(`loading ${path}`);
        }
        return onValue(dbRef, (snapshot) => {
            const val = snapshot.val();
            if (devMode) {
                console.log(val);
            }
            setData(transform ? transform(val) : val);
            setLoading(false);
            setError(null);
        }, (error) => {
            setData(null);
            setLoading(false);
            setError(error);
        });
    }, [path, transform]);

    return [data, loading, error];
};