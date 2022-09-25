import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import { GetReservationDetails } from '../constants/constants';
import { gql, useLazyQuery } from "@apollo/client";
import { useHistory } from 'react-router-dom';
import Navbar from "../components/Navbar";


const YourReservationPage: FC<Props> = () => {
  const history = useHistory();
  const { emailAddress, confirmationNumber } = history.location.state
  console.log(emailAddress)
  console.log(confirmationNumber)
  const [
    handleFindReservation,
    { called, loading, data }
  ] = useLazyQuery(gql`
    ${GetReservationDetails}
    `,
    {
      variables: {
        email: emailAddress,
        propertyConfirmationId: confirmationNumber
      },
    }
  );

  useState(() => {
    handleFindReservation()
  }, []) 


  console.log(data)

  const headerStyle = {
    fontSize: '1.5em', 
    fontFamily: "overpass-regular"
  }

  return(
    <Box>
      <Navbar />
      {loading ? <p>Loading...</p>
        :
        <Box sx={{ mx: 'auto', maxWidth: '600px' }}>
          {!data?.getReservationDetails?.length &&
            <Box sx={{ ml: '1em', mt: '3em' }}>
              <Typography sx={headerStyle}>We couldn&apos;t find a reservation for that email and confirmation number.</Typography>
              <Button sx={{ mt: '0.5em' }} variant="contained" onClick={() => history.replace('/reservation/manage')}>Back</Button>
            </Box>
          }
          {data?.getReservationDetails?.map((reservation, index) => (
            <Box key={index} sx={{ ml: '1em', mt: '3em' }}>
              {/* 
                TODO: upcoming should say current if current... if finished, past trip ... else upcoming. 
                the reservation status should be attached to the object.
              */}
              <Typography sx={headerStyle}>Details for your upcoming stay:</Typography>
              <Typography>
                ADD: hotel name here
                <br />
                ADD: address line 1 + city, state here
                <br />
                ADD: check in time in local MM/DD/YYYY h:mm
                <br />
                Add: check out time in local MM/DD/YYY h:mm
                <br />
                Add: Room type
                <br />
                Add: Occupants ...adult, children, dogs
                <br />
                Add: total price (with tax)
                <br />
                Add: cancellation policy (see trello) in local time
                <em>Modify</em> <em>Cancel</em> 
              </Typography>
            </Box>
          ))}
        </Box>
      }
    </Box>
  )
}

export default YourReservationPage;