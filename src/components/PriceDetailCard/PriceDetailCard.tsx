import React, { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { CSSObject } from "@mui/material";
import Typography from "@mui/material/Typography";

interface Props {
  sx?: CSSObject;
}

const PriceDetailCard: FC<Props> = ({ sx }) => {
  const detail = useSelector(
    (state: any) => state.hotelCheckoutReducer.checkout
  );
  const [priceArr, setPriceArr] = useState<
    {
      label: string;
      price: number;
    }[]
  >([]);
  const [feesIncluded, setFeesIncluded] = useState("");

  useEffect(() => {
    const tmp = [];

    if (detail?.room?.room?.feesIncluded) {
      setFeesIncluded("*Includes all taxes and fees");
    } else {
      setFeesIncluded(
        "*Some mandatory fees (ex. resort fee or amenity fee) are due at the property. Contact the hotel for more details."
      );
    }

    tmp.push({
      label: "Average Price Per Night",
      price: detail?.room?.room?.averagePrice,
    });

    tmp.push({
      label: "Taxes & Fees",
      price:
        detail?.room?.room?.totalPriceAfterTax - detail?.room?.room?.totalPrice,
    });

    tmp.push({
      label: "Total Due Now",
      price: detail?.room?.room?.totalPriceAfterTax,
    });

    setPriceArr([...tmp]);
  }, [detail]);

  const detailsLen = priceArr.length;
  console.log(detail);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        color: "text.primary",
        borderRadius: 3,
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
      {priceArr.map((detail, i) => {
        if (i === detailsLen - 1) {
          return (
            <Box
              key={i}
              sx={{
                borderTop: "1px solid #DDD",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                mt: 1.5,
                pt: 1.5,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  mt: 0,
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  color: "text.primary",
                  textIndent: "-8px",
                  paddingLeft: "8px",
                  maxWidth: "70%",
                }}
              >
                {detail.label}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  mt: 0,
                  color: "text.primary",
                  textIndent: "-8px",
                  paddingLeft: "8px",
                }}
              >
                {`$${detail.price?.toFixed(2)}`}
              </Typography>
            </Box>
          );
        } else {
          return (
            <Box
              key={i}
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
                {`$${detail.price?.toFixed(2)}`}
              </Typography>
            </Box>
          );
        }
      })}
      <Typography variant="caption" sx={{ lineHeight: 1 }}>
        {feesIncluded}
      </Typography>
    </Box>
  );
};

export default PriceDetailCard;
