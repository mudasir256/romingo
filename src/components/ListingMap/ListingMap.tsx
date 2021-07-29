import Box from "@material-ui/core/Box";
import React from "react";
import { FC } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import ListingCardMap from "../ListingCardMap/ListingCardMap";

import { stylesArray } from "./GoogleMapStyles";

interface Props {
  center: { lat: number; lng: number };
}

const mapCenter = {
  lat: 32.22095,
  lng: -110.97067,
};

const containerStyle = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const ListingMap: FC<Props> = ({ center }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBQdGurIVjZYjX22m_EVRwA4vRO5hFLD7M", // ,
    // ...otherOptions
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.setOptions(stylesArray);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  console.log(stylesArray);

  return isLoaded ? (
    <Box
      sx={{
        color: "text.primary",
        borderRadius: 0,
        p: 0,
        m: 0,
        boxShadow: 4,
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          bottom: 80,
          left: "50%",
          marginLeft: { xs: "-150px", sm: "-125px" },
          zIndex: 1000,
        }}
      >
        <ListingCardMap
          image="http://vcmp-hotels.cert.sabre.com/image/upload/f_auto,q_auto:best,t_vcmp_medium/hotel/i/48961/kaoe46zlotylxgsevuxe.jpg"
          name="Staybridge Suites Las Colinas"
          location="1201 Executive Circle, Irving, TX"
          score={5}
          price={140}
          amenities={["dog park nearby", "pet friendly rooftop"]}
        />
      </Box>
      <GoogleMap
        center={mapCenter}
        mapContainerStyle={containerStyle}
        options={{
          fullscreenControl: false,
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          keyboardShortcuts: false,
        }}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
      </GoogleMap>
    </Box>
  ) : (
    <></>
  );
};

export default ListingMap;
