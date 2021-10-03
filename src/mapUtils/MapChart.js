import React, { memo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

import allStates from "../data/allstates.json";


const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21]
};

const MapChart = ({ setTooltipContent, location, setLocation, photos, setPhotos}) => {
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
                  
                  // onClick={() => {
                  //   const cur = allStates.find(s => s.val === geo.id);
                  //   setLocation(cur.id);
                  //   changePhotos(cur.id, photos, setPhotos);
                  // }}

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