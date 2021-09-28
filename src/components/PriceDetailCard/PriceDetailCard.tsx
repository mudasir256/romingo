import React, { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { CSSObject } from "@mui/material";
import Typography from "@mui/material/Typography";

interface Props {
  sx?: CSSObject;
}

const PriceDetailCard: FC<Props> = ({ sx }) => {

  const detail = useSelector((state: any) => state.hotelCheckoutReducer.checkout);

  const [priceArr, setPriceArr] = useState<{
    label: string;
    price: number
  }[]>([]);

  useEffect(() => {
    console.log(detail);

    const tmp = [];

    tmp.push({
      label: "Average Price Per Night",
      price: detail?.room.room.averagePrice
    });

    tmp.push({
      label: "Average Price After Tax",
      price: detail?.room.room.averagePriceAfterTax
    });

    // if (detail?.room.room.feesIncluded)
    //   tmp.push({
    //     label: 
    //   })
    tmp.push({
      label: "Total Price",
      price: detail?.room.room.totalPrice
    });

    tmp.push({
      label: "Total Price After Tax",
      price: detail?.room.room.totalPriceAfterTax
    })

    setPriceArr([...tmp]);
  }, [detail])

  const detailsLen = priceArr.length;

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
    </Box>
  );
};

export default PriceDetailCard;
