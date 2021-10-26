import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FC } from "react";
import RomingoScore from "../RomingoScore/RomingoScore";

interface Props {
  image: string;
  name: string;
  location: string;
  score: number;
  price: number;
  currency?: string;
  amenities?: string[];
  showAmenities?: boolean;
}

const ListingCardMap: FC<Props> = ({
  image,
  name,
  location,
  score,
  price,
  currency = "$",
}) => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        color: "text.primary",
        display: "flex",
        borderRadius: 3,
        boxShadow: 4,
        width: "95vw",
        maxWidth: "400px",
      }}
    >
      <Box
        component="img"
        src={image}
        alt={name}
        sx={{
          objectFit: "cover",
          width: 100,
          height: 85,
          borderTopLeftRadius: 12,
          borderBottomLeftRadius: 12,
          boxShadow: 0,
        }}
      />
      <Box sx={{ py: 1, px: 1, flex: 1, minWidth: "200px" }}>
        <Box>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              fontSize: "85%",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "75%",
              mt: 0,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {location}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              minWidth: "0px",
              mt: 0.5,
            }}
          >
            <RomingoScore score={score} sm />
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                textAlign: "right",
                justifyContent: "end",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mr: 0.25,
                  letterSpacing: 1,
                  color: "text.secondary",
                  fontSize: "115%",
                }}
              >
                {currency}
                {Math.round(price)}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "70%" }}>
                / night
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ListingCardMap;
