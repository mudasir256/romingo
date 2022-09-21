import { Box, Grid, Stack, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import React, { FC } from 'react';
import styles from './ReservationDetails.module.css';
import { useState } from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import dayjs, { Dayjs } from 'dayjs';

interface ReservationDetailsProps {
  id: string,
  propertyId: string,
  paymentIntentId: string,
  cardId: string,
  sabreConfirmationId: string,
  propertyConfirmationId: string,
  faunaDocId: string,
  firstName: string,
  lastName: string,
  email: string,
  mobileNumber: string,
  checkInAtLocal: string,
  checkOutAtLocal: string,
  deadlineLocal: string,
  data: any,
  hotel: any,
  cancellationFeePrice: any,
  captured: number
  intentType: string
  setupIntentObject: any
  customerId: string
}

const ReservationDetails: FC<ReservationDetailsProps> = ({
  id,
  propertyId,
  paymentIntentId,
  cardId,
  sabreConfirmationId,
  propertyConfirmationId,
  faunaDocId,
  firstName,
  lastName,
  email,
  mobileNumber,
  checkInAtLocal,
  checkOutAtLocal,
  deadlineLocal,
  data,
  hotel,
  cancellationFeePrice,
  captured,
  intentType,
  setupIntentObject,
  customerId,
}) => {
  const [defaultCheckInData, setDefaultCheckInData] = useState<Dayjs | null>(dayjs());
  const [defaultCheckOutData, setDefaultCheckOutData] = useState<Dayjs | null>(dayjs());
  const formatUnixLong = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }
  const formatUnix = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US')
  }

  const handleChangeDateCheckIn = (newValue: Dayjs | null) => {
    setDefaultCheckInData(newValue)
  }

  const handleChangeDateCheckOut = (newValue: Dayjs | null) => {
    setDefaultCheckOutData(newValue)
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      rowSpacing={2}
      alignItems="center"
    >
      <Grid
        item
        xs={12}
        sm={12}
      >
        <TextField
          id="confirmation-id"
          value={propertyConfirmationId}
          variant="standard"
          label="Confirmation ID"
          InputProps={{
            readOnly: true,
          }}
          fullWidth
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
      >
        <TextField
          id="first-name"
          label="First Name"
          value={firstName}
          variant="standard"
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
      >
        <TextField
          id="last-name"
          label="last Name"
          value={lastName}
          variant="standard"
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
      >
        <TextField
          id="user-mail"
          label="Email"
          value={email}
          variant="standard"
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
      >
        <TextField
          id="phone-number"
          label="Phone Number"
          value={mobileNumber}
          variant="standard"
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
      >
        <TextField
          id="can-cancel"
          label="Can Cancel"
          value={`${data.cancelationPolicy.cancelable ? 'Yes' : 'No'}`}
          variant="standard"
          inputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
      >
        <TextField
          id="total-price"
          label="Total Price"
          value={`$ ${data.totalPriceAfterTax}`}
          variant="standard"
          inputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
      >
        <TextField
          id="cancel-by-time"
          label="Cancel By Time"
          value={formatUnixLong(parseInt(deadlineLocal))}
          variant="standard"
          fullWidth
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
      >
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Stack direction="row" spacing={2}>
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/DD/YYYY"
              value={defaultCheckInData}
              onChange={handleChangeDateCheckIn}
              renderInput={(params) => <TextField {...params} variant="standard" />}
            />
          </Stack>
        </LocalizationProvider>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
      >
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Stack>
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/DD/YYYY"
              value={defaultCheckOutData}
              onChange={handleChangeDateCheckOut}
              renderInput={(params) => <TextField {...params} variant="standard" />}
            />
          </Stack>
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
}

export default ReservationDetails;
