import {useState} from 'react';
import {getStorage, uploadBytes, ref} from "firebase/storage";
import {pushRealtimeDb, setRealtimeDb} from "../utilities/firebase";
import {getDownloadURL} from "firebase/storage";


const storage = getStorage();

const UploadPhoto = ({location}) => {
    const [uploadImage, setUploadImage] = useState('');


    const upload = () => {
        if (location === '') {
            alert('plz select a location on the map first!');
            return;
        }
        if (uploadImage === '')
            return;
        // TODO user folder?
        // TODO generate UUID for img file name
        const filePath = `/images/${uploadImage.name}`;
        const storageRef = ref(storage, filePath);
        uploadBytes(storageRef, uploadImage).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            alert('successful!');
            saveDownloadUrl('tangefei', location, filePath);
        });

    }

    return (
        <div className="App">
            <center>
                <input type="file" onChange={(e) => {
                    setUploadImage(e.target.files[0])
                }}/>
                <button onClick={upload}>Upload</button>
            </center>
        </div>
    );
}

const saveDownloadUrl = (user, location, filePath) => {
    getDownloadURL(ref(storage, filePath)).then((url) => {
        console.log("UpdatedPhotoURL:", url)
        pushRealtimeDb(`userPhoto/${user}/${location}/`, url);

    });
}

export default UploadPhoto;
