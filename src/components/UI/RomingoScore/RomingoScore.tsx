import Typography from "@material-ui/core/Typography";
import Star from "@material-ui/icons/Star";
import Box from "@material-ui/core/Box";
import { FC } from "react";

interface Props {
  score: number;

  sm?: boolean;
}

const RomingoScore: FC<Props> = ({ score, sm = false }) => {
  return sm ? (
    <Box
      sx={{
        display: "flex",
        minWidth: 0,
      }}
    >
      <Star sx={{ color: "primary.main", mt: 0.4, fontSize: "85%" }} />
      <Typography
        variant="h6"
        sx={{
          color: "primary.main",
          flex: 1,
          fontSize: "85%",
        }}
      >
        {score}
      </Typography>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        minWidth: 0,
      }}
    >
      <Star sx={{ color: "primary.main", mt: 0.4 }} />
      <Typography
        variant="h6"
        sx={{
          color: "primary.main",
        }}
      >
        {score}
      </Typography>
      <Typography variant="body1" sx={{ ml: 0.75, mt: "5px" }}>
        Romingo Score
      </Typography>
    </Box>
  );
};

export default RomingoScore;
