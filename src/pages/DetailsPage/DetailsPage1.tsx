import { withStyles } from "@mui/styles";
import { Box, Button, Divider, Grid, Grow, Link, Popover, SvgIcon, useMediaQuery } from "@mui/material";
import { Dispatch, FC, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import ScrollToTop from "../../components/ScrollToTop";
import DetailsPageSkeleton from "./DetailsPageSkeleton";
import styles from "./DetailsPageStyles";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Backdrop, Hidden, Popper, Typography } from "@mui/material";
import RomingoScore from "../../components/RomingoScore";
import { Circle, Wifi } from "@mui/icons-material";
import BookingCardNew from "../../components/BookingCard/BookingCardNew";
import { gql, useQuery } from "@apollo/client";
import { getPackages } from "../../constants/constants";
import { useHistory } from "react-router-dom";
import ImageSlider from "../../components/ImageSlider";
import { RoomsFilterBar } from "./DetailsPage";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setCheckout } from "../../store/hotelCheckoutReducer";
import { setHotel } from "../../store/hotelDetailReducer";

const DetailsPage1 = ({ ...props }) => {
  const classes = props.classes;
  const mobile = useMediaQuery("(max-width:800px)");
  const history = useHistory();

  const hotelId = props?.match?.params?.alias || "undefined";

  const [rooms, setRooms] = useState([])
  const [roomsDetails, setRoomsDetails] = useState([])
  const [loading, setLoading] = useState(true)
  const [openDetails, setOpenDetails] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | Element>(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [sessionId, setSessionId] = useState('');
  const [hotel, setHotelDetails] = useState(null)
  const search = useSelector((state: any) => state.searchReducer.search);
  const dispatch = useDispatch();
  const [accessibleRooms, setAccessibleRooms] = useState([]);
  console.log(search)

  const { data, error, refetch } = useQuery(
    gql`
      ${getPackages(search.occupants.adults, parseInt(moment(search.checkIn).format('x')), parseInt(moment(search.checkOut).format('x')), search.occupants.children, search.lat, search.lng, [hotelId])}
    `
  );


  useEffect(() => {
    if (data && data.getHotelDetails) {
      const accessibleRooms = [];
      const nonAccessibleRooms = [];
      for(const room of data.getHotelDetails.Result){
        const filterroom = data.getHotelDetails.RoomsContent.filter(d => d.RoomKey === room.Rooms[0].TargetRoomKey)[0];
        if(filterroom && filterroom.Descriptions.includes('Room Accessible')) {
          accessibleRooms.push(room);
        }else{
          nonAccessibleRooms.push(room)
        }
      }

      setRooms(nonAccessibleRooms);
      setAccessibleRooms(accessibleRooms);
      setRoomsDetails(data.getHotelDetails.RoomsContent);
      setSessionId(data.getHotelDetails.sessionId)
      setHotelDetails(data.getHotelDetails.hotelDetails);
      setLoading(false);
    }
  }, [data])

  if (loading) {
    return <DetailsPageSkeleton />
  }

  const gallery = ['https://storage.googleapis.com/romingo-production-public/images/Grand%20Hyatt%20San%20Diego/Manchester-Grand-Hyatt-San-Diego-P508-Exterior-Marina.16x9.webp',
    'https://storage.googleapis.com/romingo-production-public/images/Grand%20Hyatt%20San%20Diego/Manchester-Grand-Hyatt-San-Diego-P566-Lobby-Front-Desk-Wide.16x9.webp',
    'https://storage.googleapis.com/romingo-production-public/images/Grand%20Hyatt%20San%20Diego/Manchester-Grand-Hyatt-P214-King-View.16x9.webp',
    'https://storage.googleapis.com/romingo-production-public/images/Grand%20Hyatt%20San%20Diego/SANRS-P235-Penthouse-Bedroom.16x9.webp',
    'https://storage.googleapis.com/romingo-production-public/images/Grand%20Hyatt%20San%20Diego/SANRS-P319-Conference-Suite-B-Living-Room.16x9.webp']


  return (
    <Grid sx={{ background: "#feffff", scrollBehavior: "smooth" }}>
      <ScrollToTop />
      <Navbar />
      <Grid container direction='row' spacing={2} sx={{ maxWidth: mobile ? '95%' : 1200, margin: 'auto', position: 'relative', }} >
        <Grid item xs={12} md={6} style={{ padding: mobile ? 0 : 'inherit' }}>
          <Box
            component="img"
            src={gallery[0]}
            // alt={name}
            boxShadow={2}
            // onClick={handleOpen}
            className={classes.mainBox}
          />
        </Grid>
        <Grid item xs={12} sm={6} display={{ xs: 'none', sm: 'block' }}>
          {<Grid container spacing={2}>
            {
              gallery.slice(1, 5).map((img: any) => {
                return (
                  <Grid item sm={6} key={img}>
                    <Box
                      // onClick={handleOpen}
                      boxShadow={2}
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
          // onClick={handleOpen}
          >
            <PhotoCameraIcon sx={{ fontSize: 15, mr: 0.5 }} />
            View Photos
          </Button>
        </Box>
      </Grid>
      <Grid container direction={'row'} sx={{ maxWidth: 1200, margin: 'auto', position: 'relative', marginTop: '20px' }}>
        <Grid item xs={12} md={6} sx={{ paddingLeft: '16px' }}><Typography variant="h6" >Yaswanth</Typography></Grid>
        <Grid item xs={12} md={3} sx={{ display: 'inline-flex' }}><RomingoScore score={1000} />
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
          <Grid item xs={12}>
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
                if(images.length === 0){
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
                      <ImageSlider images={images } name={room.Rooms[0].RoomName} />
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
                            ${(room.PackagePrice.FinalPrice/moment(search.checkOut).diff(moment(search.checkIn),'days')).toFixed(2)} per night
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
                      onClick={() => {    dispatch(
                        setCheckout({
                          room: room,
                          hotel: hotel,
                          sessionId: sessionId
                        })
                      );
                      history.push("/checkout")   }}
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
            <Grid container >
              <Divider variant="middle" light sx={{ mt: 6, mb: 2 }}>
                <Typography variant="h6">Accessible Rooms</Typography>
              </Divider>
              {accessibleRooms.map((room: any, key: number) => {
                const filterroom = roomsDetails.filter(d => d.RoomKey === room.Rooms[0].TargetRoomKey)[0];
                let images = filterroom ? filterroom.Images : [];
                if(images.length === 0){
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
                      <ImageSlider images={images } name={room.Rooms[0].RoomName} />
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
                            ${(room.PackagePrice.FinalPrice/moment(search.checkOut).diff(moment(search.checkIn),'days')).toFixed(2)} per night
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
                      onClick={() => {    dispatch(
                        setCheckout({
                          room: room,
                          hotel: hotel,
                          sessionId: sessionId
                        })
                      );
                      history.push("/checkout")   }}
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
          }
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
    </Grid>
  )
}

export default withStyles(styles)(DetailsPage1);
