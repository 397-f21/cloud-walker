import {useState} from 'react';
import {getStorage, uploadBytes, ref} from "firebase/storage";
import {pushRealtimeDb, setRealtimeDb, useUserState} from "../utilities/firebase";
import {getDownloadURL} from "firebase/storage";


const storage = getStorage();

const UploadPhoto = ({location, setPhotos}) => {
    const [uploadImage, setUploadImage] = useState('');
    const [user] = useUserState();

    const upload = () => {
        if (!user) {
            alert('Please login to access your beautiful memories!');
            return;
        }
        // TODO displayName or uid?
        const userName = user.displayName;

        if (location === '') {
            alert('Please select a location on the map first!');
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
            saveDownloadUrl(userName, location, filePath, setPhotos);
        });

    }

    return (
        <div className="App">
            <center>
                <input type="file" accept="image/png, image/gif, image/jpeg" onChange={(e) => {
                    setUploadImage(e.target.files[0])
                }}/>
                <button class="btn btn-primary" onClick={upload}>Upload</button>
            </center>
        </div>
    );
}

const saveDownloadUrl = (user, location, filePath, setPhotos) => {
    getDownloadURL(ref(storage, filePath)).then((url) => {
        console.log("UpdatedPhotoURL:", url)
        pushRealtimeDb(`userPhoto/${user}/${location}/`, url, setPhotos);

    });
}

export default UploadPhoto;
