/*global google*/
import { FC, useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import useWindowSize from "../../../hooks/UseWindowSize";
import stylesArray from "./GoogleMapStyles";
import Typography from "@mui/material/Typography"

interface Props {
  center: { lat: number; lng: number };
  height?: string | number | undefined;
  width?: string | number | undefined;
  markers?: {
    lat: number;
    lng: number;
    label?: string;
  }[];
  markerClickCallBack?: (index: number) => void;
  selectedMarker?: number;
  zoom?: number;
}

interface Size {
  width: string | number | undefined;
  height: string | number | undefined;
}

const Map: FC<Props> = ({
  center,
  height,
  width,
  markers,
  markerClickCallBack,
  selectedMarker,
  zoom = 10
}) => {
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

  const [showInfo, setShowInfo] = useState(false);
  const [showInfoPosition, setShowInfoPostion] = useState({
    lat: 0,
    lng: 0
  });

  const [showInfoContents, setShowInfoContents] = useState("");

  return (
    <LoadScript googleMapsApiKey={"AIzaSyAkA-fv2SsT1QiUyIVW7HBhxe-J1QcxKSA"}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        options={mapOptions}
        zoom={(size.width > 720) ? zoom : (zoom - 1)}
      >
        {markers !== undefined &&
          markers.map((marker, key) => {
            return (
              <Marker
                position={marker}
                animation={2}
                key={key}
                icon={{
                  url: "/images/icons/hotel_marker.svg",
                  scaledSize: new google.maps.Size(18, 18)
                }}
                onClick={(e: google.maps.MapMouseEvent) => {
                  if (markerClickCallBack) return markerClickCallBack(key);
                  else if (marker.label) {
                    setShowInfoPostion({
                      lat: marker.lat,
                      lng: marker.lng
                    });
                    setShowInfo(true);
                    setShowInfoContents(marker.label);
                  }
                  else return null;
                }}
                opacity={
                  selectedMarker !== undefined && selectedMarker === key
                    ? 1
                    : 0.5
                }
              />
            );
          })}
          {showInfo && (<InfoWindow
            position={showInfoPosition}
            onCloseClick={() => {
              setShowInfo(false);
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "secondary.main"
              }}
            >
              {showInfoContents}
            </Typography>
          </InfoWindow>)}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
