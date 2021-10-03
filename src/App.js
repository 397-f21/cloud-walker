import logo from './logo.svg';
import './App.css';
import MapChart from './mapUtils/MapChart';
import React, { useState } from "react";
import ReactTooltip from "react-tooltip";

function App() {

  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [photos, setPhotos] = useState([]);

  return (
    <div className="App">
      <div class="card col-6 m-3 p-2">

        <MapChart setTooltipContent={setContent} location={setLocation} setLocation={setLocation} photos={photos} setPhotos={setPhotos}/>
        <ReactTooltip>{content}</ReactTooltip>
      </div>
    </div>
  );
}

export default App;
