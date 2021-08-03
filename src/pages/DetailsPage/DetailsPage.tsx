import { FC } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Stack from "@material-ui/core/Stack";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import BookingCard from "../../components/BookingCard/BookingCard";

interface Props {
  name: string;
  address: string;
  mainImage: string;
  gallerySrc: [string];
}

const DetailsPage: FC<Props> = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box boxShadow={2} sx={{ width: "100%", pb: "76%" }}></Box>
        </Grid>
        <Hidden lgDown>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <Box boxShadow={2} sx={{ width: "100%", pb: "76%" }}></Box>
              </Grid>
              <Grid item md={6}>
                <Box boxShadow={2} sx={{ width: "100%", pb: "76%" }}></Box>
              </Grid>
              <Grid item md={6}>
                <Box boxShadow={2} sx={{ width: "100%", pb: "75%" }}></Box>
              </Grid>
              <Grid item md={6}>
                <Box boxShadow={2} sx={{ width: "100%", pb: "75%" }}></Box>
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
        <BookingCard />
      </Grid>
    </Box>
  );
};

export default DetailsPage;
