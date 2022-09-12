import {
  IconButton,
  Popover,
  InputLabel,
  FormControl,
  Autocomplete,
  Box,
  Hidden,
  Stack,
  Typography,
  Divider,
  Grid,
  Select,
  Skeleton,
  MenuItem,
  Switch,
} from "@mui/material";
import {
  RemoveCircleOutline,
  AddCircleOutline,
  FilterList,
  ReportRounded,
  ListAlt,
} from "@mui/icons-material";
import MapIcon from "@mui/icons-material/Map";
import { motion, useMotionValue } from "framer-motion";
import React, {
  SetStateAction,
  Dispatch as Dispatcher,
  FC,
  useRef,
  useState,
  useEffect,
} from "react";
import { useHistory } from "react-router-dom";
import { useWindowSize } from "react-use";
import Link from "@mui/material/Link";
import { useStore, useDispatch, useSelector, shallowEqual } from "react-redux";
import { Dispatch } from "redux";
import { ListingCardProps } from "../../components/ListingCard/ListingCard";
import ListingCardSkeleton from "../../components/UI/ListingCardSkeleton";
import ListingCard from "../../components/ListingCard";
import ListingMap from "../../components/ListingMap";
import FilterBar from "../../components/FilterBar";
import { TextField, Button } from "@mui/material";
import Footer from "../../components/Footer";
import CustomToast from "../../components/UI/CustomToast";
import SearchIcon from "@mui/icons-material/Search";
import { RangeInput } from "@mui/lab/DateRangePicker/RangeTypes";
import { gql, useQuery } from "@apollo/client";
import { setList } from "../../store/hotelListReducer";
import { setViewStatus } from "../../store/viewStatusReducer";
import {
  GetHotelBySearch,
  GetHotelRackBySearch,
} from "../../constants/constants";
import ScrollToTop from "../../components/ScrollToTop";
import Loader from "../../components/UI/Loader";
import { saveSearch } from "../../store/searchReducer";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DateTime } from "luxon";
import PersonIcon from "@mui/icons-material/Person";
import PetsIcon from "@mui/icons-material/Pets";
import Navbar from "../../components/Navbar";
import "./listing.css";
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

const ListingPage: FC<Props> = () => {
  const [height, setHeight] = useState(0);
  const search = useSelector(
    (state: any) => state.searchReducer.search,
    shallowEqual
  );

  const cityList = useSelector((state: any) => state.cityListReducer.cities);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [allowBigDogs, setAllowBigDogs] = useState<number>(0);

  const getCityName = (cityId: string) => {
    for (let i = 0; i < cityList.length; i++) {
      if (cityList[i].id === cityId) return cityList[i].name;
    }
  };

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
        dogs: search.occupants.dogs,
        allows_big_dogs: allowBigDogs
      },
    }
  );

  const { data: rack_data } = useQuery(
    gql`
      ${GetHotelRackBySearch}
    `,
    {
      variables: {
        adults: search.occupants.adults,
        cityId: search.city,
        checkIn: search.checkIn.substring(0, 10),
        checkOut: search.checkOut.substring(0, 10),
        children: ageParam,
        dogs: search.occupants.dogs,
        allows_big_dogs: allowBigDogs
      },
    }
  );
   const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setHeight(window.outerHeight);
    }, 300);
  }, [window.outerHeight]);

  useEffect(() => {
    if (data?.properties) {
      if (error) {
        return;
      } else {
        dispatch(setList(data.properties));
      }
    }
    if (data?.properties && rack_data?.propertiesByCorporateDiscount) {
      dispatch(
        setList([
          ...data.properties,
          ...rack_data?.propertiesByCorporateDiscount,
        ])
      );
    }
  }, [data, rack_data]);

  const cards = useSelector((state: any) => {
    return state.hotelListReducer.hotels;
  });


  const [sorted, setSorted] = useState(
    [...cards].sort((a: any, b: any) =>
      (
        sortBy === "score" ? a.romingoScore < b.romingoScore
          : sortBy === "high" ? a.lowestAveragePrice < b.lowestAveragePrice
          : sortBy === "low" ? a.lowestAveragePrice > b.lowestAveragePrice
          : a.page_rank > b.page_rank
      )
        ? 1
        : -1
    )
  );

  const [markers, setMarkers] = useState(
    [...cards]
      .sort((a: any, b: any) =>
        (
          sortBy === "score" ? a.romingoScore < b.romingoScore
            : sortBy === "high" ? a.lowestAveragePrice < b.lowestAveragePrice
            : sortBy === "low" ? a.lowestAveragePrice > b.lowestAveragePrice
            : a.page_rank > b.page_rank
        )
          ? 1
          : -1
      )
      .map((card: ListingCardProps) => {
        refArray.push(React.createRef<HTMLAnchorElement>());
        return {
          lat: card.location.latitude,
          lng: card.location.longitude,
          type: "hotel",
          price: card.lowestAveragePrice,
        };
      })
  );

  const y = useMotionValue(0);
  const variants = {
    collapsed: {
      y: 0,
      bottom: 0,
      top: 'auto',
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
      top: `${height - 52}px`,
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
    setAnimate("expanded");  // setAnimate("collapsed");
    const intercomId = "CUSTOM"
    const domNode = document.getElementById(intercomId);
    if (domNode) {
      domNode.style.display = 'none';
    }
    return () => { if (domNode) { domNode.style.display = 'flex' } }
  }, [])

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

  useEffect(() => {
    setSorted(
      [...cards].sort((a: any, b: any) =>
        (
          sortBy === "score"  ? a.romingoScore < b.romingoScore 
          : sortBy === "high" ? a.lowestAveragePrice < b.lowestAveragePrice
          : sortBy === 'low'  ?  a.lowestAveragePrice > b.lowestAveragePrice
          : a.page_rank > b.page_rank
        )
          ? 1
          : -1
      )
    );
    setMarkers(
      [...cards]
        .sort((a: any, b: any) =>
          (
            sortBy === "score"  ? a.romingoScore < b.romingoScore
            : sortBy === "high" ? a.lowestAveragePrice < b.lowestAveragePrice
            : sortBy === "low"  ?  a.lowestAveragePrice > b.lowestAveragePrice
            : a.page_rank > b.page_rank
          )
            ? 1
            : -1
        )
        .map((card: ListingCardProps) => {
          refArray.push(React.createRef<HTMLAnchorElement>());
          return {
            lat: card.location.latitude,
            lng: card.location.longitude,
            type: "hotel",
            price: card.lowestAveragePrice,
          };
        })
    );
    setHoverIndex(0);
    setHotelIndex(0);
  }, [cards, sortBy]);

  const start = search.checkIn.substring(0, 10)
  const end = search.checkOut.substring(0, 10)
  
  const date1 = new Date(start).getTime();
  const date2 = new Date(end).getTime();
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

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
          overflow: "hidden",
          zIndex: 1000,
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
        {/* <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            history.push("/");
          }}
        >
          <Box
            component="img"
            src={
              "https://storage.googleapis.com/romingo-development-public/images/front-end/Romingo_Logo_Black.svg"
            }
            alt="Logo"
            draggable="false"
            sx={{
              display: { xs: "none", md: "block" },
              ml: { xs: 0, md: 4 },
              mr: { xs: 0, md: 8 },
              height: { xs: "0px", md: "42px" },
            }}
          />
        </Link> */}
        <Hidden mdDown><Navbar /></Hidden>

        <Hidden mdUp>
          <Box sx={{ mt: ".75rem" }}>
            <FilterBar />
          </Box>
        </Hidden>
      </Box>
      <Box
        sx={{
          backgroundColor: "#feffff",
          display: { md: "flex" },
          height: { xs: `100vh`, md: "calc(100vh - 59px)" },
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
              width: { xs: "100%", md: "75%" },
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
              name={sorted[hotelIndex]?.name}
              location={sorted[hotelIndex]?.addressLine1}
              score={sorted[hotelIndex]?.romingoScore}
              price={sorted[hotelIndex]?.lowestAveragePrice}
              image={sorted[hotelIndex]?.featuredImageURL}
              amenities={sorted[hotelIndex]?.dogAmenities}
              markerClickCallBack={markerClick}
              selectedMarker={hoverIndex}
              id={sorted[hotelIndex]?.id}
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
              position: animate !== 'expanded' ? 'fixed' : "absolute",
              left: 0,
              right: 0,
              padding: '0.45em',
              backgroundColor: "#feffff",
              overflow: animate !== "expanded" ? "hidden" : "scroll",
              zIndex: 100,
              overscrollBehavior: "none",
            }}
            variants={variants}
            animate={animate}
            transition={{ duration: 0.4 }}
            onDragEnd={(_, { offset }) => {
              if (offset.y < -30) {
                if (animate === "collapsed") {
                  setAnimate("expanded");
                }
              }
            }}
          >
            <Box sx={{ 
              display: "flex", 
              justifyContent: "center",             
            }}>
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
              <Stack spacing={3} sx={{ marginTop: "120px" }}>
                {/* <RomingoGuarantee sx={{ mb: 0 }} /> */}
                {Array.from({ length: 6 }, (_, i: number) => (
                  <ListingCardSkeleton key={i} />
                ))}
              </Stack>
            ) : (
              <Stack
                spacing={3}
                sx={{
                  pb: 7,
                  pt: "1rem",
                  minHeight: `${height - 200}px`,
                }}
              >
                <SortBar size="small" sortBy={sortBy} bigDog={allowBigDogs} setBigDog={setAllowBigDogs} setSortBy={setSortBy} />
                {/* <RomingoGuarantee sx={{ mb: 0 }} /> */}
                {!cards.length ? (
                  <>
                    <Typography
                      variant="h6"
                      sx={{ textAlign: "center", mt: "2rem" }}
                      color="text.secondary"
                    >
                      <ReportRounded sx={{ fontSize: "2rem" }} /> <br />
                      No rooms found for this search...
                    </Typography>
                  </>
                ) : (
                  sorted.map((card: any, index: number) => (
                    <ListingCard
                      key={card.id}
                      {...card}
                      duration={diffDays}
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
              onClick={() => {
                if (scrollRef?.current?.scrollTop === 0) {
                  setAnimate("collapsed");
                } else {
                  setAnimate("collapsed");
                  scrollRef?.current?.scrollTo({ top: 0, behavior: "auto" });
                }
              }}
              sx={{
                position: "fixed",
                bottom: 32,
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
              width: "80%",
              scrollBehavior: "smooth",
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
            {/* <RomingoGuarantee sx={{ mb: 3 }} /> */}

            <Grid
              sx={{
                display: "flex",
                flex: 1,
                mb: "1rem",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <Hidden mdDown>
                <DesktopFilterBar />
              </Hidden>
              <SortBar sortBy={sortBy} bigDog={allowBigDogs} setBigDog={setAllowBigDogs} setSortBy={setSortBy} />
            </Grid>

            {loading ? (
              <Stack spacing={3}>
                <Skeleton
                  animation="wave"
                  width={150}
                  height={58}
                  sx={{ mt: -1, mb: -1, borderRadius: 0 }}
                />
                {Array.from({ length: 6 }, (_, i: number) => (
                  <ListingCardSkeleton key={i} />
                ))}
              </Stack>
            ) : (
              <Stack spacing={3}>
                {cards.length > 0 && (
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#222222",
                      fontWeight: 700,
                      fontFamily: "Montserrat",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    {cards.length} Result{cards.length === 1 ? "" : "s"} in{" "}
                    {getCityName(search.city)}
                  </Typography>
                )}
                {!cards.length ? (
                  <>
                    <Typography
                      variant="h6"
                      sx={{ textAlign: "center", mt: "2rem" }}
                      color="text.secondary"
                    >
                      <ReportRounded sx={{ fontSize: "2rem" }} /> <br />
                      No rooms were found for this search
                    </Typography>
                  </>
                ) : (
                  sorted.map((card: any, index: number) => (
                    <Box
                      key={card.id}
                      ref={refArray[index]}
                      onMouseOver={() => {
                        setHoverIndex(index);
                      }}
                    >
                      <ListingCard
                        {...card}
                        duration={diffDays}
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
      <Box display={{ xs: "none", sm: "none", md: 'block' }}>
        <Footer />
      </Box>
    </>
  );
};

interface SortBarProps {
  sortBy: string;
  setSortBy: Dispatcher<SetStateAction<string>>;
  size?: string;
  bigDog?: number;
  setBigDog: Dispatcher<SetStateAction<number>>;
}

const SortBar: FC<SortBarProps> = (props: SortBarProps) => {
  const { sortBy, setSortBy, size, bigDog, setBigDog } = props;
  const history = useHistory()

  return (
    <Grid
     className="alignCenter"
      sx={{
        pb: size === "small" ? 0 : "1rem",
        textAlign: "right",
        display: "flex",
        alignItems: "center",
        justifyContent: size === "small" ? "center" : "flex-end",
      }}
    >
      {size === "small" && (
        <Typography sx={{ mr: "10px" }}>Sort by: </Typography>
      )}
      <Select
        color="primary"
        value={sortBy}
        onChange={(e: any) => setSortBy(e.target.value)}
        style={{
          background: "#fff",
          textAlign: "center",
          fontFamily: "Montserrat",
          minWidth: "250px",
          maxHeight: "40px",
          borderRadius: "30px",
          fontSize: "13px",
          color: "#03989E",
          fontWeight: 600,
        }}
        startAdornment={
          <FilterList sx={{ color: "#03989E", height: "16px" }} />
        }
      >
        <MenuItem value="featured">Featured</MenuItem>
        <MenuItem value="score">&nbsp;&nbsp;Highest Rating</MenuItem>
        <MenuItem value="low">&nbsp;&nbsp;Price: Low to High</MenuItem>
        <MenuItem value="high">&nbsp;&nbsp;Price: High to Low</MenuItem>
      </Select>

      {/* Temprory commented */}
      {/* <div className="toggleWrap">  
      <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            fontSize: "13px",
            color: "#03989E",
            display: { sm: "block", md: "flex" },
            justifyContent: "center",
            fontFamily: "Montserrat",
          }}
        >
          BIG DOGS
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: "1rem",
            color: "#222",
            fontWeight: 500,
            fontSize: "1.25rem",
            display: { sm: "block", md: "flex" },
            justifyContent: "center",
            fontFamily: "Roboto",
          }}
        >
          <Switch value={bigDog} 
            onChange={(e) => {
              setBigDog( e.target.checked ? 1 : 0 );
              history.push("/listings");
              // Refresh
          }} defaultChecked={false} />
        </Typography>
      </div> */}
    </Grid>
  );
};


const DesktopFilterBar: FC = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const isTextField = false;
  const city = "";
  // eslint-disable-next-line
  const search = useSelector((state: any) => state.searchReducer.search);
  // eslint-disable-next-line
  const cities = useSelector((state: any) => state.cityListReducer.cities);

  const [selectedCity, setSelectedCity] = useState(
    search.city ? search.city : ""
  );
  const [formError, setFormError] = useState("");

  const [checkDate, setCheckDate] = useState<RangeInput<Date | null>>([
    search.checkIn ? search.checkIn : null,
    search.checkOut ? search.checkOut : null,
  ]);

  const [occupants, setOccupants] = useState(search.occupants);

  const handleDateRangeClose = () => {
    setIsAccept(false);
    if (!isTextField) {
      setOpen(false);
    }
  };

  const getCity = (cityId: string) => {
    for (let i = 0; i < cities.length; i++) {
      if (cities[i].id === cityId) return cities[i];
    }
  };

  const onOccupantChange = (value: Occupant) => {
    setOccupants(value);
  };

  useEffect(() => {
    if (city && cities.length > 0) {
      setSelectedCity(city);
    }
  }, [cities]);

  // eslint-disable-next-line
  const dispatch: Dispatch<any> = useDispatch();

  const handleFilterOutClick = () => {
    if (
      occupants.adults !== 0 &&
      selectedCity &&
      checkDate[0] &&
      new Date(checkDate[0]) >=
      new Date(new Date().setDate(new Date().getDate() - 1)) &&
      checkDate[1] &&
      new Date(checkDate[1]) >= new Date()
    ) {
      setFormError("");
      dispatch(
        saveSearch({
          city: selectedCity,
          checkIn: new Date(checkDate[0]).toISOString(),
          checkOut: new Date(checkDate[1]).toISOString(),
          occupants,
        })
      );

      history.push("/listings");
    } else {
      if (!selectedCity) {
        setFormError("Location required");
      }
      if (!checkDate[0]) {
        setFormError("Check-in date required");
      }
      if (
        checkDate[0] &&
        new Date(checkDate[0]) <= new Date(new Date().setHours(23, 59, 59, 0))
      ) {
        setFormError("Check-in date must be today at the earliest");
      }
      if (!checkDate[1]) {
        setFormError("Check-out date required");
      }
      if (
        checkDate[1] &&
        new Date(checkDate[1]) <= new Date(new Date().setHours(23, 59, 59, 0))
      ) {
        setFormError("Check-out date must be after today");
      }
      if (occupants.adults === 0) {
        setFormError("Search must include at least 1 adult guest");
      }
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          background: "#fff",
          alignItems: "center",
          border: "1px solid #ccc",
          mb: "1rem",
          padding: ".25rem .5rem .25rem .5rem",
          borderRadius: "12px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Autocomplete
            options={cities.sort(function (a: any, b: any) {
              if (a.state.name === b.state.name) {
                // Price is only important when cities are the same
                return b.name - a.name;
              }
              return a.state.name > b.state.name ? 1 : -1;
            })}
            groupBy={(o) => o.state.name}
            disableClearable
            value={getCity(selectedCity) || null}
            getOptionLabel={(option: any) => {
              return option.name;
            }}
            blurOnSelect="touch"
            renderOption={(props, option: any) => (
              <li {...props} style={{ paddingLeft: 8 }}>
                <Box
                  sx={{
                    width: "35px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={`/images/location-icons/${option?.name
                      .substring(0, option.name.indexOf(","))
                      .toLowerCase()
                      .replace(/ /g, "_")}.svg`}
                    height="15px"
                    style={{ marginRight: "2px" }}
                  />
                </Box>
                {option.name}
              </li>
            )}
            // eslint-disable-next-line
            onChange={(e, values: any) => {
              if (values) {
                setFormError("");
                setSelectedCity(values.id);
              }
            }}
            sx={{ width: "200px" }}
            renderInput={(params) => (
              <TextField
                {...params}
                color="primary"
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "transparent",
                    },
                    "&:hover fieldset": {
                      borderColor: "transparent",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "transparent",
                    },
                  },
                  input: {
                    padding: "0px",
                    fontSize: "12px",
                    fontWeight: 600,
                    fontFamily: "Montserrat",
                    cursor: "pointer",
                    color: "primary.main",
                    border: "none",
                  },
                }}
              />
            )}
          />
        </Box>
        <Box
          sx={{
            fontFamily: "Roboto",
            fontSize: "12px",
            fontWeight: 400,
            display: "flex",
            alignItems: "center",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              inputFormat="MMM dd"
              disableMaskedInput={true}
              open={open}
              onAccept={() => setIsAccept(true)}
              onClose={handleDateRangeClose}
              onOpen={() => {
                if (!isAccept) {
                  setOpen(true);
                }
              }}
              allowSameDateSelection
              calendars={1}
              clearable={true}
              value={checkDate || null}
              minDate={new Date()}
              onChange={(newValue) => {
                setFormError("");
                setCheckDate(newValue);
              }}
              renderInput={() => (
                <Button
                  onClick={() => setOpen(true)}
                  sx={{ px: { xs: 1, md: 1 } }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Montserrat",
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: { xs: "13px" },
                    }}
                  >
                    {checkDate[0]
                      ? DateTime.fromJSDate(new Date(checkDate[0])).toFormat(
                        "MMM dd"
                      )
                      : ""}
                    &nbsp;&#8212;&nbsp;
                    {checkDate[1]
                      ? DateTime.fromJSDate(new Date(checkDate[1])).toFormat(
                        "MMM dd"
                      )
                      : ""}
                  </Typography>
                </Button>
              )}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ mt: { xs: 1, md: 0 }, display: "flex", alignItems: "top" }}>
          <OccupantSelector
            value={occupants}
            onChange={onOccupantChange}
            variant="standard"
            size="small"
          />
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Button
            onClick={handleFilterOutClick}
            disableElevation
            type="submit"
            variant="text"
            sx={{
              ml: ".25rem",
              display: "flex",
              minWidth: "30px",
              alignItems: "center",
              padding: ".25rem 0rem",
              justifyContent: "center",
            }}
          >
            <SearchIcon sx={{ height: "20px" }} />
          </Button>
        </Box>
      </Box>
      {formError.length > 0 && (
        <Typography
          variant="body2"
          color="error"
          sx={{ textAlign: "center", mt: 1 }}
        >
          {formError}
        </Typography>
      )}
    </Box>
  );
};

export interface Occupant {
  adults: number;
  children: number;
  dogs: number;
  childrenAge?: number[];
  disabled?: boolean;
}

interface OccupantSelectorProps {
  value: Occupant;
  onChange: (value: Occupant) => void;
  onClose?: () => void;
  fullWidth?: boolean;
  size?: "small" | "medium" | undefined;
  variant?: "filled" | "outlined" | "standard" | undefined;
  disabled?: boolean;
}

const OccupantSelector: FC<OccupantSelectorProps> = ({
  value,
  onChange,
  onClose,
}) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [error, setError] = useState("");

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setError("");
    if (value.adults === 0) {
      setError("At least 1 adult is required");
      return;
    }
    if (onClose) {
      onClose();
    }
    setAnchorEl(null);
  };

  return (
    <>
      <Divider
        orientation="vertical"
        flexItem
        sx={{ mx: ".5rem", maxHeight: "75%" }}
      />
      <Button onClick={handleClick} sx={{ px: { xs: 1, md: 1 } }}>
        <Typography
          sx={{ textTransform: "none", fontSize: "87%", fontWeight: 600 }}
        >
          {value.adults + value.children}
        </Typography>
        <PersonIcon
          sx={{ color: "primary.main", fontSize: "100%", mb: 0, ml: 0.1 }}
        />
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        <Typography
          sx={{
            textTransform: "none",
            fontSize: { xs: "87%" },
            fontWeight: 600,
          }}
        >
          {value.dogs}
        </Typography>
        <PetsIcon
          sx={{ color: "primary.main", fontSize: "100%", mb: 0.2, ml: 0.3 }}
        />
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{ ".MuiPopover-paper": { width: "250px" } }}
      >
        <Stack sx={{ px: 2, pt: 2 }} spacing={1}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body1">Adults</Typography>
            <NumberInput
              value={value.adults}
              onChange={(adults) => {
                if (adults > 5) return;
                onChange({ ...value, adults });
              }}
              minimum={1}
            />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Typography variant="body1">Children</Typography>
            <NumberInput
              value={value.children}
              onChange={(children) => {
                if (children > 6) return;
                if (value.childrenAge && value.childrenAge.length > children) {
                  value.childrenAge = value.childrenAge.slice(0, children);
                } else if (
                  value.childrenAge &&
                  value.childrenAge.length <= children
                ) {
                  while (value.childrenAge.length !== children) {
                    value.childrenAge.push(0);
                  }
                }
                onChange({ ...value, children });
              }}
            />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Typography variant="body1">Dogs</Typography>
            <NumberInput
              value={value.dogs}
              onChange={(dogs) => {
                if (dogs > 2) return;
                onChange({ ...value, dogs });
              }}
            />
          </Stack>
          {error.length > 0 && (
            <Typography
              variant="body2"
              color="error"
              sx={{ textAlign: "center", fontSize: "80%" }}
            >
              {error}
            </Typography>
          )}
          <Box
            alignItems="center"
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            {Array.from({ length: value.children }, (_, i: number) => {
              return (
                <Box
                  sx={{
                    mx: "5px",
                    mt: "0px",
                    mb: "15px",
                    width: "calc(50% - 10px)",
                    display: "inline-block",
                  }}
                  key={i}
                >
                  <FormControl variant="standard" fullWidth>
                    <InputLabel sx={{ textAlign: "center" }}>
                      Child {i + 1} Age
                    </InputLabel>
                    <Select
                      key={i}
                      color="primary"
                      sx={{ textAlign: "center" }}
                      value={
                        value.childrenAge && value.childrenAge[i]
                          ? value.childrenAge[i].toString()
                          : "0"
                      }
                      onChange={(e: any) => {
                        if (value.childrenAge === undefined) {
                          value.childrenAge = [];
                        }
                        value.childrenAge[i] = parseInt(e.target.value);
                        onChange({ ...value });
                      }}
                    >
                      {Array.from({ length: 18 }, (_, k: number) => {
                        return (
                          <MenuItem value={k} key={k}>
                            {k}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
              );
            })}
          </Box>
        </Stack>
        <Button
          sx={{ pt: 1.5, pb: 1.5, width: "100%", mt: -1.25 }}
          onClick={handleClose}
        >
          Done
        </Button>
      </Popover>
    </>
  );
};

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  minimum?: number;
}

const NumberInput: FC<NumberInputProps> = ({
  value,
  onChange,
  minimum = 0,
}) => {
  return (
    <Stack spacing={2} direction="row" alignItems="center">
      <IconButton onClick={() => onChange(Math.max(value - 1, minimum))}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography variant="body1" sx={{ width: 16, textAlign: "center" }}>
        {value}
      </Typography>
      <IconButton onClick={() => onChange(value + 1)}>
        <AddCircleOutline />
      </IconButton>
    </Stack>
  );
};

export default ListingPage;
