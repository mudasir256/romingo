import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
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
        width: "350px",
        maxWidth: "350px",
      }}
    >
      <Box
        component="img"
        src={image}
        alt={name}
        sx={{
          objectFit: "cover",
          width: 75,
          minHeight: "100%",
          borderTopLeftRadius: 12,
          borderBottomLeftRadius: 12,
          boxShadow: 0,
        }}
      />
      <Box sx={{ py: 0.7, px: 1, flex: 1, minWidth: "200px" }}>
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
              minWidth: 0,
              mt: 0.5,
            }}
          >
            <RomingoScore score={score} sm />
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                textAlign: "right",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mr: 0.25,
                  letterSpacing: 1,
                  color: "text.secondary",
                  fontSize: "95%",
                }}
              >
                {currency}
                {price}
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
