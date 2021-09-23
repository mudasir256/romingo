/*global google*/
import { FC, useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import useWindowSize from "../../../hooks/UseWindowSize";
import stylesArray from "./GoogleMapStyles";
import Box from "@mui/material/Typography";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

interface Props {
  center: { lat: number; lng: number };
  height?: string | number | undefined;
  width?: string | number | undefined;
  markers?: {
    lat: number;
    lng: number;
    type: string;
    label?: string;
    price?: number;
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
  zoom = 10,
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

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAkA-fv2SsT1QiUyIVW7HBhxe-J1QcxKSA",
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
    lng: 0,
  });

  const [showInfoContents, setShowInfoContents] = useState("");

  const renderMap = () => (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      options={mapOptions}
      zoom={size.width > 720 ? zoom : zoom - 1}
    >
      {markers !== undefined &&
        markers.map((marker, key) => {
          if (marker.type === "hotel") {
            return (
              <Marker
                position={marker}
                animation={2}
                key={key}
                icon={{
                  url: "/images/icons/hotel_marker.svg",
                  scaledSize: new google.maps.Size(35, 35),
                }}
                onClick={(e: google.maps.MapMouseEvent) => {
                  if (markerClickCallBack) return markerClickCallBack(key);
                  else if (marker.label) {
                    setShowInfoPostion({
                      lat: marker.lat,
                      lng: marker.lng,
                    });
                    setShowInfo(true);
                    setShowInfoContents(marker.label);
                  } else return null;
                }}
                label={marker.price ? Math.round(marker.price).toString() : ""}
              />
            );
          } else {
            return (
              <Marker
                position={marker}
                animation={2}
                key={key}
                icon={{
                  url: "/images/icons/google-map-potty-park.svg",
                  scaledSize: new google.maps.Size(30, 30),
                }}
                onClick={(e: google.maps.MapMouseEvent) => {
                  if (markerClickCallBack) return markerClickCallBack(key);
                  else if (marker.label) {
                    setShowInfoPostion({
                      lat: marker.lat,
                      lng: marker.lng,
                    });
                    setShowInfo(true);
                    setShowInfoContents(marker.label);
                  } else return null;
                }}
              />
            );
          }
        })}
      {showInfo && (
        <InfoWindow
          position={showInfoPosition}
          onCloseClick={() => {
            setShowInfo(false);
          }}
        >
          <Box sx={{ px: 1, py: 0 }}>
            <Typography
              variant="h6"
              sx={{
                color: "primary.main",
                fontSize: "80%",
              }}
            >
              {showInfoContents}
            </Typography>
          </Box>
        </InfoWindow>
      )}
    </GoogleMap>
  );

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? (
    renderMap()
  ) : (
    <Skeleton
      variant="rectangular"
      animation="wave"
      height="100%"
      width="100%"
    />
  );
};

export default Map;
