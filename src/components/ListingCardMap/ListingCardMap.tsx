import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Star from "@material-ui/icons/Star";
import { FC } from "react";

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
        borderRadius: 0,
        boxShadow: 4,
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
          borderRadius: 0,
          boxShadow: 0,
        }}
      />
      <Box sx={{ py: 0.7, px: 1, flex: 1, minWidth: 0 }}>
        <Box>
          <Typography
            variant="h6"
            sx={{
              color: "primary.main",
              fontWeight: "bold",
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
              fontSize: "80%",
              fontWeight: "light",
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
                  fontWeight: "bold",
                  color: "text.secondary",
                  fontSize: "85%",
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
