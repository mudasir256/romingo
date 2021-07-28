import Typography from "@material-ui/core/Typography";
import Stack from "@material-ui/core/Stack";
import Box from "@material-ui/core/Box";
import Check from "@material-ui/icons/Check";
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

const ListingCard: FC<Props> = ({
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
        color: "text.primary",
        display: "flex",
        borderRadius: 0,
        boxShadow: 4,
        maxWidth: "500px",
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
              minWidth: 0,
              mt: 0.25,
            }}
          >
            <Box
              sx={{
                display: "flex",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: "85%",
                  color: "secondary.dark",
                }}
              >
                {score}
              </Typography>
              <Typography variant="body1" sx={{ ml: 0.2, fontSize: "85%" }}>
                Romingo Score
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
                  mr: { xs: 0, sm: 0.45 },
                  letterSpacing: 1,
                  fontWeight: "bold",
                  color: "text.secondary",
                  fontSize: "85%",
                }}
              >
                {currency}
                {price}
              </Typography>
              <Typography
                variant="body2"
                sx={{ display: { xs: "none", sm: "inline-block" } }}
              >
                / night
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ListingCard;
