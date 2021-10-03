import {useState} from 'react';
import {getStorage, uploadBytes,ref} from "firebase/storage";

const UploadPhoto = () => {

    const [uploadImage, setUploadImage] = useState('');
    const upload = () => {
        if (uploadImage == null)
            return;
        const storage = getStorage();
        const storageRef = ref(storage, `/images/${uploadImage.name}`);
        // storageRef.put(uploadImage).on("state_changed", alert("success"), alert);
        uploadBytes(storageRef, uploadImage).then((snapshot) => {
            console.log('Uploaded a blob or file!');
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

export default UploadPhoto;
