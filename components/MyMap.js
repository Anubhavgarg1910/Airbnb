import * as React from "react";
import Map, { Popup, Marker } from "react-map-gl";
import { getCenter } from "geolib";
import "mapbox-gl/dist/mapbox-gl.css";

function MyMap({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = React.useState({});
  const coordinates = searchResults.map((result) => ({
    latitude: result.lat,
    longitude: result.long,
  }));

  const center = getCenter(coordinates);

  const [viewport, setViewport] = React.useState({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  console.log(selectedLocation);

  return (
    <Map
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/anubhavgarg1910/clfxprpnm002i01t7da3xwt69"
      mapboxAccessToken="pk.eyJ1IjoiYW51YmhhdmdhcmcxOTEwIiwiYSI6ImNsZnhwbnhndDBvcWwzZ28wcnZlZ2g1aWgifQ.dvZTsRawznYD34_aCrSK1w"
      {...viewport}
      onMove={(nextViewport) => setViewport(nextViewport.viewport)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            // anchor="bottom"
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              // role="img"
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer text-2xl animate-bounce  "
              // aria-label="push-pin"
            >
              📌
            </p>
          </Marker>

          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={false}
              longitude={result.long}
              latitude={result.lat}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </Map>
  );
}

export default MyMap;
