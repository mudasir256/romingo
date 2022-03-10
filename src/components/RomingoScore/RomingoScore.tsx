import { FC } from "react";
import Star from "@mui/icons-material/Star";
import { Box, Typography, Grid } from "@mui/material";

interface Props {
  score: number;
  sm?: boolean;
}

const RomingoScore: FC<Props> = ({ score, sm = false }) => {
  return sm ? (
    <Box sx={{ display: "flex", minWidth: 0, alignItems: "center" }}>
      <Typography variant="h6" sx={{ color: "primary.main", fontSize: "90%" }}>
        {score}
      </Typography>
      <Star sx={{ color: "primary.main", fontSize: "90%", mt: -0.3 }} />
    </Box>
  ) : (
    <Box
      onClick={(e) => e.stopPropagation()}
      sx={{
        display: "flex",
        minWidth: 0,
        alignItems: "center",
        mr: { sm: "0rem", xs: "auto" },
        ml: { sm: "auto", xs: "0px" },
      }}
    >
      <Grid container>
        <Grid item xs={12} sx={{ textAlign: { sm: "right", xs: "left" } }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: "100%",
              color: "primary.main",
              mr: { sm: "0rem", xs: "auto" },
              ml: { sm: "auto", xs: "0px" },
            }}
          >
            {score}
            <Star
              sx={{
                color: "primary.main",
                fontSize: "100%",
                ml: 0.1,
                mb: -0.1,
                mr: ".25rem",
              }}
            />
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RomingoScore;
