import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import Stack from "@material-ui/core/Stack";
import Divider from "@material-ui/core/Divider";
import MapIcon from "@material-ui/icons/Map";
import { motion, useMotionValue } from "framer-motion";
import React, { FC, useRef, useState, MouseEventHandler } from "react";
import { useHistory } from "react-router-dom";
import { useWindowSize } from "react-use";
import Link from "@material-ui/core/Link";
import { connect, useStore, useDispatch, useSelector } from "react-redux";

import RomingoGuarantee from "../../components/RomingoGuarantee";
import { ListingCardProps } from "../../components/ListingCard/ListingCard";
import ListingCardSkeleton from "../../components/UI/ListingCardSkeleton";
import ListingCard from "../../components/ListingCard";
import ListingMap from "../../components/ListingMap";
import FilterBar from "../../components/FilterBar";
import { Button } from "@material-ui/core";
import Footer from "../../components/Footer";

const MotionBox = motion(Box);

interface Props {
  cards: ListingCardProps[];
  loading: boolean;
}

interface MapLocation {
  lat: number;
  lng: number;
}

const ScrollBarRef = React.createRef<HTMLDivElement>();
const refArray: React.RefObject<HTMLElement>[] = [];

const ListingPage: FC<Props> = ({ loading = false, ...props }) => {
  const cards = useSelector((state: any) => state.hotelListReducer.hotels);

  // const [mapCenter, setMapCenter] = useState<MapLocation>(cards[0].mapLocation ? {...cards[0].mapLocation} : { lat: 32.221, lng: -110.969 });

  const markers: MapLocation[] = cards.map(
    (card: ListingCardProps, key: number) => {
      refArray.push(React.createRef<HTMLElement>());
      return card.mapLocation;
    }
  );

  const y = useMotionValue(0);
  const { height } = useWindowSize();
  const variants = {
    collapsed: {
      y: 0,
      borderTopLeftRadius: "24px",
      borderTopRightRadius: "24px",
    },
    preview: {
      y: (-2 * height) / 5,
      borderTopLeftRadius: "24px",
      borderTopRightRadius: "24px",
    },
    expanded: {
      y: -height + 52,
      borderTopLeftRadius: "0px",
      borderTopRightRadius: "0px",
    },
  };
  const triggerVariants = {
    collapsed: { height: 4, marginBottom: "24px" },
    preview: { height: 4, marginBottom: "24px" },
    expanded: { height: 0, marginBottom: "35px" },
  };
  const [animate, setAnimate] = useState<keyof typeof variants>("preview");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const history = useHistory();
  const [hotelIndex, setHotelIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(0);

  const handleClick: MouseEventHandler<Element> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    history.push("/details/1");
  };

  const markerClick = (index: number) => {
    setHotelIndex(index);
    setHoverIndex(index);
    if (ScrollBarRef.current) {
      if (refArray[index]?.current?.offsetTop !== undefined) {
        const viewHeight = ScrollBarRef?.current?.offsetHeight;
        const cardHeight = refArray[index]?.current?.offsetHeight;
        const top = refArray[index]?.current?.offsetTop;
        if (
          top !== null &&
          top !== undefined &&
          cardHeight !== null &&
          cardHeight !== undefined
        ) {
          const finalPos = top + (viewHeight - cardHeight) / 2;
          if (finalPos)
            ScrollBarRef.current.scrollTo(
              0,
              (finalPos > top + cardHeight / 2
                ? top - (viewHeight - cardHeight) / 2
                : finalPos) - ScrollBarRef?.current?.offsetTop
            );
        }
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          position: { xs: "fixed", md: "relative" },
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          margin: "0 auto",
          boxShadow: { xs: 0, md: 2 },
          display: "flex",
          justifyContent: { xs: "center", md: "flex-start" },
          zIndex: 1000,
          py: { xs: 0, md: 1 },
        }}
      >
        <Box
          component="img"
          src={"/images/Romingo_Logo_Black.svg"}
          alt="Logo"
          draggable="false"
          sx={{
            display: { xs: "none", md: "block" },
            ml: { xs: 0, md: 4 },
            mr: { xs: 0, md: 8 },
            height: { xs: "0px", md: "45px" },
          }}
        />
        <FilterBar />
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          display: {
            md: "flex",
          },
          height: { xs: "100vh", md: "calc(100vh - 59px)" },
        }}
      >
        <ListingMap
          loading={loading}
          center={cards[0].mapLocation}
          markers={markers}
          name={cards[hotelIndex].name}
          location={cards[hotelIndex].locaiton}
          score={cards[hotelIndex].score}
          price={cards[hotelIndex].price}
          image={cards[hotelIndex].image}
          amenities={cards[hotelIndex].amenities}
          markerClickCallBack={markerClick}
          selectedMarker={hoverIndex}
        />
        <Hidden mdUp>
          <motion.div
            drag={animate !== "expanded" && "y"}
            dragElastic={0.5}
            dragConstraints={{
              top: variants[animate].y,
              bottom: variants[animate].y,
            }}
            ref={scrollRef}
            style={{
              y,
              position: "absolute",
              top: height - 52,
              left: 0,
              right: 0,
              padding: 24,
              backgroundColor: "white",
              overflow: animate === "expanded" ? "auto" : "hidden",
              maxHeight: height - 48,
              zIndex: 100,
            }}
            variants={variants}
            animate={animate}
            transition={{ duration: 0.3 }}
            onDragEnd={(_, { offset }) => {
              if (offset.y < -30) {
                if (animate === "collapsed") {
                  setAnimate("preview");
                } else {
                  setAnimate("expanded");
                }
              } else if (offset.y > 30) {
                if (animate === "preview") {
                  setAnimate("collapsed");
                } else {
                  setAnimate("preview");
                }
              }
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <MotionBox
                variants={triggerVariants}
                animate={animate}
                sx={{
                  width: 40,
                  borderRadius: 3,
                  backgroundColor: "grey.200",
                }}
              />
            </Box>
            {loading ? (
              <Stack spacing={3} divider={<Divider variant="middle" />}>
                <RomingoGuarantee sx={{ mb: 0 }} />
                {Array.from({ length: 6 }, (_, i: number) => (
                  <ListingCardSkeleton key={i} />
                ))}
              </Stack>
            ) : (
              <Stack spacing={3} divider={<Divider variant="middle" />}>
                <RomingoGuarantee sx={{ mb: 0 }} />
                {cards.map((card: any, index: number) => (
                  <Link
                    href="#"
                    key={index}
                    onClick={handleClick}
                    underline="none"
                  >
                    <ListingCard
                      {...card}
                      highlighted={hotelIndex === index ? true : false}
                    />
                  </Link>
                ))}
              </Stack>
            )}
          </motion.div>
          {animate === "expanded" && (
            <Button
              size="large"
              color="secondary"
              variant="contained"
              onClick={() => {
                scrollRef?.current?.scrollTo({ top: 0, behavior: "auto" });
                setAnimate("collapsed");
              }}
              sx={{
                position: "absolute",
                bottom: 30,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 100,
                boxShadow: 10,
                borderRadius: 3,
              }}
            >
              <MapIcon sx={{ fontSize: 15, mr: 0.5 }} />
              Map
            </Button>
          )}
        </Hidden>
        <Hidden mdDown>
          <Box
            sx={{
              position: "relative",
              px: 3,
              pt: 2,
              pb: 3,
              width: "55%",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "0.4em",
              },
              "&::-webkit-scrollbar-track": {
                boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                borderRadius: "0.3em",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,.1)",
                borderRadius: "0.3em",
              },
            }}
            ref={ScrollBarRef}
          >
            <RomingoGuarantee sx={{ mb: 3 }} />
            {loading ? (
              <Stack spacing={3} divider={<Divider variant="middle" />}>
                {Array.from({ length: 6 }, (_, i: number) => (
                  <ListingCardSkeleton key={i} />
                ))}
              </Stack>
            ) : (
              <Stack spacing={3} divider={<Divider variant="middle" />}>
                {cards.map((card: any, index: number) => (
                  <Link
                    href="#"
                    key={index}
                    onClick={handleClick}
                    underline="none"
                    ref={refArray[index]}
                    onMouseOver={(e) => {
                      setHoverIndex(index);
                    }}
                  >
                    <ListingCard
                      {...card}
                      highlighted={hotelIndex === index ? true : false}
                    />
                  </Link>
                ))}
              </Stack>
            )}
          </Box>
        </Hidden>
      </Box>
      <Box display={{ xs: "none", sm: "block" }}>
        <Footer />
      </Box>
    </>
  );
};

export default ListingPage;
