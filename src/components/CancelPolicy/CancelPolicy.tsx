import { FC } from "react";
import { CSSObject } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Check from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

interface Props {
  sx?: CSSObject;
}

const CancelPolicy: FC<Props> = ({ sx }) => {
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
          variant="h6"
          sx={{
            color: "secondary.main",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: { xs: "85%", sm: "100%" },
          }}
        >
          Cancellation & Refund Policy
        </Typography>
        <Box
          sx={{
            mt: 0.5,
            px: 0.5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "bottom",
              justifyContent: "start",
              mt: 1,
            }}
          >
            <Check
              sx={{
                fontSize: { xs: 15, sm: 18 },
                mr: 0.75,
                mt: 0.125,
                color: "primary.main",
              }}
            />
            <Typography
              variant="body1"
              sx={{
                mt: 0,
                color: "text.light",
                fontSize: { xs: "85%", sm: "100%" },
              }}
            >
              Cancel before 7/7/2021 for a full refund
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "bottom",
              justifyContent: "start",
              mt: 1,
            }}
          >
            <CloseIcon
              sx={{
                fontSize: { xs: 15, sm: 18 },
                mr: 0.75,
                mt: 0.125,
                color: "primary.main",
              }}
            />

            <Typography
              variant="body1"
              sx={{
                mt: 0,
                color: "text.light",
                fontSize: { xs: "85%", sm: "100%" },
              }}
            >
              Cancelations after 7/7/2021 are non-refundable
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CancelPolicy;
