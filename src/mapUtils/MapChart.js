import React, { memo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

import allStates from "../data/allstates.json";


const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const MapChart = ({ setTooltipContent, location, setLocation, newPhotos, setPhotos}) => {
  return (
    <div>
      <ComposableMap data-tip="" projectionConfig={{ scale: 0, center:[0, 0]}}>
        <ZoomableGroup center={[ -115, 40 ]} zoom={2.9}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const cur = allStates.find(s => s.val === geo.id);
                    setTooltipContent(`${cur.id}`);
                    // setLocation(cur.id);
                  }}
                  
                  onClick={() => {
                    const cur = allStates.find(s => s.val === geo.id);
                    setLocation(cur.id);
                    setPhotos(newPhotos[cur.id] ? newPhotos[cur.id] : []);
                  }}

                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none"
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default memo(MapChart);