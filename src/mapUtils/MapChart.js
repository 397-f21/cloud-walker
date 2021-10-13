import React, {memo} from "react";
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";
import allStates from "../data/allstates.json";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const MapChart = ({setTooltipContent, location, setLocation, newPhotos, setPhotos}) => {
    return (
        <div>
            <ComposableMap data-tip="" projectionConfig={{scale: 0, center: [0, 0]}}>
                <ZoomableGroup center={[-115, 40]} zoom={2.9}>
                    <Geographies geography={geoUrl}>
                        {({geographies}) =>
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

    const numPic = photos ? (photos[cur.id] ? photos[cur.id].length : 0) : 0;
    return numPic > 7 ? "#782618" : colorRange[numPic];

}

const colorRange = [
    "#D6D6DA",
    "#ffcec5",
    "#ffad9f",
    "#ff8a75",
    "#ff5533",
    "#e2492d",
    "#be3d26",
    "#9a311f",
    "#782618"
]

export default memo(MapChart);