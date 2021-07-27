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
}

const ListingCard: FC<Props> = ({
  image,
  name,
  location,
  score,
  price,
  currency = "$",
  amenities = [],
}) => {
  return (
    <Box sx={{ display: "flex", borderRadius: 3, boxShadow: 1 }}>
      <Box
        component="img"
        src={image}
        alt={name}
        sx={{ width: 250, height: 200, borderRadius: 3 }}
      />
      <Box sx={{ p: 2, flex: 1 }}>
        <Typography
          variant="h6"
          sx={{ color: "primary.main", textDecoration: "underline" }}
        >
          {name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Box>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {location}
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Typography variant="h6" sx={{ fontStyle: "italic" }}>
                {score}
              </Typography>
              <Typography variant="body1" sx={{ ml: 1, mt: "5px" }}>
                Romingo Score
              </Typography>
            </Box>
            <Stack sx={{ mt: 2 }} spacing={1}>
              {amenities.map((amenity) => (
                <Box key={amenity} sx={{ display: "flex" }}>
                  <Check fontSize="small" />
                  <Typography
                    variant="body2"
                    sx={{ fontStyle: "italic", ml: 0.5, mt: 0.25 }}
                  >
                    {amenity}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6">
              {currency}
              {price}
            </Typography>
            <Typography variant="body1" sx={{ ml: 1 }}>
              / night
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ListingCard;
