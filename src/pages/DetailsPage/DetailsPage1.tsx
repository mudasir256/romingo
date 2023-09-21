import loadable from '@loadable/component'
import {Helmet} from 'react-helmet';
import { withStyles } from "@mui/styles";
import { Box, Button, Chip, Container, Dialog, DialogContent, DialogTitle, Divider, Grid, Grow, IconButton, ImageList, ImageListItem, Link, Popover, SvgIcon, useMediaQuery } from "@mui/material";
import { Dispatch, FC, useEffect, useState, useRef, useCallback } from "react";
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
import { getHotelDetailById, getPackages, TripReviews, TripHotelList } from "../../constants/constants";
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
import HotelTags from '../../components/HotelTags'
import Loader from "../../components/UI/Loader";
import StarIcon from '@mui/icons-material/Star';
import Icon from '../../components/Icon';
import {validCodes} from '../../components/Icon';
import RoomCard from "../../components/RoomCard";


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


  const hotelId = props?.match?.params?.name || "undefined";

  const initialSessionId = props?.history?.location?.state?.sessionId || "undefined";

  const [rooms, setRooms] = useState([])
  const [roomsDetails, setRoomsDetails] = useState([])

  const [sessionId, setSessionId] = useState('');
  const search = useSelector((state: any) => state.searchReducer.search);
  const dispatch = useDispatch();
  const [showGallery, setShowGallery] = useState(false);
  const [accessibleRooms, setAccessibleRooms] = useState([]);
  const [showFullImage, setShowFullImage] = useState<string>('');

  const [lowestRomingoRate, setLowestRomingoRate] = useState(0)
  const [imageIndex, setImageIndex] = useState(-1)
  const reviewsRef = useRef(null)
  const rateRef = useRef(null)

  const childrenAge = search?.occupants?.children > 0 ? search?.occupants?.childrenAge.join(',') : ''

  const { data: hotelInfo, loading: loadingHotelInfo, error: errorHotelInfo } = useQuery(
    gql`
      ${getHotelDetailById(hotelId)}
    `
  );


  const { data, loading, error, refetch } = useQuery(
    gql`
      ${getPackages(search.occupants.adults, parseInt(moment(search.checkIn).format('x')), parseInt(moment(search.checkOut).format('x')), childrenAge, search.lat, search.lng, [hotelId])}
    `
  );
  console.log(data)

  const start = search.checkIn.substring(0, 10)
  const end = search.checkOut.substring(0, 10)
  
  const date1 = new Date(start).getTime();
  const date2 = new Date(end).getTime();
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  // console.log(diffDays)

  const { data: priceCheck, loading: taLoading, error: taError } = useQuery(
    gql`${TripHotelList}`,
    {
      variables: {
        hotel_ids: hotelId,
        hotel_id_type: 'TA',
        checkIn: search?.checkIn.substring(0, 10),
        checkOut: search?.checkOut.substring(0, 10),
        num_adults: search?.occupants?.adults.toString(),
        num_rooms: '1',
        currency: 'USD'
      }
    }
  )
  
  console.log(priceCheck)

  const { data: reviews, loading: taReviewsLoading, error: taReviewError } = useQuery(
    gql`${TripReviews}`,
    {
      variables: {
        hotel_id: hotelId.toString()
      }
    }
  )

  const changeImage = useCallback((e) => {
    console.log('change')
    console.log(showFullImage)
    if (showFullImage) {
      console.log(showFullImage)
      console.log('image')
      if (event.keyCode === 39) { //arrow right
        const newIndex = imageIndex + 1
        if (newIndex > hotel?.images.length - 1) {
          setImageIndex(0)
          setShowFullImage(hotel?.images[0])
        } else {
          setShowFullImage(hotel?.images[newIndex])
          setImageIndex(newIndex)
        }
        console.log('cycle')
      } 
      if (event.keyCode === 37) { //arrow left
        const newIndex = imageIndex - 1 
        if (newIndex < 0) {
          const actualIndex = hotel?.images.length - 1
          setImageIndex(actualIndex)
          setShowFullImage(hotel?.images[actualIndex])
        } else {
          setImageIndex(newIndex)
          setShowFullImage(hotel?.images[newIndex])
        }
        console.log('cycle down')

      }
    }
  }, [showFullImage, imageIndex]);

  useEffect(() => {
    document.addEventListener('keydown', changeImage)
    return () => {
      document.removeEventListener('keydown', changeImage)
    }
  }, [changeImage])

  useEffect(() => {
    if (history?.location?.hash === '#reviews') {
      reviewsRef?.current?.scrollIntoView()    
    }
  }, [reviews])

  useEffect(() => {
    if (data && data.getHotelDetails) {
      const accessibleRooms = [];
      const nonAccessibleRooms = [];
      let lowest = 999999

      const roomPackagesOnly = data.getHotelDetails.Result.filter(room => {
        return (
          (room.Rooms[0].RoomBasis === 'Room only RO' || 
          room.Rooms[0].RoomBasis === 'Bed and Breakfast BB')
          && !room.Rooms[0].RoomName.toLowerCase().includes('quad')
          && !room.Rooms[0].RoomName.toLowerCase().includes('tri')
        )
      })
      console.log(roomPackagesOnly)

      console.log('console rooms content')
      console.log(data.getHotelDetails.RoomsContent)

      const uniqueRoomsByKey = [...new Set(data.getHotelDetails.RoomsContent.map(room => room.RoomKey))]
  
      for (const key of uniqueRoomsByKey) {
    
        const possibleRoomsRefundable = roomPackagesOnly.filter(room => room.Rooms[0].TargetRoomKey === key && room.Refundability === 1)
        const possibleRoomsNonRefundable =roomPackagesOnly.filter(room => room.Rooms[0].TargetRoomKey === key && room.Refundability === 2)
        // console.log('for key')
        // console.log(key)
        // console.log(possibleRoomsNonRefundable)
        // console.log(possibleRoomsRefundable)
        if (possibleRoomsNonRefundable.length > 1 && possibleRoomsRefundable.length > 1) {
          console.log('combined room card')
          const lowestPriceNon = possibleRoomsNonRefundable.reduce((min, current) => {
                                return current.SimplePrice < min ? current.SimplePrice : min;
                              });
          const lowestPrice = possibleRoomsRefundable.reduce((min, current) => {
                                return current.SimplePrice < min ? current.SimplePrice : min;
                              });
          lowestPrice.Rooms[0].RoomName.toLowerCase().includes('accessible') 
          ? accessibleRooms.push({ combinedRate: true, ...lowestPriceNon, refundablePrice: lowestPrice.SimplePrice, refundableRoom: lowestPrice }) 
          : nonAccessibleRooms.push({ combinedRate: true, ...lowestPriceNon, refundablePrice: lowestPrice.SimplePrice, refundableRoom: lowestPrice }) 
          continue
        }

        if (possibleRoomsNonRefundable.length === 1) {
          const newRoom = possibleRoomsNonRefundable[0]
          newRoom.Rooms[0].RoomName.toLowerCase().includes('accessible') ? accessibleRooms.push(newRoom) : nonAccessibleRooms.push(newRoom)
        } else if (possibleRoomsNonRefundable.length > 1) {
          const lowestPrice = possibleRoomsNonRefundable.reduce((min, current) => {
                                return current.SimplePrice < min ? current.SimplePrice : min;
                              });
          lowestPrice.Rooms[0].RoomName.toLowerCase().includes('accessible') ? accessibleRooms.push(lowestPrice) : nonAccessibleRooms.push(lowestPrice)
        } else {
          //none
        }

        if (possibleRoomsRefundable.length === 1) {
          const newRoom = possibleRoomsRefundable[0]
          newRoom.Rooms[0].RoomName.toLowerCase().includes('accessible') ? accessibleRooms.push(newRoom) : nonAccessibleRooms.push(newRoom)
        } else if (possibleRoomsRefundable.length > 1) {
          const lowestPrice = possibleRoomsRefundable.reduce((min, current) => {
                                return current.SimplePrice < min ? current.SimplePrice : min;
                              });
          lowestPrice.Rooms[0].RoomName.toLowerCase().includes('accessible') ? accessibleRooms.push(lowestPrice) : nonAccessibleRooms.push(lowestPrice)
        } else {
          //none
        }


      }

      // console.log('rooms')
      // console.log(nonAccessibleRooms)

      nonAccessibleRooms.sort(function(a, b) {
          return a.SimplePrice - b.SimplePrice
      });
      
      if (nonAccessibleRooms.length > 0) {
        const room = nonAccessibleRooms[0].Rooms[0]
        // let tax = room.Price?.OriginalTax || room.Price?.TaxesAndFees?.find(item => true)?.Value || 0
        const tax = ((parseFloat(hotel?.taxRate)*100) * room?.Price?.FinalPrice) / 100
      
        const markup = (room.Price.FinalPrice - tax) * .1

        lowest = nonAccessibleRooms[0].SimplePrice - tax + markup
      }

      accessibleRooms.sort(function(a, b) {
          return a.SimplePrice - b.SimplePrice
      });
  

      setRooms(nonAccessibleRooms);
      setAccessibleRooms(accessibleRooms);
      setRoomsDetails(data.getHotelDetails.RoomsContent);
      setSessionId(data.getHotelDetails.sessionId)
      setLowestRomingoRate(lowest / diffDays)

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

  const formatToTimeAgo = (beforeTimestamp) => {
    return moment(beforeTimestamp).fromNow()
  }


  if (loadingHotelInfo) {
    return <DetailsPageSkeleton />
  }

  if (!loadingHotelInfo && (errorHotelInfo || !hotelInfo.getHotelDetailById)) {
    // window.location.href = '/404'
    // return 
  }

  const hotel = hotelInfo.getHotelDetailById;
  const hotelDetailsFromPackage = hotel


  const getPetSizeLabel = (petSize) => {
    if(!petSize) return ''
    if(petSize === 'Any Size'){
      return ' of any size or weight. '
    }
    const split = petSize.split(' ');
    if(split.length === 2 && split[1] === 'lbs.'){
      return ' up to ' + petSize + ' per pet. ';
    }

    if(split.length === 2 && split[1] === 'lbs'){
      return ' up to ' + petSize + ' per pet. ';
    }

    if(petSize.includes('combined weight')){
      return petSize.substring(0, petSize.lastIndexOf(" ")) + '.'
    }
  }

  const getPetFee = (petFee) => {
    if(petFee === 'NONE'){
      return 'No pet fees are charged at this hotel. A fully refundable pet deposit may be requested or a signed waiver upon check-in.'
    } else {
      return `Please note that a pet fee of ${petFee} may be collected upon arrival or departure.`
    }
  }

  const getUnattendedPets = (unattendedPets) => {
    let response = `${unattendedPets}`;
    if(unattendedPets === 'Not applicable'){
      return ''
    } 
    if (!(response.charAt(response.length - 1) === '.')) { 
      response = response + '.' 
    }
    return response;
  }

  const getCatPolicy = (catPolicy) => {
    if(catPolicy === 'Yes' || catPolicy === 'Yes, please contact hotel for pre-approval'){
      return 'Cats are permitted, but please contact the hotel’s front desk in advance for approval.'
    } else {
      return `Cats are not permitted at ${hotelDetailsFromPackage.hotelName}.`
    }
  }

  const getPetAllowance = (petAllowance) => {
    if(petAllowance === 'Unlimited'){
      return ' any number of pets ' 
    }
    const split = hotelDetailsFromPackage.petAllowance.split(' ');
    if(parseInt(split[0]) > 1) {
      return `${split[0]} pets per reservation`
    }

    if(parseInt(split[0]) === 1){
      return `${split[0]} pet per reservation`
    }

    if(petAllowance.includes('combined weight')){
      return 'pets with '
    }
  }

  return (<>
    <Helmet>
      <title>{hotel?.hotelName} | Romingo</title>
      <description>{hotel?.description}</description>
      <meta property="og:title" content={`${hotel?.hotelName} | Romingo`} />
      <meta property="og:description" content={hotel?.description} />
      {/*      <meta property="og:url" content={`https://www.romingo.com/hotel/${hotelAlias}`} />*/}      
      <meta property="og:type" content="website" />
      <meta property="og:image" content={hotel?.images?.find(item => true)} />
      <meta property="og:site_name" content="Romingo" />
      <meta name="twitter:title" content={`${hotel?.hotelName} | Romingo`} />
      <meta name="twitter:description" content={hotel?.description} />
      <meta name="twitter:image" content={hotel?.images?.find(item => true)} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
    <Box sx={{ background: "#feffff", scrollBehavior: "smooth" }}>
      <ScrollToTop />
      <Navbar />
      <Grid container direction='row' spacing={2} sx={{ maxWidth: mobile ? '95%' : 1200, margin: 'auto', position: 'relative', maxHeight: '500px',objectFit: 'contain' }} >
        <Grid item xs={12} md={6} style={{ padding: mobile ? 0 : '10px', height: mobile ? '320px' : '500px' }}>
          <Box
            component="img"
            src={hotel?.images?.find(item => true)}
            // alt={name}
            boxShadow={1}
            onClick={handleOpen}
            className={classes.mainBox}
          />
        </Grid>
        <Grid item xs={12} sm={6} display={{ xs: 'none', sm: 'block' }}>
          {<Grid container spacing={2}>
            {
              hotel?.images?.slice(1, 5).map((img: any) => {
                return (
                  <Grid item sm={6} key={img} style={{ padding: mobile ? 0 : '10px', height: '250px' }}>
                    <Box
                      onClick={handleOpen}
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
            right: { xs: "5px", md: "20px" },
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

      <Grid container direction="row" sx={{ maxWidth: 1200, margin: 'auto', position: 'relative', marginTop: '20px' }}>
        <Grid item xs={12} md={6} sx={{ paddingLeft: '16px' }}>
          <Typography variant="h6">{hotel?.hotelName}</Typography>
          <Typography variant="base" color="gray" sx={{ fontSize: '14px' }}>{hotel.fullAddressLine}</Typography>
        </Grid>
        <Grid item xs={12} md={6} 
          sx={{ 
            pl: { xs: '12px', sm: '12px', md: 0, lg: 0 },
            pr: { xs: 0, sm: 0, md: '1rem', lg: '1rem' }, 
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'center', 
            gap: '0.25rem' 
          }}
        >
          <RomingoScore score={hotel?.starRating} />
          <Circle
            sx={{
              fontWeight: 500,
              mx: 0.5,
              opacity: 0.75,
              color: "#BC4749",
              fontSize: "20%",
            }} />
          <Link
            href="#reviews"
            onClick={() => reviewsRef?.current?.scrollIntoView()}
            sx={{
              cursor: "pointer",
              color: "#666",
              textDecoration: "underline",
              fontWeight: 500,
              opacity: 0.75,
              fontSize: "70%",
              mr: "6rem"
            }}
          >
            <u>{hotel?.numberOfReviews} reviews</u>
          </Link>
          <Button
            onClick={() => rateRef?.current?.scrollIntoView({ behavior: 'smooth'})}
            disableElevation
            variant="contained"
            sx={{
              fontWeight: 600,
              mt: "1rem",
              width: '320px',
              display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' }
            }}
          >
            RESERVE A ROOM
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          sx={{ paddingLeft: "16px", marginBottom: "1rem" }}
        >
          <HotelTags 
            pet_fee={hotel.petFee}
            pet_fee_value={hotel.petFeeValue}
            pet_allowance={hotel.petAllowance}
            pet_size={hotel.petSize}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={10}
          sx={{ paddingLeft: "16px", paddingRight: '16px', marginBottom: "1rem" }}
        >{ hotelDetailsFromPackage && 
          <Typography variant="base">
            {`${hotelDetailsFromPackage.hotelName} offers pet-friendly accommodations in ${hotelDetailsFromPackage.city}, ${hotelDetailsFromPackage.state}. The pet policy at ${hotelDetailsFromPackage.hotelName} welcomes ${getPetAllowance(hotelDetailsFromPackage.petAllowance)} ${getPetSizeLabel(hotelDetailsFromPackage.petSize)}  ${getPetFee(hotelDetailsFromPackage.petFee)} ${getUnattendedPets(hotelDetailsFromPackage.unattendedPets)} ${getUnattendedPets(hotelDetailsFromPackage.petReliefArea)} ${getCatPolicy(hotelDetailsFromPackage.catPolicy)}`}
          </Typography>
        }
          <Button
            onClick={() => rateRef?.current?.scrollIntoView({ behavior: 'smooth'})}
            disableElevation
            variant="contained"
            sx={{
              fontWeight: 600,
              mt: "1rem",
              width: '100%',
              display: { xs: 'block', sm: 'block', md: 'block', lg: 'none' }
            }}
          >
            RESERVE A ROOM
          </Button>

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
            {/*     <p>TODO: See all</p>*/}
          </Box>
          <Grid container direction='row' spacing={0}>
            {hotel.amenities.map(item => {
              if (validCodes.includes(item.code)) {
                return (
                  <Grid item xs={6} key={item.code} my="0.25rem">
                    <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center'}}><Icon code={item.code} /> {item.name}</Box>
                  </Grid>
                ) 
              }
            })}
          </Grid>
          <Box my="2rem">
            <Divider />
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={10}
          sx={{ paddingLeft: "16px", paddingRight: '16px', marginBottom: "1rem" }}
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
              clickable={false}
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
          sx={{ paddingLeft: "16px", paddingRight: '16px', marginBottom: "1rem" }}
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
          {(!taLoading && rooms.length > 0 && lowestRomingoRate && priceCheck?.tripHotelList?.data?.results.find(Boolean)?.offers?.find(Boolean)?.displayPrice) && <>
          <Typography variant="h6">Compare Rates</Typography>
          <Typography variant="base">Book with Romingo.com to get the best rates at pet-friendly hotels. Romingo guests pay $0 booking fees and are guaranteed to reserve a pet-friendly room.</Typography>
          <Box mt="1.5rem" mr="1rem" display="flex" gap="2rem" sx={{ flexDirection: { xs: 'column', sm: 'column', md: 'row'}  }}>
            <Box position="relative" py="1.5rem" px="4rem" textAlign="center" border="solid 1px black">
              <div style={{ marginBottom: '0.5rem'}}><img style={{width: '206px'}} src="https://storage.googleapis.com/romingo-development-public/images/front-end/Romingo_Logo_Black.svg" /></div>
              <Typography variant="p" py="2rem"><b>${Math.abs(lowestRomingoRate).toFixed(0)}</b> / night</Typography>
           {/*   <Box position="absolute" bottom="-12px" left="50%" style={{ transform: 'translate(-49%, 0%)' }} backgroundColor="white">
                <Typography variant="base">$0 pet fee</Typography>
              </Box>*/}
            </Box>
            <a style={{ textDecoration: 'none', color: 'black'}} href={priceCheck?.tripHotelList?.data?.results.find(Boolean)?.offers?.find(Boolean)?.clickUrl} target="_blank" rel="noreferrer">
              <Box position="relative" py="2rem" px="3rem" textAlign="center" border="solid 1px black">
                <div style={{ marginBottom: '0.5rem'}}><img style={{width: '240px'}} src="https://tripadvisor.mediaroom.com/images/Tripadvisor_Logo_circle-green_horizontal-lockup_registered_RGB.svg" /></div>
                <Typography variant="p" py="2rem"><b>{priceCheck?.tripHotelList?.data?.results.find(Boolean)?.offers?.find(Boolean)?.displayPrice}</b> / night</Typography>
               {/* <Box position="absolute" bottom="-12px" left="50%" style={{ transform: 'translate(-49%, 0%)' }} backgroundColor="white">
                  <Typography variant="base">{hotelInfo?.getHotelDetailById?.petFeeValue} pet fee</Typography>
                </Box>*/}
              </Box>
            </a>
          </Box>    
          </>}

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
              ref={rateRef}
              variant="h6"
            >
              Choose your room
            </Typography>
            <Box ml="0.15rem">
              <RoomsFilterBar refetch={refetch} />
            </Box>
          </Grid>
          {loading ? <Box mx="auto"><Loader size="220px" /></Box> : 
           rooms.length > 0 ?
            <Grid container>
              {rooms.sort((a,b) => a.PackagePrice?.FinalPrice - b.PackagePrice?.FinalPrice).map((room: any, key: number) => {
                const filterroom = roomsDetails.filter(d => d.RoomKey === room.Rooms[0].TargetRoomKey)[0];
                const images = filterroom ? filterroom.Images : [];
                const amenities = filterroom ? filterroom.Amenities : [];

                // console.log(room)
                // let tax = 0// (room.PackagePrice?.OriginalTax || room.PackagePrice?.TaxesAndFees?.find(item => item.FeeTitle === 'occupancy_tax')?.Value || 0)
                const tax = ((parseFloat(hotel?.taxRate)*100) * room?.PackagePrice?.FinalPrice) / 100
                  // console.log(beforePrice)
                  // tax = room?.PackagePrice?.FinalPrice - beforePrice
                  // console.log(tax)
                // }
                // console.log(tax)
                const markup = (room.PackagePrice.FinalPrice - tax) * .1


                return (
                  <Grid item   
                    md={4}
                    lg={4}
                    sm={6}
                    xs={12}
                    key={key}
                    sx={{ p: '1rem' }}
                  >
                    <RoomCard 
                      hasCombinedRate={room.combinedRate}
                      altFinalPrice={room.refundablePrice}
                      normalFinalPrice={room?.PackagePrice?.FinalPrice}
                      key={key} 
                      featuredImageURL={images?.find(item => true)} 
                      roomTitle={room.Rooms[0].RoomName}
                      pricePerNight={(((room.PackagePrice.FinalPrice - tax) + markup) / moment(search.checkOut).diff(moment(search.checkIn), 'days')).toFixed(0)}
                      totalPriceAfterTax={(room?.PackagePrice?.FinalPrice + markup).toFixed(2)}
                      totalPrice={(room?.PackagePrice?.FinalPrice - tax + markup).toFixed(2)}
                      nights={moment(search.checkOut).diff(moment(search.checkIn), 'days')}
                      imageURLs={images}
                      isRefundable={room.Refundability === 2 ? false: true}
                      room={room} 
                      refundableRoom={room.refundableRoom}
                      markup={markup}
                      hotel={hotel}
                      amenities={amenities}
                      sessionId={sessionId}
                      sx={{
                        minWidth: "260px",
                        borderRadius: "8px",
                        p: " 0rem 1rem 1rem 1rem",
                        border: "1px solid #ddd",
                        transition: "all .15s ease-in-out",
                        boxShadow: 1,
                        "&:hover": { boxShadow: 3 },
                      }}
                    />
                  </Grid>
                );
              })}
            </Grid>
            : <Typography sx={{ mx: 'auto', textAlign: 'center' }}>No rooms found in this date range.</Typography>
          }
          {(accessibleRooms.length > 0 && !loading) &&
            <Box width="100%">
              <Divider variant="middle" light sx={{ mt: 6, mb: 2 }}>
                <Typography variant="h6">Accessible Rooms</Typography>
              </Divider>
              <Grid container>
              {accessibleRooms.sort((a,b) => a.PackagePrice?.FinalPrice - b.PackagePrice?.FinalPrice).map((room: any, key: number) => {
                const filterroom = roomsDetails.filter(d => d.RoomKey === room.Rooms[0].TargetRoomKey)[0];
                const images = filterroom ? filterroom.Images : [];
                const amenities = filterroom ? filterroom.Amenities : [];

                // let tax = 0//(room.PackagePrice?.OriginalTax || room.PackagePrice?.TaxesAndFees?.find(item => item.FeeTitle === 'occupancy_tax')?.Value || 0)
                // if (tax === 0) {
                const tax = ((parseFloat(hotel?.taxRate)*100) * room?.PackagePrice?.FinalPrice) / 100
                  // console.log(beforePrice)
                  // tax = room?.PackagePrice?.FinalPrice - beforePrice
                  // console.log(tax)
                // }
                const markup = (room.PackagePrice.FinalPrice - tax) * .1

  
                return (<Grid item   
                    md={4}
                    lg={4}
                    sm={6}
                    xs={12}
                    key={key}
                    sx={{ p: '1rem' }}
                  >
                  <RoomCard 
                    key={key} 
                    hasCombinedRate={room.combinedRate}
                    altFinalPrice={room.refundablePrice}
                    normalFinalPrice={room?.PackagePrice?.FinalPrice}
                    featuredImageURL={images?.find(item => true)} 
                    roomTitle={room.Rooms[0].RoomName}
                    pricePerNight={(((room.PackagePrice.FinalPrice - tax) + markup) / moment(search.checkOut).diff(moment(search.checkIn), 'days')).toFixed(0)}
                    nights={moment(search.checkOut).diff(moment(search.checkIn), 'days')}
                    totalPriceAfterTax={(room?.PackagePrice?.FinalPrice + markup).toFixed(2)}
                    totalPrice={(room?.PackagePrice?.FinalPrice - tax + markup).toFixed(2)}
                    imageURLs={images}
                    isRefundable={room.Refundability === 2 ? false: true}
                    room={room} 
                    refundableRoom={room.refundableRoom}
                    markup={markup}
                    hotel={hotel}
                    amenities={amenities}
                    sessionId={sessionId}
                    sx={{
                      minWidth: "260px",
                      borderRadius: "8px",
                      p: " 0rem 1rem 1rem 1rem",
                      m: "0.5rem",
                      border: "1px solid #ddd",
                      transition: "all .15s ease-in-out",
                      boxShadow: 1,
                      "&:hover": { boxShadow: 3 },
                    }}
                  />
                  </Grid>
                )   
              })}
              </Grid>
            </Box>
          }
        </Grid>

        {/* Review section */}
        <Grid
          item
          xs={12}
          md={12}
          sx={{ paddingLeft: "16px", paddingRight: '16px', my: "1rem" }}
        >

          <Typography ref={reviewsRef} id="reviews" variant="h6">What People Are Saying</Typography>
          <Typography variant="base" sx={{ color: 'grey' }}>(Powered by Trip Advisor)</Typography>
          {!taReviewsLoading ? 
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '4rem', flexWrap: 'wrap', mt: '1.5rem'}}>
              {reviews?.tripReviews.map(review => (
                <Box key={review.name} maxWidth="540px">
                  <Box sx={{ display: 'flex', gap: '1rem', flexDirection: 'row', alignItems: 'center'}}>
                    <img style={{ borderRadius: '100%', width: '60px', height: '60px' }} src={review.pic} />
                    <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                      <Typography variant="base">{review.name}</Typography>
                      <Typography variant="base">{formatToTimeAgo(review.date)}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: '0.5rem', flexDirection: 'row', alignItems: 'center', my: '1rem'}}>
                    <StarIcon sx={{ color: "red" }} /> 
                    <Typography variant="base">{review.rating}/5</Typography>
                  </Box>
                  <Typography variant="base" maxWidth="480px">{review.description}</Typography>
                </Box>
              ))}
            </Box>
            : <Loader size="220px" />
          }
          {(!taReviewsLoading && !reviews) && 'No reviews found.'}
        </Grid>

      </Grid>

      <SimpleReactLightbox>
        <Dialog
          open={showGallery}
          keepMounted
          fullScreen
          onClose={handleClose}
          onClick={handleClose}
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
                  <ImageListItem key={item} onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation();

                    if (!mobile) {
                      setShowFullImage(item)
                      setImageIndex(index)
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
          <Dialog maxWidth="xl" sx={{ p: '2rem'  }} open={true} onClick={() => setShowFullImage('')}>
            <img src={showFullImage}  style={{ maxHeight: '80vh', objectFit: 'contain' }} />
          </Dialog>
        }

        {/* <SRLWrapper options={lightBoxOptions} /> */}

      </SimpleReactLightbox>
    </Box>
  </>)
}

export default withStyles(styles)(DetailsPage1);
