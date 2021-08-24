import Box from "@material-ui/core/Box";
import { FC } from "react";
import { CSSObject } from "@material-ui/core";
import ListingCardMap from "../ListingCardMap/ListingCardMap";
import Map from "../UI/Map/Map";
import Skeleton from "@material-ui/core/Skeleton";
import { FormatListNumberedTwoTone } from "@material-ui/icons";

interface Props {
  center: { lat: number; lng: number };
  sx?: CSSObject;
  loading?: boolean;
}

const ListingMap: FC<Props> = ({ center, loading = false, sx }) => {
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
          <Map center={center} width={"100%"} />
          <Box
            sx={{
              position: "absolute",
              bottom: 80,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 100,
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
        </>
      )}
    </Box>
  );
};

export default ListingMap;
