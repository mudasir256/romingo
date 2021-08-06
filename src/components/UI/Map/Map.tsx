import { FC, useState, useEffect } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import useWindowSize from "../../../hooks/UseWindowSize";
import stylesArray from "./GoogleMapStyles";

interface Props {
  center: { lat: number; lng: number };
  height?: string | number | undefined;
  width?: string | number | undefined;
}

interface Size {
  width: string | number | undefined;
  height: string | number | undefined;
}

const Map: FC<Props> = ({ center, height, width }) => {
  const [containerStyle, setContainerStyle] = useState<Size>({
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
    if (!height && !width) {
      setContainerStyle(size);
    } else if (width) {
      setContainerStyle({
        width,
        height: size.height,
      });
    } else if (height) {
      setContainerStyle({
        width: size.width,
        height,
      });
    } else {
      setContainerStyle({ width, height });
    }
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
      >
        <></>
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
