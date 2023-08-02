import { FC } from "react";
import Star from "@mui/icons-material/Star";
import { Box, Typography, Grid } from "@mui/material";

interface Props {
  score: number;
  sm?: boolean;
  left?: boolean;
}

const RomingoScore: FC<Props> = ({ score, sm = false, left = false }) => {
  return sm ? (
    <Box sx={{ display: "flex", minWidth: 0, alignItems: "center" }}>
      <Star sx={{ color: "#BC4749", fontSize: "90%", mt: -0.3 }} />
      <Typography variant="h6" sx={{ color: "#666", fontSize: "90%" }}>
        {score}
      </Typography>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        minWidth: 0,
        alignItems: "center",
        ml: { sm: left ? "0px" : "auto", xs: "0px" },
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{ textAlign: { sm: "right", xs: "left", mb: 0 } }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "90%",
              color: "#666666",
              mr: { sm: "0rem", xs: "auto" },
              ml: { sm: "auto", xs: "0px" },
            }}
          >
            <Star
              sx={{
                color: "#BC4749",
                fontSize: "110%",
                ml: 0.1,
                mb: -0.4,
                mr: ".25rem",
              }}
            />
            {score}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RomingoScore;
