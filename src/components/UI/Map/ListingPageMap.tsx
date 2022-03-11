import { FC, useState, useEffect, memo } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import useWindowSize from "../../../hooks/UseWindowSize";
import stylesArray from "./GoogleMapStyles";
import Skeleton from "@mui/material/Skeleton";

interface Props {
  center: { lat: number; lng: number };
  height?: string | number | undefined;
  width?: string | number | undefined;
  markers?: {
    lat: number;
    lng: number;
    type: string;
    price: number;
  }[];
  markerClickCallBack?: (index: number) => void;
  selectedMarker?: number;
  zoom?: number;
}

interface Size {
  width: string | number | undefined;
  height: string | number | undefined;
}

type Libraries = (
  | "drawing"
  | "geometry"
  | "localContext"
  | "places"
  | "visualization"
)[];

const libraries: Libraries = ["places"];

const ListingPageMap: FC<Props> = ({
  center,
  height,
  width,
  markers,
  markerClickCallBack,
  selectedMarker,
  zoom = 10,
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAnlMeQQ072sRw22U6aG0zLTHbyh0g8TB0",
    libraries,
  });
  const [localCenter, setLocalCenter] = useState(center);
  useEffect(() => {
    if (center.lat !== localCenter.lat) {
      setLocalCenter(center);
    }
  }, [center]);

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

  const renderMap = () => (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={localCenter}
      onCenterChanged={() => setLocalCenter(localCenter)}
      options={mapOptions}
      zoom={size.width > 720 ? zoom : zoom - 1}
    >
      {markers !== undefined &&
        markers.map((marker, key) => {
          return (
            <Marker
              position={marker}
              animation={2}
              key={key}
              zIndex={
                selectedMarker !== undefined && selectedMarker === key
                  ? 1000
                  : Math.random() * 100
              }
              icon={{
                url:
                  selectedMarker !== undefined && selectedMarker === key
                    ? "https://storage.googleapis.com/romingo-development-public/images/front-end/icons/black_marker.svg"
                    : "https://storage.googleapis.com/romingo-development-public/images/front-end/icons/white_marker.svg",
                scaledSize:
                  Math.round(marker.price).toString().length === 2
                    ? new google.maps.Size(37, 37)
                    : Math.round(marker.price).toString().length === 3
                    ? new google.maps.Size(40, 40)
                    : new google.maps.Size(45, 45),
              }}
              onClick={(e: google.maps.MapMouseEvent) => {
                if (markerClickCallBack) return markerClickCallBack(key);
                else return null;
              }}
              label={
                selectedMarker !== undefined && selectedMarker === key
                  ? {
                      text: "$" + Math.round(marker.price).toString(),
                      fontSize: "13px",
                      color: "white",
                    }
                  : {
                      text: "$" + Math.round(marker.price).toString(),
                      fontSize: "13px",
                    }
              }
            />
          );
        })}
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

export default memo(ListingPageMap);
