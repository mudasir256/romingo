import React, { FC, useState, MouseEventHandler, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gql, useQuery } from "@apollo/client";
import { GetPropertyDetails, GetSabreRoomReservations } from "../constants/constants";
import { utils } from '../services/utils'

import {
  Grid,
  Box,
} from "@mui/material";

import Loader from '../components/UI/Loader';
import ViewPhotos from '../components/UI/ViewPhotos';

import RomingoScore from "../components/RomingoScore";
import Navbar from "../components/Navbar";
import HotelTags from '../components/HotelTags';


const DetailsPagev2: any = ({ ...props }) => {
  const hotelId = props?.match?.params?.id || "undefined";
  const hotelAlias = props?.match?.params?.alias || "undefined";
  const search = useSelector((state: any) => state.searchReducer.search);

  const [showGallery, setShowGallery] = useState(false);

  const { data, loading } = useQuery(
    gql`
      ${GetPropertyDetails}
    `,
    {
      variables: {
        alias: hotelAlias,
      },
    }
  );

  const { data: roomInformation } = useQuery(
    gql`
      ${GetSabreRoomReservations}
    `,
    {
      variables: {
        checkIn: search?.checkIn.substring(0, 10),
        checkOut: search?.checkOut.substring(0, 10),
        adults: search?.occupants?.adults,
        children: utils.formatChildren(search?.occupants),
        dogs: search.occupants.dogs,
        alias: hotelAlias,
      },
      fetchPolicy: "no-cache",
    }
  );

  console.log(roomInformation)

  const handleOpen: MouseEventHandler<Element> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowGallery(true);
  };

  const handleClose = () => {
    setShowGallery(false);
  };


  const hotelInfo = data?.getPropertyDetails
  console.log(hotelInfo)

  const HotelImages = () => (
    hotelInfo.imageURLs.slice(1, 5).map((img: any) => {
      return (
        <Grid item xs={12} sm={6} key={img} sx={{ pr: '1em'}}>
          <Box
            onClick={handleOpen}
            boxShadow={2}
            component="img"
            src={img.replace(/^http(s?):/i, "")}
            alt={name}
            sx={{
              width: "100%",
              height: "160px",
              objectFit: "cover",
              borderRadius: { xs: 0, sm: 1 },
              cursor: "pointer",
            }}
          />
        </Grid>
      )
    })
  )

  return (
    <>
    <Navbar />
    <Box sx={{ mt: '2em', px: { xs: 0, sm: '6em' } }}>
      {loading && <Loader size="300px" />}
      {hotelInfo?.imageURLs && 
        <Grid container sx={{ flexDirection: 'row'}} spacing={2}>
          <Grid item sm={6}>
            <Box
              component="img"
              src={hotelInfo?.featuredImageURL.replace(/^http(s?):/i, "")}
              alt={hotelInfo.name}
              boxShadow={2}
              onClick={handleOpen}
              sx={{
                background: "#fff",
                width: "100%",
                boxShadow: 0,
                borderBottom: "2px solid #ddd",
                height: '326px',
                objectFit: "cover",
                borderRadius: 1,
                mx: 0,
                cursor: "pointer",
              }}
            />
          </Grid>
          <Grid item container sx={{ flexDirection: 'row',  display: { xs: 'none', sm: 'flex' } }} sm={6}>
            <HotelImages />
          </Grid>
          <Box sx={{ display: 'absolute', right: 0, bottom: 0}}>
            <ViewPhotos onClick={handleOpen} />
          </Box>
        </Grid>
      }
     


    </Box>
    </>
  )
}

export default DetailsPagev2;
