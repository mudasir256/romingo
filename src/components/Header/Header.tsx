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

interface Props {
  sx?: CSSObject
}

const variants = [
  "Book pet-friendly hotels with Romingo and pay $0 in pet fees",
  "Book the lowest hotel rates with Romingo",
  "The only booking site that waives hotel pet fees",
  "Discover the best rates at luxury hotels",
  "Never pay pet fees again with Romingo"
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
  'url("https://storage.googleapis.com/romingo-development-public/images/front-end/background-jackrussel.jpeg")',
  'url("https://storage.googleapis.com/romingo-development-public/images/front-end/woman-with-dog-in-snow.jpg")',
  'url("https://storage.googleapis.com/romingo-development-public/images/front-end/hotel-pool.jpeg")',
  'url("https://storage.googleapis.com/romingo-development-public/images/front-end/couple-pointing-with-dog.jpg")',
  'url("https://storage.googleapis.com/romingo-development-public/images/front-end/open-road.jpeg")',
];

const Header: FC<Props> = ({ sx }) => {
  const [bgImage, setBgImage] = useState("");
  const [variant] = useState(localStorage.getItem('ROMINGO_EXPERIMENT_VAR'))

  useEffect(() => {
    setBgImage(bgImages[Math.floor(Math.random() * bgImages.length)]);
  }, [])

  return (
    <Box sx={{ width: "100%", minHeight: { xs: 620, md: "100vh", }, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", top: 0, left: 0, ...sx,}}>
      <Navbar />

      <Box sx={{ position: "absolute", top: 0, left: 0, zIndex: 0, width: "100%", }}>
        <Box sx={{
            objectFit: "cover",
            width: "100%",
            height: { xs: 620, md: "100vh" },
            position: "relative",
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
      <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", }} >
        <Box sx={{
            borderRadius: { xs: 0, md: 3 },
            zIndex: 100,
            backgroundColor: "rgba(255,255,255, .8)",
            maxWidth: { xs: "100%", md: "90%", xl: "80%" },
            pt: { xs: 2, md: 3.5 },
            pb: { xs: 0, md: 3.5 },
            px: { xs: 0, md: 5 },
            mx: 1,
          }}
        >
          <Typography variant="h1" sx={{ color: "primary.main", textAlign: "center", fontSize: { xs: "2.5rem", md: "4rem" }, }}>
            Welcome to Pet-Friendly Travel
          </Typography>
          <Typography variant="h4" sx={{ color: "text.secondary", textAlign: "center", fontSize: { xs: "1.25rem", md: "2rem" }, margin: "0 auto", px: 2, mt: 1, }} >
            {variants[variant ? parseFloat(variant) : 0]}
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
  const [checkDate, setCheckDate] = useState<RangeInput<Date | null>>([ search.checkIn ? search.checkIn : null, search.checkOut ? search.checkOut : null ])
  const [occupants, setOccupants] = useState(search.occupants);
  const matches = useMediaQuery('(max-width:800px)')
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

    <Box sx={{ maxWidth: "830px",margin: "0 auto", backgroundColor: "white", py: { xs: 0, md: 1.75 }, mt: { xs: 2, md: 4 }, borderRadius: { xs: 1, md: 25 }, boxShadow: 5, }}>


    <Box sx={{ ...sx, }}>
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
            <IconButton onClick={handleFilterInClick}>
              <SearchOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      )}



      {zoomIn && (
        <Box sx={{ borderRadius: 3, backgroundColor: { xs: "white", md: "transparent", }, py: { xs: 1.5, md: 0 }, }}>
          <Zoom in={zoomIn} timeout={{ enter: 200, }} >
            <Box sx={{ pt: { xs: 1, md: 0 }, pb: 0, px: 2.5, my: { xs: 0 }, }}>
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
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                      pb: { xs: 1.5, md: 1.5 },
                      pt: { xs: 1.5, md: 1.5 },
                      pr: 6,
                      mx: 0,
                      borderBottomRightRadius: { xs: 0, md: "30px" },
                      borderTopRightRadius: { xs: 0, md: "30px" },
                      borderBottomLeftRadius: "0px",
                      borderTopLeftRadius: "0px",
                      my: { xs: 0.5, md: 0 },
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
    <Typography sx={{ textAlign: 'center', m: matches ? '1rem auto' : '2rem auto 0rem auto', userSelect: 'none'}}>
      Need some inspiration? <Link onClick={handleImFlexibleClick} sx={{cursor: 'pointer'}}> I&lsquo;m Flexible </Link>
    </Typography>
  </>
};


export default Header;
