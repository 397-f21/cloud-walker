import {initializeApp} from "firebase/app";
// import {getStorage} from "firebase/storage";
import {useState, useEffect} from "react";
import {getDatabase,ref,onValue} from "firebase/database";
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
// const storage = getStorage(firebaseApp);
const database = getDatabase(firebaseApp);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const dbRef = ref(database,'/');
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