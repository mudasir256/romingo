import loadable from '@loadable/component'
import { withStyles } from "@mui/styles";
import { Box, Button, Chip, Container, Dialog, DialogContent, DialogTitle, Divider, Grid, Grow, IconButton, ImageList, ImageListItem, Link, Popover, SvgIcon, useMediaQuery } from "@mui/material";
import { Dispatch, FC, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import ScrollToTop from "../../components/ScrollToTop";
import DetailsPageSkeleton from "./DetailsPageSkeleton";
import styles from "./DetailsPageStyles";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Backdrop, Hidden, Popper, Typography } from "@mui/material";
import RomingoScore from "../../components/RomingoScore";
import { Circle, Pets, Wifi } from "@mui/icons-material";
import BookingCardNew from "../../components/BookingCard/BookingCardNew";
import { gql, useQuery } from "@apollo/client";
import { getHotelDetailById, getPackages } from "../../constants/constants";
import { useHistory } from "react-router-dom";
import ImageSlider from "../../components/ImageSlider";
import { RoomsFilterBar } from "./DetailsPage";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setCheckout } from "../../store/hotelCheckoutReducer";
import { setHotel } from "../../store/hotelDetailReducer";
import DogIcon from "../../assets/icon/dog.png";
import SimpleReactLightbox from "simple-react-lightbox";
import CloseIcon from "@mui/icons-material/Close";
const Map = loadable(() => import('../../components/UI/Map/Map'))

const DetailsPage1 = ({ ...props }) => {

  const chipIconStyle = {
    fontSize: { xs: "0.72em", sm: "0.75em" },
    backgroundColor: "transparent",
    fontFamily: "overpass-light",
    mt: "0.35em",
    display: "flex",
    justifyContent: "flex-start",
    mr: "0.4em",
  };

  const iconSpacing = {
    mt: "0.15em",
    ml: "0.15em",
  };
  const classes = props.classes;
  const mobile = useMediaQuery("(max-width:800px)");
  const history = useHistory();

  const hotelId = props?.match?.params?.alias || "undefined";
  const initialSessionId = props?.history?.location?.state?.sessionId || "undefined";

  const [rooms, setRooms] = useState([])
  const [roomsDetails, setRoomsDetails] = useState([])
  const [openDetails, setOpenDetails] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | Element>(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [sessionId, setSessionId] = useState('');
  const [hotel, setHotelDetails] = useState(null)
  const search = useSelector((state: any) => state.searchReducer.search);
  const dispatch = useDispatch();
  const [showGallery, setShowGallery] = useState(false);
  const [accessibleRooms, setAccessibleRooms] = useState([]);
  const [showFullImage, setShowFullImage] = useState<string>('');

  console.log(search)

  const childrenAge = search?.occupants?.children > 0 ? search?.occupants?.childrenAge.join(',') : ''

  //ACK: this should return rooms for date range selected
  const { data, loading, error, refetch } = useQuery(
    gql`
      ${getPackages(search.occupants.adults, parseInt(moment(search.checkIn).format('x')), parseInt(moment(search.checkOut).format('x')), childrenAge, search.lat, search.lng, [hotelId])}
    `
  );

  //TODO: WG, implement trip advisor compare rate
  // const { data: priceCheck, loading: taLoading, error: taError } = useQuery(
  //   gql`${TripHotelList}`,
  //   {
  //     variables: {
  //       hotel_ids: data?.getPropertyDetails?.id || '',
  //       hotel_id_type: 'TA',
  //       checkIn: search?.checkIn.substring(0, 10),
  //       checkOut: search?.checkOut.substring(0, 10),
  //       num_adults: search?.occupants?.adults.toString(),
  //       num_rooms: '1',
  //       currency: 'USD'
  //     }
  //   }
  // )


  useEffect(() => {
    if (data && data.getHotelDetails) {
      const accessibleRooms = [];
      const nonAccessibleRooms = [];
      for (const room of data.getHotelDetails.Result) {
        const roomName = room?.Rooms?.find(item => true)?.RoomName?.toLowerCase()
        if (roomName?.includes('accessible')) {
          accessibleRooms.push(room);
        } else {
          nonAccessibleRooms.push(room)
        }
      }

      setRooms(nonAccessibleRooms);
      setAccessibleRooms(accessibleRooms);
      setRoomsDetails(data.getHotelDetails.RoomsContent);
      setSessionId(data.getHotelDetails.sessionId)
      setHotelDetails(data.getHotelDetails.hotelDetails[0]);
    }
  }, [data])

  const handleOpen = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowGallery(true);
  };

  const handleClose = () => {
    setShowGallery(false);
  };

  const getImageCols = () => {
    if (mobile) {
      return 1;
    }
    return 3;
  };

  if (loading) {
    return <DetailsPageSkeleton />
  }

  if (!hotel) {
    return (<div>TODO: Error screen</div>)
  }

  return (
    <Grid sx={{ background: "#feffff", scrollBehavior: "smooth" }}>
      <ScrollToTop />
      <Navbar />
      <Grid container direction='row' spacing={2} sx={{ maxWidth: mobile ? '95%' : 1200, margin: 'auto', position: 'relative', maxHeight: '500px',objectFit: 'contain' }} >
        <Grid item xs={12} md={6} style={{ padding: mobile ? 0 : '10px', height: '500px' }}>
          <Box
            component="img"
            src={hotel.images[0]}
            // alt={name}
            boxShadow={1}
            // onClick={handleOpen}
            className={classes.mainBox}
          />
        </Grid>
        <Grid item xs={12} sm={6} display={{ xs: 'none', sm: 'block' }}>
          {<Grid container spacing={2}>
            {
              hotel.images.slice(1, 5).map((img: any) => {
                return (
                  <Grid item sm={6} key={img} style={{ padding: mobile ? 0 : '10px', height: '250px' }}>
                    <Box
                      // onClick={handleOpen}
                      boxShadow={1}
                      component="img"
                      src={img}
                      // alt={name}
                      className={classes.sideBox}
                    />
                  </Grid>
                );
              })}
          </Grid>}
        </Grid>
        <Box
          sx={{
            position: "absolute",
            right: { xs: "-10px", md: "20px" },
            bottom: { xs: "8px", md: "20px" },
            textAlign: "right",
          }}
        >
          <Button
            variant="outlined"
            size="small"
            sx={{
              textTransform: "none",
              backgroundColor: "white",
              "&:hover": { backgroundColor: "#fff" },
            }}
            onClick={handleOpen}
          >
            <PhotoCameraIcon sx={{ fontSize: 15, mr: 0.5 }} />
            View Photos
          </Button>
        </Box>
      </Grid>

      <Grid container direction={'row'} sx={{ maxWidth: 1200, margin: 'auto', position: 'relative', marginTop: '20px' }}>
        <Grid item xs={12} md={6} sx={{ paddingLeft: '16px' }}><Typography variant="h6" >{hotel.hotelName}</Typography></Grid>
        <Grid item xs={12} md={3} sx={{ display: 'inline-flex' }}><RomingoScore score={hotel.starRating} />
          <Circle
            sx={{
              fontWeight: 500,
              mx: 0.5,
              opacity: 0.75,
              color: "#BC4749",
              fontSize: "20%",
              margin: 'auto 10px'
            }} />
          <Link
            // onClick={() => setReviewDialog(true)}
            sx={{
              cursor: "pointer",
              color: "#666",
              textDecoration: "underline",
              display: { xs: "inline", sm: "inline", md: "block" },
              fontWeight: 500,
              opacity: 0.75,
              fontSize: "70%",
              margin: 'auto 5px'
            }}
          >
            1000 reviews
          </Link>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          sx={{ paddingLeft: "16px", marginBottom: "1rem" }}
        >
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Chip
              size="small"
              sx={{ ...chipIconStyle, ".MuiChip-label": { pl: 0, ml: 0 } }}
              label={
                <Box sx={{ ml: "0em", pl: 0 }}>{hotel.petFee}</Box>
              }
            />
            <Chip
              size="small"
              sx={chipIconStyle}
              icon={<Pets fontSize="small" />}
              label={<Box sx={iconSpacing}>{hotel.petAllowance}</Box>}
            />
            <Chip
              size="small"
              sx={chipIconStyle}
              icon={<img width="18px" src={DogIcon} />}
              label={<Box sx={iconSpacing}>{hotel.petSize}</Box>}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={10}
          sx={{ paddingLeft: "16px", marginBottom: "1rem" }}
        >
          <Typography variant="base">{hotel.petPolicyDescription}</Typography>
          <Box my="2rem">
            <Divider />
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={10}
          sx={{ paddingLeft: "16px", marginBottom: "1rem" }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem'}}>
            <Typography variant="h6">Hotel Amenities</Typography>
            <p>TODO: See all</p>
          </Box>
          <Grid container direction='row' spacing={0}>
            {hotel.amenities.map(item => 
              <Grid item xs={6} key={item.code}><Box>icon: {item.name}</Box></Grid>
            )}
          </Grid>
          <Box my="2rem">
            <Divider />
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={10}
          sx={{ paddingLeft: "16px", marginBottom: "1rem" }}
        >
          <Typography variant="h5">Where You&apos;ll Be</Typography>
          <Typography
            variant="h6"
            sx={{
              letterSpacing: ".015rem",
              mt: ".5rem",
          
              color: "#999",
              fontWeight: 400,
            }}
          >
            {hotel.fullAddressLine}
          </Typography>
          <Box sx={{ display: "flex", my: 2, width: "100%" }}>
            <Map
              center={{
                lat: parseFloat(hotel.lat || 0),
                lng: parseFloat(hotel.lng || 0),
              }}
              height={240}
              markers={[{
                lat: parseFloat(hotel.lat || 0),
                lng: parseFloat(hotel.lng || 0),
                type: "hotel",
                label: hotel.hotelName,
              }]}
              zoom={14}
              selectedMarker={0}
            />
          </Box>
          <Box my="2rem">
            <Divider />
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={10}
          sx={{ paddingLeft: "16px", marginBottom: "1rem" }}
        >
          <Typography variant="h6">Hotel Description</Typography>
          <Typography variant="base">{hotel.description}</Typography>
          <Box my="2rem">
            <Divider />
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={10}
          sx={{ paddingLeft: "16px", marginBottom: "1rem" }}
        >
          <Typography variant="h6">Compare Rates</Typography>
          <Typography variant="base">Book with Romingo.com to get the best rates at pet-friendly hotels. Romingo guests pay $0 pet fees and receive VIP pet amenities upon arrival.</Typography>
     {/*     <Box mt="1.5rem" display="flex" gap="2rem" sx={{ flexDirection: { xs: 'column', sm: 'column', md: 'row'}  }}>
            <Box position="relative" py="2rem" px="4rem" textAlign="center" border="solid 1px black">
              <div style={{ marginBottom: '0.5rem'}}><img style={{width: '206px'}} src="https://romingo.com/static/media/logo.11150e63.png" /></div>
              <Typography variant="p" py="2rem"><b>${lowestRomingoRate}</b></Typography>
              <Box position="absolute" bottom="-12px" left="50%" style={{ transform: 'translate(-49%, 0%)' }} backgroundColor="white">
                <Typography variant="base">$0 pet fee</Typography>
              </Box>
            </Box>
            <a style={{ textDecoration: 'none', color: 'black'}} href={priceCheck?.tripHotelList?.data?.results.find(Boolean)?.offers?.find(Boolean)?.clickUrl} target="_blank" rel="noreferrer">
              <Box position="relative" py="2rem" px="3rem" textAlign="center" border="solid 1px black">
                <div style={{ marginBottom: '0.5rem'}}><img style={{width: '240px'}} src="https://tripadvisor.mediaroom.com/images/Tripadvisor_Logo_circle-green_horizontal-lockup_registered_RGB.svg" /></div>
                <Typography variant="p" py="2rem"><b>{priceCheck?.tripHotelList?.data?.results.find(Boolean)?.offers?.find(Boolean)?.displayPrice}</b></Typography>
                <Box position="absolute" bottom="-12px" left="50%" style={{ transform: 'translate(-49%, 0%)' }} backgroundColor="white">
                  <Typography variant="base">${utils.computePetFeePolicyTotalFees(diffDays || 1, search.occupants.dogs || 1, data?.getPropertyDetails?.petFeePolicy || {})} pet fee</Typography>
                </Box>
              </Box>
            </a>
          </Box>     */}     
        </Grid>

  
        {/* <Grid item xs={12} md={3}><Hidden mdDown>
          <BookingCardNew
            sx={{ background: "#fff" }}
            roomList={rooms}
            roomListDetails={roomsDetails}
          // goToRate={goToRateScroll}
          />
        </Hidden></Grid> */}
        <Grid
          container
          sx={{
            mt: 0,
            maxWidth: "100%",
            paddingBottom: { xs: "2rem", sm: "2rem" },
            borderBottom: "1px solid #ddd",
          }}
          id="rooms"
        >
          <Grid item xs={12} ml="1rem">
            <Typography
              variant="h6"
            >
              Choose your room
            </Typography>
            <RoomsFilterBar refetch={refetch} />
          </Grid>
          {rooms.length > 0 ?
            <Grid container >
              {rooms.map((room: any, key: number) => {
                const filterroom = roomsDetails.filter(d => d.RoomKey === room.Rooms[0].TargetRoomKey)[0];
                let images = filterroom ? filterroom.Images : [];
                if (images.length === 0) {
                  images = ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png']
                }
                return (
                  <Grid
                    item
                    container
                    direction='column'
                    spacing={2}
                    md={4}
                    lg={4}
                    sm={6}
                    xs={12}
                    key={key}
                    style={{ margin: 10, maxWidth: mobile ? '100%' : 280, position: 'relative' }}
                    sx={{
                      transition: "all .15s ease-in-out",
                      boxShadow: 1,
                      "&:hover": { boxShadow: 3 },
                      margin: '0.5rem 0px 0px',
                      fontFamily: 'overpass-light',
                      lineHeight: '1.5rem',
                      color: 'rgba(17, 17, 17, 0.6)',
                      textAlign: 'left',
                      display: 'inline-block',
                      fontSize: '80%',
                      fontWeight: 700
                    }}
                  >
                    <Grid item style={{ padding: 0 }}>
                      <ImageSlider images={images} name={room.Rooms[0].RoomName} />
                    </Grid>
                    <Grid item style={{ padding: 10 }}>
                      <Typography
                        variant="h6"
                      // onClick={handleBook}
                      >
                        {room.Rooms[0].RoomName} &nbsp;
                      </Typography>
                    </Grid>
                    <Grid item style={{ display: 'flex', padding: 10 }}>
                      <SvgIcon
                        sx={{ color: "#666", mr: "1rem", fontSize: "18px" }}
                        component={Wifi}
                      />
                      <Typography
                        variant="body1"
                      >
                        Free Wifi
                      </Typography></Grid>

                    <Grid item style={{ padding: 10 }}>
                      <Box
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="body2"
                            style={{ marginTop: 10 }}
                          >
                            ${(room.PackagePrice.FinalPrice / moment(search.checkOut).diff(moment(search.checkIn), 'days')).toFixed(2)} per night
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item style={{ padding: 10 }}>
                      <Box
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="body2"
                            style={{ marginTop: 10 }}
                          >
                            ${(room.PackagePrice.FinalPrice).toFixed(2)} TOTAL
                            <br />
                            incl. all taxes and fees
                            <u
                              onClick={(e) => { setAnchorEl(e.currentTarget); setOpenDetails(true); setSelectedRoom(room); }}
                              style={{
                                cursor: "pointer",
                                display: "block",
                                color: "#11111180",
                                marginTop: 10
                              }}
                            >
                              See Details
                            </u>
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Button
                      disableElevation
                      variant="contained"
                      size="small"
                      color="primary"
                      style={{ position: 'absolute', bottom: 0, right: 0, margin: 10 }}
                      onClick={() => {
                        dispatch(
                          setCheckout({
                            room: room,
                            hotel: hotel,
                            sessionId: sessionId
                          })
                        );
                        history.push("/checkout")
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 600,
                          textTransform: "capitalize",
                          fontSize: { xs: "14px" },
                        }}
                      >
                        Reserve
                      </Typography>
                    </Button>

                    {/* {filterroom.Amenities.map((a, i) => <Typography key={i}>{a}</Typography>)} */}
                  </Grid>
                );
              })}
            </Grid>
            : <Typography sx={{ textAlign: 'center' }}>No rooms found in this date range.</Typography>
          }
          {accessibleRooms.length > 0 &&
            <Box width="100%">
              <Divider variant="middle" light sx={{ mt: 6, mb: 2 }}>
                <Typography variant="h6">Accessible Rooms</Typography>
              </Divider>
              <Grid container>
              {accessibleRooms.map((room: any, key: number) => {
                const filterroom = roomsDetails.filter(d => d.RoomKey === room.Rooms[0].TargetRoomKey)[0];
                let images = filterroom ? filterroom.Images : [];
                if (images.length === 0) {
                  images = ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png']
                }
                return (
                  <Grid
                    item
                    container
                    direction='column'
                    spacing={2}
                    md={4}
                    lg={4}
                    sm={6}
                    xs={12}
                    key={key}
                    style={{ margin: 10, maxWidth: mobile ? '100%' : 280, position: 'relative' }}
                    sx={{
                      transition: "all .15s ease-in-out",
                      boxShadow: 1,
                      "&:hover": { boxShadow: 3 },
                      margin: '0.5rem 0px 0px',
                      fontFamily: 'overpass-light',
                      lineHeight: '1.5rem',
                      color: 'rgba(17, 17, 17, 0.6)',
                      textAlign: 'left',
                      display: 'inline-block',
                      fontSize: '80%',
                      fontWeight: 700
                    }}
                  >
                    <Grid item style={{ padding: 0 }}>
                      <ImageSlider images={images} name={room.Rooms[0].RoomName} />
                    </Grid>
                    <Grid item style={{ padding: 10 }}>
                      <Typography
                        variant="h6"
                      // onClick={handleBook}
                      >
                        {room.Rooms[0].RoomName} &nbsp;
                      </Typography>
                    </Grid>
                    <Grid item style={{ display: 'flex', padding: 10 }}>
                      <SvgIcon
                        sx={{ color: "#666", mr: "1rem", fontSize: "18px" }}
                        component={Wifi}
                      />
                      <Typography
                        variant="body1"
                      >
                        Free Wifi
                      </Typography></Grid>

                    <Grid item style={{ padding: 10 }}>
                      <Box
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="body2"
                            style={{ marginTop: 10 }}
                          >
                            ${(room.PackagePrice.FinalPrice / moment(search.checkOut).diff(moment(search.checkIn), 'days')).toFixed(2)} per night
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item style={{ padding: 10 }}>
                      <Box
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="body2"
                            style={{ marginTop: 10 }}
                          >
                            ${(room.PackagePrice.FinalPrice).toFixed(2)} TOTAL
                            <br />
                            incl. all taxes and fees
                            <u
                              onClick={(e) => { setAnchorEl(e.currentTarget); setOpenDetails(true); setSelectedRoom(room); }}
                              style={{
                                cursor: "pointer",
                                display: "block",
                                color: "#11111180",
                                marginTop: 10
                              }}
                            >
                              See Details
                            </u>
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Button
                      disableElevation
                      variant="contained"
                      size="small"
                      color="primary"
                      style={{ position: 'absolute', bottom: 0, right: 0, margin: 10 }}
                      onClick={() => {
                        dispatch(
                          setCheckout({
                            room: room,
                            hotel: hotel,
                            sessionId: sessionId
                          })
                        );
                        history.push("/checkout")
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 600,
                          textTransform: "capitalize",
                          fontSize: { xs: "14px" },
                        }}
                      >
                        Reserve
                      </Typography>
                    </Button>

                    {/* {filterroom.Amenities.map((a, i) => <Typography key={i}>{a}</Typography>)} */}
                  </Grid>
                );
              })}
              </Grid>
            </Box>
          }
        </Grid>

        {/* Review section */}
        <Grid
          item
          xs={12}
          md={10}
          sx={{ paddingLeft: "16px", my: "1rem" }}
        >

          <Typography variant="h6">What People Are Saying</Typography>
          {/* TODO: load tripadvisor reviews */}
        </Grid>

      </Grid>



      <Popover open={Boolean(openDetails)} anchorEl={anchorEl} onClose={() => setOpenDetails(false)} anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <Box style={{ textAlign: 'center', padding: 10 }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
              mb: ".5rem",
              fontSize: "80%",
              textAlign: "center",
            }}
          >
            Price Details
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 2,
              mb: 0.5,
            }}
          >
            <Typography
              variant="body2"
              sx={{ textAlign: "left", fontSize: "80%" }}
            >
              Total amount:&nbsp;&nbsp;&nbsp;
            </Typography>
            <Typography
              variant="body2"
              sx={{ textAlign: "right", fontSize: "80%" }}
            >
              ${selectedRoom && selectedRoom.PackagePrice.FinalPrice.toFixed(2) - (selectedRoom.PackagePrice.FinalTax).toFixed(2)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 2,
              mb: 0.5,
            }}
          >
            <Typography
              variant="body2"
              sx={{ textAlign: "left", fontSize: "80%" }}
            >
              Taxes:&nbsp;&nbsp;&nbsp;
            </Typography>
            <Typography
              variant="body2"
              sx={{ textAlign: "right", fontSize: "80%" }}
            >
              ${selectedRoom && (selectedRoom.PackagePrice.FinalTax).toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </Popover>
      <SimpleReactLightbox>
        <Dialog
          open={showGallery}
          keepMounted
          fullScreen
          onClose={handleClose}
          scroll="paper"
          aria-labelledby="photo-dialog-slide-title"
          aria-describedby="photo-dialog-slide-description"
        >
          <DialogTitle
            id="photo-dialog-slide-title"
            sx={{
              position: "sticky",
              backgroundColor: "white",
              display: "flex",
              height: "30px",
              justifyContent: "space-between",
              alignItems: "bottom",
              top: 0,
              zIndex: 10000,
              color: "primary.main",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#222222",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              Photos
            </Typography>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{ color: (theme) => theme.palette.grey[500] }}
              size="large">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ px: 0 }}>

            <Container maxWidth="xl" sx={{ mt: { xs: 0, md: 2 } }}>
              <ImageList variant="standard" cols={getImageCols()} gap={8}>
                {hotel?.images?.map((item: any, index: Integer) => (
                  <ImageListItem key={item} onClick={() => {
                    if (!mobile) {
                      setShowFullImage(item)
                    }
                  }}>
                    <img
                      srcSet={`${item.replace(
                        /^http(s?):/i,
                        ""
                      )}?w=161&fit=crop&auto=format 1x,
${item.replace(/^http(s?):/i, "")}?w=161&fit=crop&auto=format&dpr=2 2x`}
                      alt={name}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Container>
          </DialogContent>
        </Dialog>

        {showFullImage && 
          <Dialog maxWidth="xl" sx={{ p: '2rem',  }} open={true} onClick={() => setShowFullImage('')}>
            <img src={showFullImage}  style={{ maxHeight: '80vh', objectFit: 'contain' }} />
          </Dialog>
        }

        {/* <SRLWrapper options={lightBoxOptions} /> */}

      </SimpleReactLightbox>
    </Grid>
  )
}

export default withStyles(styles)(DetailsPage1);
