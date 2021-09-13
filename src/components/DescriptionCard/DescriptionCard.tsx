import { FC } from "react";
import { CSSObject } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface Props {
  sx?: CSSObject;
  title: string;
  description: string;
}

const DescriptionCard: FC<Props> = ({ sx, title, description }) => {
  return (
    <Box sx={sx}>
      <Box
        sx={{
          backgroundColor: "white",
          color: "text.primary",
          borderRadius: 3,
          border: "1px solid #DDD",
          pt: 2,
          pb: 2.5,
          px: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "secondary.main",
            textAlign: "center",
            textTransform: "capitalize",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: 0.5,
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default DescriptionCard;
