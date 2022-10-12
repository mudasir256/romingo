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
import { makeStyles } from "@material-ui/core/styles";
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

  const [selectedFilter, setSelectedFilter] = useState<string>([]);
  const [showExtras, setShowExtras] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);

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

  const [maxPrice, setMaxPrice] = useState(
    Math.max(...cards.map(card => card.lowestAveragePrice))
  )
  const [value, setValue] = useState([0, maxPrice])
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
    setMaxPrice(Math.max(...cards.map(card => card.lowestAveragePrice)))
    let filtered = [...cards]
    if (selectedFilter.length > 0) {
      filtered = cards.filter(card => selectedFilter.every(filter => {
        if (card.amenities) {
          return card.amenities.map(amenity => amenity.desc).includes(filter)
        }
        return []
      }))
    }
    filtered = filtered.filter(card => (card.lowestAveragePrice > value[0] && card.lowestAveragePrice <= value[1]) )
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

  }, [selectedFilter, cards, sortBy, value, rating]);


  const start = search.checkIn.substring(0, 10)
  const end = search.checkOut.substring(0, 10)
  
  const date1 = new Date(start).getTime();
  const date2 = new Date(end).getTime();
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  const location = useLocation<any>();

  console.log(cards)

  return (
    <>
      <Helmet>
        <title>Romingo | Find pet friendly hotels</title>
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
                    }} sx={{ width: '100%' }} variant="contained">Sort & Filter</Button>
                  </Grid>
                  <Grid sx={{ mt: '1em' }} item xs={6}>
                    <Button onClick={() => {
                      setShowExtras(!showExtras)
                      setShowFilters(false)
                    }} sx={{ width: '95%' }} variant="contained">Hotel Rating & Price</Button>
                  </Grid>
                </Grid>
               

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
                />
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
                <DesktopFilterBar />
              </Hidden>
              <Grid container spacing={1}>
                <Grid sx={{ mt: { xs: '1em', md: '0em' } }} item xs={6}>
                  <Button onClick={() => {
                    setShowFilters(!showFilters)
                    setShowExtras(false)
                  }} sx={{ width: '100%' }} variant="contained">Sort & Filter</Button>
                </Grid>
                <Grid sx={{ mt: { xs: '1em', md: '0em' } }} item xs={6}>
                  <Button onClick={() => {
                    setShowExtras(!showExtras)
                    setShowFilters(false)
                  }} sx={{ width: '95%' }} variant="contained">Hotel Rating & Price</Button>
                </Grid>
              </Grid>
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
              />
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
  const { sortBy, setSortBy, size, bigDog, setBigDog, selectedFilter, setSelectedFilter, value, setValue, maxPrice, rating, setRating, showFilters, showExtras } = props;
  const history = useHistory();
  // const options = [
  //   "101: Wheelchair access",
  //   "2016: Rollaway adult",
  //   "228: Business center",
  //   "233: Tennis court",
  //   "259: High speed internet access",
  //   "71: Pool",
  //   "68: Parking",
  //   "77: Room Service",
  // ];



  // -Air Conditioned

  const options = [
    //"Rollaway adult",
    "Health club",
    "Business center",
    "Tennis court",
    //"High speed internet access",
    "Pool",
    "Hot Tub",
    "Restaurant",
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
    <Box
      sx={{
        mt: { xs :'1em', sm: '1em', md: '1em' },
        pb: '2em'
      }}
    >
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
          width: '100%',
          maxWidth: '480px',
        }}
        sx={{  mb: '1.5em' }}
        variant="standard"
        startAdornment={
          <FilterList sx={{ color: "#03989E", height: "16px" }} />
        }
      >
        <MenuItem value="featured">Sort by: Featured</MenuItem>
        <MenuItem value="score">&nbsp;&nbsp;Highest Rating</MenuItem>
        <MenuItem value="low">&nbsp;&nbsp;Price: Low to High</MenuItem>
        <MenuItem value="high">&nbsp;&nbsp;Price: High to Low</MenuItem>
      </Select>
      }

      {showFilters &&
      <FormControl sx={{ mt: '1em', width: '100%'}}>
        <InputLabel id="demo-simple-select-label"><Typography sx={{  fontFamily: "overpass-light", color: 'gray' }}>{selectedFilter.length} amenity {selectedFilter.length === 1 ? 'filter' : 'filters'} selected</Typography></InputLabel>
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
            maxWidth: '480px',
          }}
          multiple
          renderValue={(selectedFilter) => selectedFilter.join(", ")}
        >
          <MenuItem
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
          {options.map((option: any) => (
            <MenuItem key={option} value={option}>
              <ListItemIcon>
                <Checkbox checked={selectedFilter.indexOf(option) > -1} />
              </ListItemIcon>
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      }

      {showExtras && 
      <Box sx={{ display: 'flex', mt: {xs : 0, sm: 0, md: '1.5em'} }}>
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

      {showExtras &&
      <Box sx={{ mt: '1.5em', textAlign: 'left', minWidth: '240px' }}>
        <Typography component="legend" sx={{ fontFamily: 'overpass-regular'}}>Price per night:</Typography>
        <Slider
          getAriaLabel={() => 'Price range'}
          value={value}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={0}
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
          sx={{ ml: '1em', width: '90%' }}
        />
      </Box>
      }

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
    </Box>
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
      // refetch({
      //   variables: {
      //     adults: search.occupants.adults,
      //     cityId: search.city,
      //     checkIn: search.checkIn.substring(0, 10),
      //     checkOut: search.checkOut.substring(0, 10),
      //     children: ageParam,
      //     dogs: search.occupants.dogs,
      //     allows_big_dogs: allowBigDogs
      //   }
      // })

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
          fontFamily: 'overpass-light'
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
            componentsProps={{
              paper: {
                style: {
                  opacity: 1,
                  backgroundColor: 'white',
                  fontFamily: 'sansita-light',
                  padding: '0 1em',
                }
              },
            }}
            renderOption={(props, option: any) => (
              <li {...props} style={{ paddingLeft: 0, fontFamily: 'overpass-light', color: '#009CA1', fontSize: '0.8em' }}>
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
                    fontSize: "0.9em",
                    fontWeight: 600,
                    fontFamily: "overpass-light"
                    ,
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
            fontFamily: "overpass-light",
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
                      fontFamily: "overpass-light",
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: '1em',
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
function useStyles() {
  throw new Error("Function not implemented.");
}

