import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MapChart from './mapUtils/MapChart';
import React, {useState} from "react";
import ReactTooltip from "react-tooltip";
import {PhotoCardList} from './photoUtils/photoCardList';
import UploadPhoto from "./photoUtils/uploadPhoto";

function App() {

    const [content, setContent] = useState("");
    const [location, setLocation] = useState("");
    const [photos, setPhotos] = useState([]);

    return (
        <div className="App">
            <div class="col-5">
                <div class="card m-3 p-2 mdb-color lighten-2 text-center z-depth-2">
                    <h1> Location: {location}</h1>
                    <PhotoCardList photos={photos}/>
                </div>
            </div>

            <div class="card col-6 m-3 p-2">
                <MapChart setTooltipContent={setContent} location={setLocation} setLocation={setLocation}
                          photos={photos} setPhotos={setPhotos}/>
                <ReactTooltip>{content}</ReactTooltip>
            </div>
            <div class="card col-6 m-3 p-2">
                <UploadPhoto></UploadPhoto>
            </div>
        </div>

    );
}


export default App;
