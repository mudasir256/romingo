import React, { FC } from "react";
import Box from "@material-ui/core/Box";
import { CSSObject } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

interface Props {
  sx?: CSSObject;
  details: {
    price: number;
    stateTax: number;
    cityTax: number;
    total: number;
  };
}

const PriceDetailCard: FC<Props> = ({ sx, details }) => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        color: "text.primary",
        borderRadius: 1,
        boxShadow: 4,
        py: 2,
        px: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "primary.main",
          textAlign: "center",
          mb: 1,
        }}
      >
        Price Details
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          mt: 1,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            mt: 0,
            textTransform: "capitalize",
            color: "text.primary",
            textIndent: "-8px",
            paddingLeft: "8px",
            maxWidth: "70%",
          }}
        >
          King Suite
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            mt: 0,
            color: "text.primary",
            textIndent: "-8px",
            paddingLeft: "8px",
          }}
        >
          {`$${details.price.toFixed(2)}`}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          mt: 1,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            mt: 0,
            textTransform: "capitalize",
            color: "text.primary",
            textIndent: "-8px",
            paddingLeft: "8px",
            maxWidth: "70%",
          }}
        >
          6% State Tax
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            mt: 0,
            color: "text.primary",
            textIndent: "-8px",
            paddingLeft: "8px",
          }}
        >
          {`$${details.stateTax.toFixed(2)}`}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          mt: 1,
          pb: 1,
          borderBottom: "1px solid #DDD",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            mt: 0,
            textTransform: "capitalize",
            color: "text.primary",
            textIndent: "-8px",
            paddingLeft: "8px",
            maxWidth: "70%",
          }}
        >
          6% City Tax
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            mt: 0,
            color: "text.primary",
            textIndent: "-8px",
            paddingLeft: "8px",
          }}
        >
          {`$${details.cityTax.toFixed(2)}`}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          mt: 1,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            mt: 0,
            textTransform: "capitalize",
            color: "text.primary",
            textIndent: "-8px",
            paddingLeft: "8px",
            maxWidth: "70%",
          }}
        >
          Total
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            mt: 0,
            color: "text.primary",
            textIndent: "-8px",
            paddingLeft: "8px",
          }}
        >
          {`$${details.total.toFixed(2)}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default PriceDetailCard;
