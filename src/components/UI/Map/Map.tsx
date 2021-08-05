import { FC, useState, useEffect } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import useWindowSize from "../../../hooks/UseWindowSize";
import stylesArray from "./GoogleMapStyles";

interface Props {
  center: { lat: number; lng: number };
}

const Map: FC<Props> = ({ center }) => {
  const [containerStyle, setContainerStyle] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [mapOptions, setMapOptions] = useState({
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    zoomControl: false,
    zoomControlOptions: { position: 7 },
    keyboardShortcuts: false,
    styles: stylesArray,
  });
  const size = useWindowSize();
  useEffect(() => {
    setContainerStyle(size);
    if (size.width > 720) {
      setMapOptions({ ...mapOptions, zoomControl: true });
    } else {
      setMapOptions({ ...mapOptions, zoomControl: false });
    }
  }, [size]);

  return (
    <LoadScript googleMapsApiKey={"AIzaSyCiG_g1goO4MNFO3GNUYu9Vk5pthTorwGA"}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        options={mapOptions}
        zoom={11}
        onResize={() => console.log("Size changed")}
      >
        <></>
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
