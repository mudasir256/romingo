import { FC, useState, MouseEventHandler, useEffect } from "react"
import Navbar from "../Navbar"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { Dispatch } from "redux"
import { Autocomplete, IconButton, TextField, Zoom, Button, Box, Typography, CSSObject, Link, Divider, useMediaQuery } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import DateRangePicker from "@mui/lab/DateRangePicker"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import { RangeInput } from "@mui/lab/DateRangePicker/RangeTypes"
import PersonIcon from "@mui/icons-material/Person"
import PetsIcon from "@mui/icons-material/Pets"
import { randomDate } from "../../tools.js"
import TagManager from 'react-gtm-module'
import OccupantSelector, { Occupant, } from "../OccupantSelector/OccupantSelector"
import { saveSearch } from "../../store/searchReducer"
import { OverlappingFieldsCanBeMergedRule } from "graphql"
import { DateTime } from 'luxon'
import { Shuffle } from "@mui/icons-material"

interface Props {
  sx?: CSSObject
}

const variants = [
  "Explore the world without the fees",
  "Discover your next getaway the easy way",
  "Resolve to travel in 2022",
]

const locationIds = [
  "ba12d364-9b1f-48c5-9ddc-7e68b40df076",
  "2714faad-9ea8-4851-9506-274710cdd51b",
  "d4c10666-addf-47a6-9870-767518d9ebad",
  "6f2cf61f-c769-47d9-9e46-90c5664b60b1",
  "82145909-13b4-4aab-be20-e0db474021c1",
  "58b23325-2016-44ef-886f-67e962dab17f"
]

const bgImages = [
  'url("https://storage.googleapis.com/romingo-development-public/images/front-end/background-frenchie.jpeg")',
  'url("https://storage.googleapis.com/romingo-development-public/images/front-end/woman-with-dog-in-snow.jpg")',
  'url("https://storage.googleapis.com/romingo-development-public/images/front-end/trees-background.jpeg")',
  'url("https://storage.googleapis.com/romingo-development-public/images/front-end/bridge-background.jpeg")',
  'url("https://storage.googleapis.com/romingo-development-public/images/front-end/open-road.jpeg")',
];

const Header: FC<Props> = ({ sx }) => {
  const [bgImage, setBgImage] = useState("");
  const [variant] = useState(localStorage.getItem('ROMINGO_EXPERIMENT_VAR'))
  const tinyScreen = useMediaQuery('(max-height:725px')

  useEffect(() => {
    setBgImage(bgImages[Math.floor(Math.random() * bgImages.length)]);
  }, [])

  return (
    <Box sx={{ width: "100%", minHeight: { xs: '100vh', md: "100vh", }, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", top: 0, left: 0, ...sx }}>
      <Navbar />

      <Box sx={{ position: "absolute", top: 0, left: 0, zIndex: 0, width: "100%", }}>
        <Box sx={{
            objectFit: "cover",
            width: "100%",
            borderRadius:'12px',
            minHeight: { xs: '100vh', md: "100vh" },
            "&::before": {
              content: '""',
              backgroundImage: bgImage,
              opacity: 0.85,
              backgroundSize: "cover",
              position: "absolute",
              backgroundPosition: "center",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          }}
        />
      </Box>
      <Box sx={{ marginTop: '64px', marginBottom: '24px', width: "100%", minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", }} >
        <Box sx={{
            borderRadius: { xs: 4.5, md: 3 },
            zIndex: 100,
            backgroundColor: "rgba(255,255,255, .8)",
            backdropFilter: 'blur(3px)',
            boxShadow: '1px 2px 3px rgba(0, 0, 0, 0.25)',
            maxWidth: { xs: "100%", md: "90%", xl: "80%" },
            pt: { xs: 2, sm: 3.5 },
            pb: { xs: '0', sm: 3.5 },
            px: { xs: 0, sm: 5 },
            mx: 1,
          }}
        >
          <Typography variant="h1" sx={{ color: "primary.main", maxWidth:{ xs: '92%', sm: '100%'}, margin: { xs: '1rem auto', sm: '0rem auto .75rem auto' }, fontFamily: 'Montserrat', textAlign: "center", fontSize: { xs: "2.25rem", md: "3rem" }, }}>
            {variants[variant ? parseFloat(variant) : 0]}
          </Typography>
          <Typography variant="h4" sx={{ color: "text.secondary", fontWeight: 500, fontFamily: 'Roboto', textAlign: "center", fontSize: { xs: "1.25rem", md: "1.5rem" }, margin: { xs: ".5rem auto", sm: '0 auto' }, px: 2, mt: 1, }} >
            Romingo provides the best hotel deals, and your pets will always travel for free!
          </Typography>

          <FilterBar sx={{ width: "100%", margin: "0 auto", mt: { xs: 2, md: 0 }, display: "flex", justifyContent: "center", }} zoomed home={true}/>
        </Box>
      </Box>
    </Box>
  );
};

interface FilterBarProps {
  sx?: CSSObject;
  zoomed?: boolean;
  home?: boolean;
  city?: string;
}

const FilterBar: FC<FilterBarProps> = ({ sx, zoomed = false, city = "" }) => {
  const [open, setOpen] = useState(false)
  const [isAccept, setIsAccept] = useState(false)
  const [isTextField, setIsTextField] = useState(false);
  const [zoomIn, setZoomIn] = useState(zoomed)
  const search = useSelector((state: any) => state.searchReducer.search)
  const cities = useSelector((state: any) => state.cityListReducer.cities)
  const [selectedCity, setSelectedCity] = useState( search.city ? search.city : null)
  const [formError, setFormError] = useState("")
  const [checkDate, setCheckDate] = useState<RangeInput<Date | null>>([ search.checkIn ? search.checkIn : new Date(), search.checkOut ? search.checkOut : DateTime.local().plus({ days: 1 }).toJSDate() ])
  const [occupants, setOccupants] = useState(search.occupants.dogs > 0 ? search.occupants : { adults: 2, children: 0, dogs: 1  });
  const history = useHistory();

  const dispatch: Dispatch<any> = useDispatch()

  const getCityName = (cityId: string) => {
    if (cityId) {
      return cities.filter((city: any) => city.id === cityId)[0].name
    }
  }
  const getCity = (cityId: string) => cities.filter((city: any) => city.id === cityId)[0]
  const onOccupantChange = (value: Occupant) => setOccupants(value);

  const dateToString = (isoString: string | Date | number) => {
    const date = new Date(isoString);
    return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
      "0" + date.getDate()
    ).slice(-2)}`;
  }


  const handleFilterInClick: MouseEventHandler<Element> = () => {
    setFormError("")
    setZoomIn(true)
  }

  const handleDateRangeClose = () => {
    setIsAccept(false)
    if (!isTextField) {
      setOpen(false)
    }
  }

  useEffect(() => {
    if (!open)
      setIsTextField(false)
  }, [open])

  useEffect(() => {
    if (city && city.length > 0 && cities.length > 0) {
      setSelectedCity(city);
    }
  }, [cities]);

  const handleFilterOutClick: MouseEventHandler<Element> = () => {
    TagManager.dataLayer({ dataLayer: { event: 'clicked_search' }})

    if ( occupants.adults !== 0 && selectedCity && checkDate[0] && new Date(checkDate[0]) >= new Date(new Date().setDate(new Date().getDate() - 1)) && checkDate[1] && new Date(checkDate[1]) >= new Date()) {
      setFormError("");
      setZoomIn(false);
      dispatch(
        saveSearch({
          city: selectedCity,
          checkIn: new Date(checkDate[0]).toISOString(),
          checkOut: new Date(checkDate[1]).toISOString(),
          occupants,
        })
      );

      history.push("/listings");
    }
    else {
      if (!selectedCity) {
        setFormError("Location required");
      }
      if (!checkDate[0]) {
        setFormError("Check-in date required");
      }
      if ( checkDate[0] && new Date(checkDate[0]) <= new Date(new Date().setHours(23, 59, 59, 0)) ) {
        setFormError("Check-in date must be today at the earliest");
      }
      if (!checkDate[1]) {
        setFormError("Check-out date required");
      }
      if ( checkDate[1] && (new Date(checkDate[1]) <= new Date(new Date().setHours(23, 59, 59, 0))) ) {
        setFormError("Check-out date must be after today");
      }
      if (occupants.adults === 0) {
        setFormError("Search must include at least 1 adult guest");
      }
    }
  };

  const handleImFlexibleClick = () => {
    const oneWeek = DateTime.local().plus({ days: 7 }).toJSDate()
    const randomCheckIn = randomDate(new Date(), oneWeek)
    const oneWeekFromCheckin = DateTime.fromJSDate(randomCheckIn).plus({ days: 7}).toJSDate()
    const randomCheckOut = randomDate(new Date(randomCheckIn), oneWeekFromCheckin)

    dispatch(
      saveSearch({
        city: locationIds[Math.floor(Math.random() * locationIds.length)],
        checkIn: new Date(randomCheckIn).toISOString(),
        checkOut: new Date(randomCheckOut).toISOString(),
        occupants: { adults: 2, children: 0, dogs: 1, },
      })
    )

    setTimeout(() => {
      history.push("/listings")
    }, 250)
  }

  return <>

    <Box sx={{ maxWidth: { xs: '90%', sm:"830px" }, margin: "0 auto", backgroundColor: "white", py: { xs: 0, md: 1.75 }, mt: { xs: 2, md: 4 }, borderRadius: { xs: 1, md: 25 }, border: '2px solid #ddd' }}>


    <Box sx={{ ...sx, mt: '0px', pt: '0px'}}>
      {!zoomIn && (
        <Box sx={{ display: "inline-block", minWidth: "300px", }} >
          <Box sx={{ display: "inline-flex", alignItems: "center", border: "1px solid #DDDDDD", borderRadius: 3, backgroundColor: "white", }}>
            <Button onClick={handleFilterInClick} sx={{ px: { xs: 1, md: 3 } }}>
              <Typography sx={{ textTransform: "none", fontSize: { xs: "85%", }, }}>
                {getCityName(selectedCity)}
              </Typography>
            </Button>
            <Box sx={{ backgroundColor: "#DDDDDD", flex: "0 0 1px", height: "24px", width: "1px", }}></Box>
            <Button onClick={handleFilterInClick} sx={{ px: { xs: 1, md: 3 } }}>
              <Typography sx={{ fontSize: { xs: "85%", }}}>
                {checkDate[0] ? dateToString(checkDate[0]) : ""} -{" "}
                {checkDate[1] ? dateToString(checkDate[1]) : ""}
              </Typography>
            </Button>
            <Box sx={{backgroundColor: "#DDDDDD", flex: "0 0 1px", height: "24px", width: "1px", }}></Box>
            <Button onClick={handleFilterInClick} sx={{ px: { xs: 1, md: 3 }, }}>
              <Typography sx={{ textTransform: "none", fontSize: { xs: "87%", }}}>
                {occupants.dogs}
              </Typography>
              <PetsIcon sx={{ color: "primary.main", fontSize: "90%", mb: 0.2, ml: 0.3, }}/>
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
              <Typography sx={{ textTransform: "none", fontSize: "87%", }} >
                {occupants.adults + occupants.children}
              </Typography>
              <PersonIcon sx={{ color: "primary.main", fontSize: "100%",mb: 0,ml: 0.1, }}/>
            </Button>
            <IconButton onClick={handleFilterInClick} sx={{ mt: { xs: '1rem' }}}>
              <SearchOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      )}



      {zoomIn && (
        <Box sx={{ borderRadius: 6, backgroundColor: { xs: "white", md: "transparent", }, py: { xs: 1.5, md: 0 }, pt: '0px'}}>
          <Zoom in={zoomIn} timeout={{ enter: 200, }} >
            <Box sx={{ borderRadius: '12px', pt: { xs: 0, md: 0 }, pb: 0, px: 2.5, my: { xs: 0 }, }}>
              <Box sx={{display: { md: "flex", xs: "block", }, justifyContent: "center",}}>
                <Box sx={{ minWidth: "150px",mb: { xs: 1, md: 0, }, display: "flex", alignItems: "end", }} >
                  <Autocomplete options={cities} value={getCity(selectedCity) || null}
                    getOptionLabel={(option: any) => {
                      return option.name;
                    }}
                    // eslint-disable-next-line
                    onChange={(e, values: any) => {
                      if (values) {
                        setFormError("");
                        setSelectedCity(values.id);
                      }
                    }}
                    sx={{ width: { xs: "100%", md: "180px" }, minWidth: "180px", ml: { xs: 0, md: 2 }, }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        color="primary"
                        variant="standard"
                        label="Location"
                        size="small"
                        sx={{ label: { fontWeight: "bold", }, input: { cursor: "pointer", color: "primary.main", border: "none", mt: 0.55, mb: 0.25, },}}
                      />
                    )}
                  />
                </Box>
                <Box sx={{ fontFamily: "Roboto", fontWeight: 400, display: "flex", alignItems: "end", }} >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                    inputFormat="MMM dd, yyyy"
                    disableMaskedInput={true}
                      open={open}
                      onAccept={() =>setIsAccept(true)}
                      onClose={handleDateRangeClose}
                      onOpen={() => {
                        if (!isAccept) {
                          setOpen(true);
                        }
                      }}
                      startText="Check-in"
                      endText="Check-out"
                      allowSameDateSelection
                      calendars={1}
                      clearable={true}
                      value={checkDate || null}
                      minDate={new Date()}
                      onChange={(newValue) => {
                        setFormError("");
                        setCheckDate(newValue);
                      }}
                      renderInput={(startProps, endProps) => (
                        <Box
                          sx={{
                            display: {
                              xs: "block",
                              md: "flex",
                            },
                          }}
                        >
                          <TextField
                            {...startProps}
                            onFocus={() => {
                              setIsTextField(true);
                            }}
                            onBlur={() => {
                              setIsTextField(false);
                            }}
                            onClick={() => {
                              setOpen(true);
                            }}
                            size="small"
                            color="primary"
                            variant="standard"
                            ref={
                              startProps.inputRef as React.Ref<HTMLInputElement>
                            }
                            sx={{
                              width: { xs: "50%", md: "100px" },
                              my: { xs: 0.5, md: 0 },
                              label: {
                                fontWeight: "bold",
                              },
                              input: {
                                cursor: "pointer",
                                color: "primary.main",
                                border: "none",
                              },
                            }}
                          />
                          <TextField
                            {...endProps} onFocus={() => setIsTextField(true)} onBlur={() => setIsTextField(false)} onClick={() => setOpen(true) }
                            size="small"
                            color="primary"
                            variant="standard"
                            ref={
                              endProps.inputRef as React.Ref<HTMLInputElement>
                            }
                            sx={{ width: { xs: "50%", md: "100px" }, my: { xs: 0.5, md: 0 }, label: { fontWeight: "bold", }, input: { color: "primary.main", cursor: "pointer", }, }}
                          />
                        </Box>
                      )}
                    />
                  </LocalizationProvider>
                </Box>
                <Box sx={{ minWidth: "240px", mt: { xs: 1, md: 0, }, display: "flex", alignItems: "end", }}>
                  <OccupantSelector value={occupants} onChange={onOccupantChange} variant="standard" size="small" sx={{ label: { fontWeight: "bold", }, input: { color: "primary.main", cursor: "pointer", }, }}/>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Button
                    onClick={handleFilterOutClick}
                    disableElevation
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                      pb: { xs: 1.5, md: 1.5 },
                      pt: { xs: 1.5, md: 1.5 },
                      pr: 6,
                      mx: 0,
                      borderBottomRightRadius: { xs: 24, md: "30px" },
                      borderTopRightRadius: { xs: 24, md: "30px" },
                      borderBottomLeftRadius: { xs: 24, md: "0px" },
                      borderTopLeftRadius: { xs: 24, md: "00px" },
                      my: { xs: 0.5, md: 0 },
                      mt: { xs: '1rem', },
                      width: { xs: "100%" },
                      fontWeight: "bold",
                    }}
                  >
                    <SearchIcon /> Search
                  </Button>
                </Box>
              </Box>
              {formError.length > 0 && (
                <Typography  variant="body2" color="error" sx={{ textAlign: "center", mt: 1 }}>
                  {formError}
                </Typography>
              )}
            </Box>
          </Zoom>
        </Box>
      )}
    </Box>
  </Box>
    <Typography sx={{ textAlign: 'center', m: { xs: '1.5rem auto', sm: '2rem auto 0rem auto' }, userSelect: 'none'}}>
      Need some inspiration? <br /> <Button disableElevation variant='contained' onClick={handleImFlexibleClick} sx={{ mt: { xs: '1rem', sm: '.5rem' }, background: 'rgba(250, 250, 250, 0.9)', border: '2px solid #03989E80', color: '#03989E', borderRadius: '24px',fontWeight: 600, cursor: 'pointer', '&:hover': { background: '#fff' }}}> I&lsquo;m Flexible <Shuffle sx={{ fontSize: '20px', ml: '1rem' }} />
      </Button>
    </Typography>
  </>
};


export default Header;
