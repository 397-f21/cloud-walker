import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MapChart from './mapUtils/MapChart';
import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import { PhotoCardList } from './photoUtils/photoCardList';
import {useData} from "./utilities/firebase";
function App() {
console.log(useData('/'));
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [photos, setPhotos] = useState([]);

  return (

    <div className="App">
      <h1 className="display-2">CloudWalker</h1>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-5">
            <div className="card m-3 p-2">
              <MapChart setTooltipContent={setContent} location={setLocation} setLocation={setLocation} photos={photos} setPhotos={setPhotos} />
              <ReactTooltip>{content}</ReactTooltip>
            </div>
          </div>
          <div className="col-sm-12 col-md-5">
            <div className="card m-3 p-2 mdb-color lighten-2 text-center z-depth-2 scroll">
              <h1> Location: {location}</h1>
              {photos.length === 0 ? "No Photo Available" : <PhotoCardList photos={photos} /> }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
