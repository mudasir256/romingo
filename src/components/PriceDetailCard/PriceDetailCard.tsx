import React, { FC } from "react";
import Box from "@material-ui/core/Box";
import { CSSObject } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

interface Props {
  sx?: CSSObject;
  details: [
    {
      label: string;
      amount: number;
    }
  ];
}

const PriceDetailCard: FC<Props> = ({ sx, details }) => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        color: "text.primary",
        borderRadius: 3,
        boxShadow: 4,
        py: 2,
        px: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "secondary.main",
          textAlign: "center",
          mb: 1,
        }}
      >
        Price Details
      </Typography>
      {details.map((detail) => {
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
            {detail.label}
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
            {`$${detail.amount.toFixed(2)}`}
          </Typography>
        </Box>;
      })}
    </Box>
  );
};

export default PriceDetailCard;
