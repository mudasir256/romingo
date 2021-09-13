import Box from "@mui/material/Box";
import { FC } from "react";
import { useHistory } from "react-router-dom";
import { CSSObject } from "@mui/material";
import Link from "@mui/material/Link";
import ListingCardMap from "../ListingCardMap/ListingCardMap";
import Map from "../UI/Map/Map";
import Skeleton from "@mui/material/Skeleton";
import Hidden from "@mui/material/Hidden";

interface Props {
  center: { lat: number; lng: number };
  sx?: CSSObject;
  loading?: boolean;
  markers?: {
    lat: number;
    lng: number;
  }[];
  name: string;
  location: string;
  score: number;
  price: number;
  image: string;
  amenities?: string[];
  markerClickCallBack: (index: number) => void;
  selectedMarker?: number;
}

const ListingMap: FC<Props> = ({
  center,
  loading = false,
  sx,
  markers,
  name,
  location,
  score,
  price,
  image,
  amenities,
  markerClickCallBack,
  selectedMarker,
}) => {
  const history = useHistory();

  return (
    <Box
      sx={{
        color: "text.primary",
        borderRadius: 0,
        p: 0,
        m: 0,
        boxShadow: 4,
        width: { xs: "100%", md: "45%" },
        height: "100%",
        position: "relative",
        overflow: "hidden",
        ...sx,
      }}
    >
      {loading ? (
        <Skeleton
          variant="rectangular"
          animation="wave"
          height="100%"
          width="100%"
        />
      ) : (
        <>
          <Map
            center={center}
            width={"100%"}
            markers={markers}
            markerClickCallBack={markerClickCallBack}
            selectedMarker={selectedMarker}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 80,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 100,
            }}
          >
            <Link
              href="#"
              sx={{
                textDecoration: "none",
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                history.push("/details/1");
              }}
            >
              <Hidden mdUp>
                <ListingCardMap
                  image={image}
                  name={name}
                  location={location}
                  score={score}
                  price={price}
                  amenities={amenities}
                />
              </Hidden>
            </Link>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ListingMap;
