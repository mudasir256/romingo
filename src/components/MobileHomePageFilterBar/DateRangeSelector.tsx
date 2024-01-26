import { FC } from 'react';

import {
  IconButton,
  Button,
  Box,
  Typography,
  Grid,
  Dialog,
  AppBar,
  Toolbar,
} from "@mui/material";
import InfiniteCalendar from 'react-infinite-calendar';

import {
  Event,
} from "@mui/icons-material";

import { DateTime } from "luxon";

import '../../mobileCalendar.css';
import FullPageDialog from './FullPageDialog';

interface DateRangeSelectorProps {
    showMobileCalendar: boolean;
    setShowMobileCalendar: (arg0: boolean) => void;
    calendarRef: any;
    CalendarWithRange: any;
    setCheckDate: (arg0: Array<any>) => void;
    checkDate: Array<Date>;
  }

const DateRangeSelector: FC<DateRangeSelectorProps> = ({
    showMobileCalendar,
    setShowMobileCalendar,
    calendarRef,
    CalendarWithRange,
    setCheckDate,
    checkDate
}) => {
    return (
        <>
            <FullPageDialog
              isOpen={showMobileCalendar}
              close={() => setShowMobileCalendar(false)}
              onDone={() => {
                const { start, end } = calendarRef.current.state.selected
                setCheckDate([start, end])
                setShowMobileCalendar(false)
              }} 
            >
              <Box sx={{
                zIndex: 100,
                width: '100%',
                height: '90vh',
                position: 'fixed',
                backgroundColor: 'white',
                gap: '1rem',
                left: '0', top: '50px', mt: '0rem'
              }}
              >
                <InfiniteCalendar
                  ref={calendarRef}
                  Component={CalendarWithRange}
                  width="100%"
                  displayOptions={{
                    showHeader: true,
                    showWeekdays: false,
                  }}
                  minDate={new Date()}
                  selected={{
                    start: checkDate[0],
                    end: checkDate[1],
                  }}
                  locale={{
                    headerFormat: 'MMM Do',
                  }}
           
                  theme={{
                    headerColor: 'white',
                    floatingNav: {
                      background: '#f0f0f0',
                      chevron: 'transparent',
                      color: 'black',
                    },
                    accentColor: '#03989E',
                    selectionColor: '#03989E',
                    weekdayColor: '#03989E',
                  }}
                />
              </Box>
            </FullPageDialog>

            <Grid
              container
              sx={{
                width: "100%",
              }}
            >
              <Grid onClick={() => setShowMobileCalendar(true)} item xs={6} sx={{  width: '100%', minWidth: '100%' }}>
                <Grid
                  sx={{
                    border: "1px solid #aaabab",
                    borderRadius: "6px",
                    padding: ".25rem .25rem .25rem 1rem",
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'row',
                    height: '45px',
                    alignItems: 'center',
                    width: '100%',
                    margin: 'auto',
                  }}
                >
                  <Grid
                    item
                    sx={{
                      pl: '0.1em',
                      pr: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Event sx={{ height: "24px" }} />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="base">
                      {checkDate[0]
                        ? DateTime.fromJSDate(
                          new Date(checkDate[0])
                        ).toFormat("MMM dd")
                        : "Check-in date"}
                      &nbsp;&#8212;&nbsp;
                      {checkDate[1]
                        ? DateTime.fromJSDate(
                          new Date(checkDate[1])
                        ).toFormat("MMM dd")
                        : "Check-out date"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
        </>
    )
}

export default DateRangeSelector