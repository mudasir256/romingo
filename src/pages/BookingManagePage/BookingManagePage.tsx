import Box from "@mui/material/Box";
import React, { FC, useState } from "react";
import Container from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { Occupant } from "../../components/OccupantSelector/OccupantSelector";
import Navbar from "../../components/Navbar";
import BookingManageCard from "../../components/BookingManageCard";

interface BookingManage {
  image: string;
  name: string;
  location: string;
  checkIn: string;
  checkOut: string;
  occupants: Occupant;
  roomType: string;
  confirmId: string;
  status: string;
}

interface Props {
  upcoming: BookingManage[];
  past: BookingManage[];
  cancelled: BookingManage[];
}

const BookingManagePage: FC<Props> = ({ upcoming, past, cancelled }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const a11yProps = (index: number) => {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  };

  const handleChange = (
    event: React.SyntheticEvent<Element>,
    newValue: number
  ) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          pt: {
            sm: "64px",
            xs: "56px",
          },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            py: 3,
          }}
        >
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Upcoming" {...a11yProps(0)} />
            <Tab label="Past" {...a11yProps(1)} />
            <Tab label="Cancelled" {...a11yProps(2)} />
          </Tabs>
          <Box
            role="tabpanel"
            hidden={selectedTab !== 0}
            id="simple-tabpanel-0"
            aria-labelledby={`simple-tab-0`}
            sx={{
              py: 3,
              px: 1,
            }}
          >
            {upcoming.map((item, key) => {
              return (
                <BookingManageCard
                  {...item}
                  key={key}
                  sx={{
                    mb: 3,
                  }}
                />
              );
            })}
          </Box>
          <Box
            role="tabpanel"
            hidden={selectedTab !== 1}
            id="simple-tabpanel-1"
            aria-labelledby={`simple-tab-1`}
            sx={{
              py: 3,
              px: 1,
            }}
          >
            {past.map((item, key) => {
              return (
                <BookingManageCard
                  {...item}
                  key={key}
                  sx={{
                    mb: 3,
                  }}
                />
              );
            })}
          </Box>
          <Box
            role="tabpanel"
            hidden={selectedTab !== 2}
            id="simple-tabpanel-2"
            aria-labelledby={`simple-tab-2`}
            sx={{
              py: 3,
              px: 1,
            }}
          >
            {cancelled.map((item, key) => {
              return (
                <BookingManageCard
                  {...item}
                  key={key}
                  sx={{
                    mb: 3,
                  }}
                />
              );
            })}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default BookingManagePage;
