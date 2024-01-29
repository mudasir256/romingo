/*global google*/
import { FC, useState, useEffect } from "react";
import {
  GoogleMap,
  MarkerF,
  MarkerClustererF,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";

import useWindowSize from "../../../hooks/UseWindowSize";
import stylesArray from "./GoogleMapStyles";
import Skeleton from "@mui/material/Skeleton";
import ListingCard from "../../ListingCard";
interface Props {
  center: { lat: number; lng: number };
  height?: string | number | undefined;
  width?: string | number | undefined;
  markers?: {
    lat: number;
    lng: number;
    type: string;
    label?: string;
  }[];
  selectedMarker?: number;
  zoom?: number;
  clickable?: boolean;
  isFullScreen?: boolean;
  disabled?: boolean;
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

const libraries: Libraries = ['places'];

const initOptions = {
  fullscreenControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  zoomControl: false,
  zoomControlOptions: { position: 7 },
  keyboardShortcuts: false,
  styles: stylesArray,
}

const disabledOptions = { 
  gestureHandling: 'none', 
  disableDefaultUI: true 
}

const Map: FC<Props> = ({
  center,
  height,
  width,
  markers,
  zoom = 10,
  clickable = true,
  isFullScreen = false,
  disabled = false,
}) => {
  const [containerStyle, setContainerStyle] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [mapOptions, setMapOptions] = useState(initOptions);


  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAnlMeQQ072sRw22U6aG0zLTHbyh0g8TB0",
    libraries
  });

  const size = useWindowSize();

  useEffect(() => {
    setContainerStyle({ 
      width: width || size.width, 
      height: height || size.height,
    });

    let newOptions = disabled 
      ? { ...mapOptions, ...disabledOptions }
      : mapOptions
    if (size.width > 720 && !disabled) {
      newOptions = { ...newOptions, zoomControl: true}
    } else {
      newOptions = { ...newOptions, zoomControl: false}
    }

    setMapOptions(newOptions);
  }, [size]);

  const [showInfo, setShowInfo] = useState(false);
  const [showInfoPosition, setShowInfoPostion] = useState({
    lat: 0,
    lng: 0,
  });

  const [showInfoContents, setShowInfoContents] = useState(null);

  useEffect(() => {
    if(isFullScreen) {
      console.log('DEV: markers:', markers.length)

      const hotelMarkers = markers.filter(m => m.type == 'hotel');
      console.log('DEV: hotelMarkers.length:', hotelMarkers.length);
      console.log('DEV: disabled:', disabled)
    }
  }, [markers])

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      options={disabled 
        ? {
          ...mapOptions,
          ...disabledOptions,
        } : mapOptions
      }
      zoom={size.width > 720 ? zoom : zoom - 1}
    >
      {markers !== undefined && !disabled &&
        <MarkerClustererF
          options={{
            averageCenter: true,
            styles: [
              {
                textColor: 'black',
                url: "https://www.actuall.eu/wp-content/uploads/2016/10/cropped-White-box.jpg",
                height: 35,
                width: 45,
              },
            ]
          }}
        >
          {(clusterer) => (
            <div>
              {markers.map((marker, key) => (
                <MarkerF
                  position={{ 
                    lat: marker.lat, 
                    lng: marker.lng 
                  }}
                  // animation={google.maps.Animation.DROP}
                  clusterer={clusterer}
                  key={key}
                  label={isFullScreen ? `$${Math.abs(marker.lowestAveragePrice).toFixed(0)}` : 'TEST'}   
                  icon={{
                    url: isFullScreen
                      ? "https://www.actuall.eu/wp-content/uploads/2016/10/cropped-White-box.jpg"
                      : "https://storage.googleapis.com/romingo-development-public/images/front-end/icons/hotel_marker.svg",
                    scaledSize: new google.maps.Size(45, 35),
                  }}
                  onClick={(e: google.maps.MapMouseEvent) => {
                    console.log(marker)
                    if (!clickable) {
                      return
                    }
                    if (marker.label) {
                      setShowInfoPostion({
                        lat: marker.lat,
                        lng: marker.lng,
                      });
                      setShowInfoContents(marker.hotel);
                      setShowInfo(true);
                    }
                  }}
                />
              ))}
            </div>
          )}
        </MarkerClustererF>
      }
      {showInfo && (
        <InfoWindow
          position={showInfoPosition}
          onCloseClick={() => {
            setShowInfo(false);
          }}
        >
          <ListingCard {...showInfoContents} hotel={showInfoContents} />
        </InfoWindow>
      )}
    </GoogleMap>
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
