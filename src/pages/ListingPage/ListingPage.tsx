import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MapIcon from "@mui/icons-material/Map";
import { motion, useMotionValue } from "framer-motion";
import React, { FC, useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useWindowSize } from "react-use";
import Link from "@mui/material/Link";
import { useStore, useDispatch, useSelector, shallowEqual } from "react-redux";
import { Dispatch } from "redux";

import RomingoGuarantee from "../../components/RomingoGuarantee";
import { ListingCardProps } from "../../components/ListingCard/ListingCard";
import ListingCardSkeleton from "../../components/UI/ListingCardSkeleton";
import ListingCard from "../../components/ListingCard";
import ListingMap from "../../components/ListingMap";
import FilterBar from "../../components/FilterBar";
import { Button } from "@mui/material";
import Footer from "../../components/Footer";
import CustomToast from "../../components/UI/CustomToast";

import { gql, useQuery } from "@apollo/client";
import { setList } from "../../store/hotelListReducer";
import { setViewStatus } from "../../store/viewStatusReducer";
import { GetHotelBySearch } from "../../constants/constants";
import ScrollToTop from "../../components/ScrollToTop";
import Loader from "../../components/UI/Loader";

const MotionBox = motion(Box);

interface Props {
  cards: ListingCardProps[];
  loading: boolean;
}

interface MapLocation {
  lat: number;
  lng: number;
  type: string;
  price: number;
}

const ScrollBarRef = React.createRef<HTMLDivElement>();
const refArray: React.RefObject<HTMLAnchorElement>[] = [];

const ListingPage: FC<Props> = ({ ...props }) => {
  const search = useSelector(
    (state: any) => state.searchReducer.search,
    shallowEqual
  );

  const cityList = useSelector((state: any) => state.cityListReducer.cities);

  const selectedCity = cityList.filter(
    (city: any) => city.id === search.city
  )[0];

  const ageParam = search.occupants.childrenAge
    ? search.occupants.childrenAge.map((x: number) => {
        if (x === 0) {
          return {
            age: 1,
          };
        }
        return {
          age: x,
        };
      })
    : [];

  const { loading, error, data } = useQuery(
    gql`
      ${GetHotelBySearch}
    `,
    {
      variables: {
        adults: search.occupants.adults,
        cityId: search.city,
        checkIn: search.checkIn.substring(0, 10),
        checkOut: search.checkOut.substring(0, 10),
        children: ageParam,
      },
    }
  );

  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    console.log(data);
    if (data?.properties) {
      if (error) {
        return;
      } else {
        dispatch(setList(data.properties));
      }
    }
  }, [data]);

  const cards = useSelector((state: any) => {
    return state.hotelListReducer.hotels;
  });

  const markers: MapLocation[] = cards.map(
    (card: ListingCardProps, key: number) => {
      refArray.push(React.createRef<HTMLAnchorElement>());
      return {
        lat: card.location.latitude,
        lng: card.location.longitude,
        type: "hotel",
        price: card.lowestAveragePrice,
      };
    }
  );

  const y = useMotionValue(0);
  const { height } = useWindowSize();
  const variants = {
    collapsed: {
      y: 0,
      borderTopLeftRadius: "24px",
      borderTopRightRadius: "24px",
      height: 5,
    },
    preview: {
      y: (-2 * height) / 5,
      borderTopLeftRadius: "24px",
      borderTopRightRadius: "24px",
      height: (2 * height) / 5,
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

  const viewStatus = useStore().getState().viewStatusReducer.status;

  const [animate, setAnimate] = useState<keyof typeof variants>(viewStatus);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const history = useHistory();
  const [hotelIndex, setHotelIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(0);

  useEffect(() => {
    dispatch(
      setViewStatus({
        status: animate,
      })
    );
  }, [animate]);

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
      <ScrollToTop />
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
          maxHeight: { xs: height, md: "100%" },
          overflow: "hidden",
          zIndex: 1000,
          py: { xs: 0, md: 1 },
        }}
      >
        {error && (
          <CustomToast
            open={true}
            message={
              "Something went wrong, please refresh the page and try again"
            }
            type="error"
            duration={5000}
          />
        )}
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            history.push("/");
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
              height: { xs: "0px", md: "42px" },
            }}
          />
        </Link>
        <Hidden mdDown>
          {!loading && (error || cards.length !== 0) && <FilterBar />}
        </Hidden>
        <Hidden mdUp>
          <FilterBar />
        </Hidden>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          display: {
            md: "flex",
          },
          height: { xs: height, md: "calc(100vh - 59px)" },
        }}
      >
        {loading ? (
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loader size="300px" />
          </Box>
        ) : (
          cards.length >= 0 && (
            <ListingMap
              loading={loading}
              center={{
                lat: selectedCity?.center?.latitude,
                lng: selectedCity?.center?.longitude,
              }}
              zoom={selectedCity?.zoom}
              markers={markers}
              name={cards[hotelIndex]?.name}
              location={cards[hotelIndex]?.addressLine1}
              score={cards[hotelIndex]?.romingoScore}
              price={cards[hotelIndex]?.lowestAveragePrice}
              image={cards[hotelIndex]?.featuredImageURL}
              amenities={cards[hotelIndex]?.dogAmenities}
              markerClickCallBack={markerClick}
              selectedMarker={hoverIndex}
              id={cards[hotelIndex]?.id}
              onClick={() => {
                setAnimate("collapsed");
              }}
            />
          )
        )}
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
              maxHeight: height - 48,
              overflow: animate !== "expanded" ? "hidden" : "scroll",
              zIndex: 100,
              overscrollBehavior: "none",
            }}
            variants={variants}
            animate={animate}
            transition={{ duration: 0.4 }}
            onScroll={(e: any) => {
              if (e.target?.scrollTop <= 0) {
                setAnimate("collapsed");
              }
            }}
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
              <Stack
                spacing={3}
                sx={{ overflow: "hidden" }}
                divider={<Divider variant="middle" />}
              >
                <RomingoGuarantee sx={{ mb: 0 }} />
                {Array.from({ length: 6 }, (_, i: number) => (
                  <ListingCardSkeleton key={i} />
                ))}
              </Stack>
            ) : (
              <Stack
                spacing={3}
                divider={<Divider variant="middle" />}
                sx={{ pb: 7, overflow: "hidden" }}
              >
                <RomingoGuarantee sx={{ mb: 0 }} />
                {cards.length === 0 ? (
                  <>
                    <Typography
                      variant="h6"
                      sx={{ textAlign: "center" }}
                      color="text.secondary"
                    >
                      No rooms found for this search...
                    </Typography>
                  </>
                ) : (
                  cards.map((card: any, index: number) => (
                    <ListingCard
                      key={card.id}
                      {...card}
                      highlighted={hotelIndex === index ? true : false}
                    />
                  ))
                )}
              </Stack>
            )}
          </motion.div>
          {animate === "expanded" && (
            <Button
              size="large"
              color="secondary"
              variant="contained"
              onClick={(e: any) => {
                if (scrollRef?.current?.scrollTop === 0) {
                  setAnimate("collapsed");
                } else {
                  setAnimate("collapsed");
                  scrollRef?.current?.scrollTo({ top: 0, behavior: "auto" });
                }
              }}
              sx={{
                position: "absolute",
                bottom: 15,
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
                {cards.length === 0 ? (
                  <>
                    <Typography
                      variant="h6"
                      sx={{ textAlign: "center" }}
                      color="text.secondary"
                    >
                      No rooms found for this search...
                    </Typography>
                    <FilterBar zoomed />
                  </>
                ) : (
                  cards.map((card: any, index: number) => (
                    <Box
                      key={card.id}
                      ref={refArray[index]}
                      onMouseOver={() => {
                        setHoverIndex(index);
                      }}
                    >
                      <ListingCard
                        {...card}
                        highlighted={hotelIndex === index ? true : false}
                      />
                    </Box>
                  ))
                )}
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
