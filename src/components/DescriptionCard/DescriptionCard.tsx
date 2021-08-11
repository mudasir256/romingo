import { FC } from "react";
import { CSSObject } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

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
          borderRadius: 1,
          border: "1px solid #DDD",
          pt: 2,
          pb: 2.5,
          px: 2,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: "secondary.main",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: { xs: "85%", sm: "100%" },
            textTransform: "capitalize"
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mt: 0.5
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default DescriptionCard;
