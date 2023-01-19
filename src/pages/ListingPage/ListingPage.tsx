import {Helmet} from "react-helmet";
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
  ListItemIcon,
  Checkbox,
  ListItemText,
  Slider,
  Rating,
  Chip,
} from "@mui/material";
import {
  RemoveCircleOutline,
  AddCircleOutline,
  FilterList,
  ReportRounded,
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
import { useHistory, useLocation } from "react-router-dom";
import { useStore, useDispatch, useSelector, shallowEqual } from "react-redux";
import { Dispatch } from "redux";
import { ListingCardProps } from "../../components/ListingCard/ListingCard";
import ListingCardSkeleton from "../../components/UI/ListingCardSkeleton";
import ListingCard from "../../components/ListingCard";
import ListingMap from "../../components/ListingMap";
import FilterBar from "../../components/FilterBar";
import { TextField, Button } from "@mui/material";
import Footer from "../../components/Footer";
import SearchIcon from "@mui/icons-material/Search";
import { gql, useQuery } from "@apollo/client";
import { setList } from "../../store/hotelListReducer";
import { setViewStatus } from "../../store/viewStatusReducer";
import {
  GetHotelBySearch,
} from "../../constants/constants";
import ScrollToTop from "../../components/ScrollToTop";
import Loader from "../../components/UI/Loader";
import { saveSearch } from "../../store/searchReducer";
import { DateTime } from "luxon";
import PersonIcon from "@mui/icons-material/Person";
import PetsIcon from "@mui/icons-material/Pets";
import Navbar from "../../components/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import "./listing.css";
const MotionBox = motion(Box);

import { DesktopFilterBar } from "../Cities/DesktopFilterBar"

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

  const [selectedFilter, setSelectedFilter] = useState<string>([]);
  const [showExtras, setShowExtras] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState(500)
  const [minPrice, setMinPrice] = useState(0)
  const [value, setValue] = useState([0, 500])

  const [sorted, setSorted] = useState([])
  const [markers, setMarkers] = useState([])


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
        age: x || 1,
      };
    })
    : [];

  const { loading, error, data, refetch } = useQuery(
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
        const price = Math.max(...data.properties.map(card => card.lowestAveragePrice))
        const lowPrice = Math.min(...data.properties.map(card => card.lowestAveragePrice))

        setMaxPrice(price)
        setMinPrice(lowPrice)
        setValue([lowPrice, price])
        dispatch(setList(data.properties));
      }
    }
  }, [data]);

  const cards = useSelector((state: any) => {
    return state.hotelListReducer.hotels;
  });
  
  const y = useMotionValue(0);
  const variants = {
    collapsed: {
      y: 0,
      bottom: 0,
      top: 'auto',
      borderTopLeftRadius: "24px",
      borderTopRightRadius: "24px",
      height: 24,
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
    collapsed: { height: 4, marginBottom: "32px" },
    preview: { height: 4, marginBottom: "24px" },
    expanded: { height: 0, marginBottom: "35px" },
  };

  const viewStatus = useStore().getState().viewStatusReducer.status;

  const [rating, setRating] = useState(0)
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
    let filtered = [...cards]
    if (selectedFilter.length > 0) {
      filtered = cards.filter(card => selectedFilter.every(filter => {
        if (card.amenities) {
          return card.amenities.map(amenity => amenity.desc).includes(filter)
        }
        return []
      }))
    }
    filtered = filtered.filter(card => (card.lowestAveragePrice >= value[0] && card.lowestAveragePrice <= value[1]) )
    if (rating) {
      filtered = filtered.filter(card => parseInt(card.starRating) === rating)
    }
    setSorted(
      [...filtered].sort((a: any, b: any) =>
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
      [...filtered]
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

  }, [selectedFilter, data, sortBy, value, rating]);


  const start = search.checkIn.substring(0, 10)
  const end = search.checkOut.substring(0, 10)
  
  const date1 = new Date(start).getTime();
  const date2 = new Date(end).getTime();
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  const location = useLocation<any>();


  return (
    <>
      <Helmet>
        <title>Find pet friendly hotels - Romingo</title>
        <description>Search for and find pet friendly hotels in your area.</description>
        <meta property="og:title" content="Romingo | Find pet friendly hotels" />
        <meta property="og:description" content="Search for and find pet friendly hotels in your area." />
        <meta property="og:url" content="https://www.romingo.com/listings" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://romingo.com/static/media/logo.11150e63.png" />
        <meta property="og:site_name" content="Romingo" />
        <meta name="twitter:title" content="Romingo | Find pet friendly hotels" />
        <meta name="twitter:description" content="Search for and find pet friendly hotels in your area." />
        <meta name="twitter:image" content="https://romingo.com/static/media/logo.11150e63.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <ScrollToTop />
      <Box sx={{ width: '100%', position: { xs: 'absolute', sm: 'absolute', md:'relative' }, zIndex: 2000}}>
        <Navbar />
      </Box>

      {animate === 'collapsed' && 
        <Box 
          sx={{  
            display: { xs: 'flex', md: 'none'},
            position: { xs: 'fixed' },
            top: 0,
            left: 0,
            right: 0,
            width: "100%",
            margin: "0 auto",
            boxShadow: { xs: 0, md: 2 },
            justifyContent: { xs: "center" },
            overflow: "hidden",
            zIndex: 1000,
          }}
        >
          <Box sx={{ mt: '6em' }}>
            <FilterBar />
          </Box>
        </Box>
      }

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
                  pt: "3em",
                  height: sorted.length > 0 ? 'auto' : '120vh'
                }}
              >
                

                <Grid container spacing={1}>
                  <FilterBar />
                  <Grid sx={{ mt: '1em' }} item xs={6}>
                    <Button onClick={() => {
                      setShowFilters(!showFilters)
                      setShowExtras(false)
                    }} sx={{ width: '100%', backgroundColor: 'white', color: '#03989E', '&:hover': { color: 'white' } }} variant="contained">Sort & Filter</Button>
                  </Grid>
                  <Grid sx={{ mt: '1em' }} item xs={6}>
                    <Button onClick={() => {
                      setShowExtras(!showExtras)
                      setShowFilters(false)
                    }} sx={{ width: '95%', backgroundColor: 'white', color: '#03989E', '&:hover': { color: 'white' } }} variant="contained">Hotel Rating & Price</Button>
                  </Grid>
                </Grid>

                <div style={{ marginTop: '0.5em' }}>
                  {(value[0] != minPrice || value[1] != maxPrice) &&
                    <Chip
                      size="small"
                      label="Custom Price Range"
                      onDelete={() => setValue([minPrice, maxPrice])}
                    />
                  }
                  {selectedFilter.map(filter => (
                    <Chip key={filter} size="small" label={filter} onDelete={() => {
                      const indexOf = selectedFilter.indexOf(filter)
                      const newArray = [...selectedFilter]
                      newArray.splice(indexOf, 1)
                      setSelectedFilter(newArray)
                    }}/>
                  ))}
                  {rating > 0 &&
                    <Chip
                      size="small"
                      label={`${rating} star hotel`}
                      onDelete={() => setRating(0)}
                    />
                  }
                  {(rating > 0 || selectedFilter.length > 0 || value[0] != minPrice || value[1] != maxPrice) &&
                    <Chip
                      size="small"
                      label="Clear all filters"
                      onDelete={() => {
                        setSelectedFilter([])
                        setRating(null)
                        setValue([minPrice, maxPrice])
                      }}
                    />
                  }
                </div>

                <SortBar 
                  size="small" 
                  sortBy={sortBy} 
                  bigDog={allowBigDogs} 
                  setBigDog={setAllowBigDogs} 
                  setSortBy={setSortBy}
                  selectedFilter={selectedFilter}
                  setSelectedFilter={setSelectedFilter}
                  value={value}
                  setValue={setValue}
                  maxPrice={maxPrice}
                  rating={rating}
                  setRating={setRating}
                  showFilters={showFilters}
                  showExtras={showExtras}
                  minPrice={minPrice}
                />

                

                {(showFilters || showExtras) && 
                <Grid item xs={12}>
                  <Button onClick={() => {
                    setShowExtras(false)
                    setShowFilters(false)
                  }} sx={{ width: '95%' }} size="small" variant="outlined">Done</Button>
                </Grid>
                }

                {cards.length > 0 && (
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#222222",
                      fontWeight: 700,
                      pl: '0.25em',
                      fontFamily: "overpass-light",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    {sorted.length} Result{sorted.length === 1 ? "" : "s"} in{" "}
                    {getCityName(search.city)}
                    {location.state?.flag && ` (${location.state?.flag})`}
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
                      No rooms found for this search...
                    </Typography>
                  </>
                ) : (
                  sorted.map((card: any, index: number) => (
                    <ListingCard
                      key={card.id}
                      {...card}
                      duration={diffDays}
                      highlighted={false}//{hotelIndex === index ? true : false}
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

              <Box sx={{ mx: 'auto' }}>
                <DesktopFilterBar />
              </Box>
              </Hidden>
              <Grid container spacing={1}>
                <Grid sx={{ mt: { xs: '1em', md: '0em' } }} item xs={12}>
                  <Button onClick={() => {
                    setShowFilters(!showFilters)
                    setShowExtras(!showExtras)
                  }} sx={{ width: '100%', backgroundColor: 'white', color: '#03989E', '&:hover': { color: 'white' } }} variant="contained">Sort & Filter</Button>
                </Grid>
              </Grid>

              <Grid xs={12} style={{ marginTop: '0.5em' }}>
                {(value[0] != minPrice || value[1] != maxPrice) &&
                  <Chip
                    size="small"
                    label="Custom Price Range"
                    onDelete={() => setValue([minPrice, maxPrice])}
                  />
                }
                {selectedFilter.map(filter => (
                  <Chip key={filter} size="small" label={filter} onDelete={() => {
                    const indexOf = selectedFilter.indexOf(filter)
                    const newArray = [...selectedFilter]
                    newArray.splice(indexOf, 1)
                    setSelectedFilter(newArray)
                  }}/>
                ))}
                {rating > 0 &&
                  <Chip
                    size="small"
                    label={`${rating} star hotel`}
                    onDelete={() => setRating(0)}
                  />
                }
                {(rating > 0 || selectedFilter.length > 0 || value[0] != minPrice || value[1] != maxPrice) &&
                  <Chip
                    size="small"
                    label="Clear all filters"
                    onDelete={() => {
                      setSelectedFilter([])
                      setRating(null)
                      setValue([minPrice, maxPrice])
                    }}
                  />
                } 
              </Grid>
            </Grid>

         
            <Box sx={{mb: '1em', display: 'grid',   gridTemplateColumns: 'repeat(2, 1fr)', alignItems: 'center' }}>
              <SortBar 
                sortBy={sortBy} 
                bigDog={allowBigDogs} 
                setBigDog={setAllowBigDogs} 
                setSortBy={setSortBy}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter} 
                value={value}
                setValue={setValue}
                maxPrice={maxPrice}
                rating={rating}
                setRating={setRating}
                showFilters={showFilters}
                showExtras={showExtras}
                minPrice={minPrice}
              />
            </Box>


            {(showFilters || showExtras) && 
            <Grid item xs={12} sx={{ mb: '1em' }}>
              <Button onClick={() => {
                setShowExtras(false)
                setShowFilters(false)
              }} sx={{ width: '97%' }} size="small" variant="outlined">Done</Button>
            </Grid>
            }

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
                      fontFamily: "overpass-light",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",

                    }}
                  >
                    {sorted.length} Result{sorted.length === 1 ? "" : "s"} in{" "}
                    {getCityName(search.city)}
                    {location.state?.flag && ` (${location.state?.flag})`}
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
                        imageURLs={[...new Set([card.featuredImageURL, ...card.imageURLs])]}
                        duration={diffDays}
                        highlighted={false} //{hotelIndex === index ? true : false}
                        flag={location.state?.flag}
                        bookingId={location.state?.bookingId}
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
  selectedFilter?: any
  setSelectedFilter?: any
}

const SortBar: FC<SortBarProps> = (props: SortBarProps) => {
  const { sortBy, setSortBy, size, bigDog, setBigDog, selectedFilter, setSelectedFilter, value, setValue, maxPrice, rating, setRating, showFilters, showExtras, minPrice } = props;

  const [shownOptionsCount, setShownOptionsCount] = useState(5)
  // -Air Conditioned

  const options = [
    //"Rollaway adult",
    "Pool",
    "Hot Tub",
    "Restaurant",
    "Health club",

    "Business center",
    "Tennis court",
    //"High speed internet access",
    "Room service",
    "Onsite laundry",
    //"Parking",
    "Smoke-free property",
    "Wheelchair access",
    "Translation services",
  ];


  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      width: 300
    },
    indeterminateColor: {
      color: "#f50057"
    },
    selectAllText: {
      fontWeight: 500
    },
    selectedAll: {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.08)"
      }
    }
  }));

  const classes = useStyles();
  const isAllSelected =
    options.length > 0 && selectedFilter.length === options.length;

  const handleChange = (event: any) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelectedFilter(selectedFilter.length === options.length ? [] : options);
      return;
    }
    setSelectedFilter(value);
  };

  useEffect(() => {
    console.log(selectedFilter)

  }, [selectedFilter])

  const valuetext = (value: number) => {
    return value;
  }

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };


  return (
    <>
      {showFilters &&
      <Select
        color="primary"
        value={sortBy}
        onChange={(e: any) => setSortBy(e.target.value)}
        style={{
          background: "#fff",
          textAlign: "center",
          fontFamily: "overpass-light",
          minWidth: "250px",
          maxHeight: "40px",
          borderRadius: "30px",
          fontSize: "0.9em",
          color: "#03989E",
          width: '90%',
          left: '16px',
        }}
        variant="standard"
        startAdornment={
          <FilterList sx={{ color: "#03989E", height: "16px" }} />
        }
      >
        <MenuItem dense value="featured">Sort by: Featured</MenuItem>
        <MenuItem dense value="score">&nbsp;&nbsp;Highest Rating</MenuItem>
        <MenuItem dense value="low">&nbsp;&nbsp;Price: Low to High</MenuItem>
        <MenuItem dense value="high">&nbsp;&nbsp;Price: High to Low</MenuItem>
      </Select>
      }


      {showExtras && 
      <Box sx={{ display: 'flex', mt: {xs : 0, sm: 0, md: '1.5em'}, pl: { xs :'3.5em', lg: '0em' } }}>
        <Typography sx={{ fontFamily: 'overpass-regular', mr: '0.5em' }} component="legend">Hotel Star Rating:</Typography>
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          sx={{ color: 'red'}}
        />
      </Box>
      }

      {showFilters &&
      <FormControl  sx={{ mt: '1em', mb: '1em', width: '100%' }}>
        <InputLabel id="demo-simple-select-label"><Typography sx={{  ml: '0.5em', fontFamily: "overpass-light", color: 'gray' }}>{selectedFilter.length} amenity {selectedFilter.length === 1 ? 'filter' : 'filters'} selected</Typography></InputLabel>
        <Select
          id="demo-simple-select"
          color="primary"
          value={selectedFilter}
          onChange={handleChange}
          variant="standard"
          style={{
            background: "#fff",
            textAlign: "center",
            fontFamily: "overpass-light",
            minWidth: "250px",
            maxHeight: "40px",
            borderRadius: "30px",
            fontSize: "0.9em",
            color: "#03989E", 
            width: '90%',
            left: '16px',
          }}
          multiple
          renderValue={(selectedFilter) => selectedFilter.join(", ")}
        >
          <MenuItem
            dense
            value="all"
            classes={{
              root: isAllSelected ? classes.selectedAll : ""
            }}
          >
            <ListItemIcon>
              <Checkbox
                classes={{ indeterminate: classes.indeterminateColor }}
                checked={isAllSelected}
                indeterminate={
                  selectedFilter.length > 0 && selectedFilter.length < options.length
                }
              />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.selectAllText }}
              primary="Select All"
            />
          </MenuItem>
          {options.slice(0,shownOptionsCount).map((option: any) => (
            <MenuItem dense key={option} value={option}>
              <ListItemIcon>
                <Checkbox checked={selectedFilter.indexOf(option) > -1} />
              </ListItemIcon>
              <ListItemText dense primary={option} />
            </MenuItem>
          ))}
          {shownOptionsCount == options.length && <Button sx={{ ml: '1em', width: '90%' }} variant="outlined" onClick={() => setShownOptionsCount(5)}>Show Less</Button>}
          {shownOptionsCount != options.length && <Button  sx={{ ml: '1em', width: '90%' }} variant="outlined" onClick={() => setShownOptionsCount(options.length)}>Show More</Button>}
        </Select>
      </FormControl>
      }

      {showExtras &&
      <Box sx={{ mt: '1.5em', textAlign: 'left', minWidth: '240px', pl: { xs: '3.5em', lg: '0em' } }}>
        <Typography component="legend" sx={{ fontFamily: 'overpass-regular'}}>Price per night:</Typography>
        <Slider
          getAriaLabel={() => 'Price range'}
          value={value}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={minPrice}
          step={1}
          max={maxPrice}
          marks={[
            {
              value: value[0],
              label: `$${value[0]}`
            },
            {
              value: value[1],
              label: `$${value[1]}`
            }
          ]}
          sx={{ ml: '1em', width: '90%', maxWidth: '240px' }}
        />
      </Box>
      }
    </>
  );
};

export default ListingPage;
function useStyles() {
  throw new Error("Function not implemented.");
}

