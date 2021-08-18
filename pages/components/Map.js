import getCenter from "geolib/es/getCenter";
import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as React from "react";

function Map({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState([]);

  // Transform the search result into the {lat: 13.3223, lomg: w324.432} object

  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  //console.log(coordinates);

  // The latitude and longitude of the center of locations coordinates
  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  //console.log(selectedLocation);

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/titan22903/cksfpe1u402zv17k0movqcwtr"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role="img"
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin"
            >
              📌
            </p>
          </Marker>

          {/* The Popup that should show if we click on a marker */}
          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
