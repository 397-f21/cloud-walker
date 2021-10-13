import React, { memo } from "react";
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";
import allStates from "../data/allstates.json";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";



const MapChart = ({ setTooltipContent, location, setLocation, newPhotos, setPhotos }) => {
    return (
        <div>
            <ComposableMap data-tip="" projectionConfig={{ scale: 0, center: [0, 0] }}>
                <ZoomableGroup center={[-115, 40]} zoom={2.9}>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map(geo => (
                                <Geography
                                    key={geo.rsmKey}

                                    // Color Each location base on the number of photos
                                    fill={getColor(newPhotos, allStates, geo.id, location)}

                                    geography={geo}
                                    onMouseEnter={() => {
                                        const cur = allStates.find(s => s.val === geo.id);
                                        setTooltipContent(`${cur.id}: You have ${newPhotos ? (newPhotos[cur.id] ? newPhotos[cur.id].length : 0) : 0} pictures here`);
                                    }}

                                    onClick={() => {
                                        const cur = allStates.find(s => s.val === geo.id);
                                        setLocation(cur.id);
                                        setPhotos(newPhotos ? (newPhotos[cur.id] ? newPhotos[cur.id] : []) : []);
                                    }
                                    }

                                    onMouseLeave={() => {
                                        setTooltipContent("");
                                    }}

                                    style={{
                                        hover: {
                                            fill: "#0174BE",
                                            outline: "none"
                                        },
                                        pressed: {
                                            fill: "#0174BE",
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

const getColor = (photos, allStates, id, location) => {
    const cur = allStates.find(s => s.val === id);
    if (cur.id === location) {
        return "#0174BE";
    }
    const maxNumPic = Math.max(...allStates.map(state => photos[state.id] ? photos[state.id].length : 0))
    const numPic = photos ? (photos[cur.id] ? photos[cur.id].length : 0) : 0;
    const rgb = `rgb(${numPic > 0
        ? lightred.map((item, index) => item - (numPic / maxNumPic) * difference[index]).join(',')
        : grey.join(',')})`
    return rgb

}

const grey = [218, 214, 214]
const red = [255, 0, 0]
const lightred = [237, 229, 149]
const difference = lightred.map((item, index) => item - red[index])

export default memo(MapChart);