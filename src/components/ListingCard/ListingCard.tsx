import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Check from "@mui/icons-material/Check";
import { FC } from "react";
import RomingoScore from "../RomingoScore/RomingoScore";
import Chip from "@mui/material/Chip";
import LocationCityIcon from '@mui/icons-material/LocationCity';

export interface ListingCardProps {
  featuredImageURL: string;
  name: string;
  addressLine1: string;
  romingoScore: number;
  cancellation?: boolean;
  lowestPrice: number;
  currency?: string;
  dogAmenities?: string[];
  showAmenities?: boolean;
  highlighted?: boolean;
  location: {
    latitude: number;
    longitude: number;
  },
  city: {
    id: string;
    name: string;
  },
  neighborhood: string;
}

const ListingCard: FC<ListingCardProps> = ({
  featuredImageURL,
  name,
  addressLine1,
  romingoScore,
  city,
  neighborhood,
  cancellation = false,
  lowestPrice,
  currency = "$",
  dogAmenities = [],
  showAmenities = true,
  highlighted = false,
  ...props
}) => {
  const mobileCardPadding = 1.8;
  return (
    <Box
      sx={{
        color: "text.primary",
        boxShadow: 0,
        display: "flex",
        borderRadius: 3,
        flexDirection: { xs: "column", sm: "row" },
        maxWidth: "100%",
        backgroundColor: highlighted ? "lightBackground.main" : "white",
      }}
      {...props}
    >
      <Box
        component="img"
        src={featuredImageURL}
        alt={name}
        draggable="false"
        sx={{
          objectFit: "cover",
          width: "100%",
          maxWidth: { sm: 280 },
          maxHeight: { xs: 180, sm: "100%" },
          minHeight: { xs: 180, sm: "100%" },
          borderRadius: 3,
          boxShadow: 0,
        }}
      />
      <Box
        sx={{
          pt: 1.8,
          px: { xs: mobileCardPadding, sm: 1.8 },
          pb: { xs: mobileCardPadding, sm: 1.8 },
          flex: 1,
          minWidth: 0,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "text.secondary",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </Typography>

        <Box>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "95%", sm: "100%" },
              mt: 0,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {addressLine1}, {city.name}
          </Typography>
          <Chip icon={<LocationCityIcon />} label={neighborhood} />
          <Box sx={{ mt: 3 }}>
            <RomingoScore score={romingoScore} />
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "row", minHeight: "28px" }}
          >
            {cancellation && (
              <Chip
                sx={{ mr: 1 }}
                color="info"
                label={
                  <Typography variant="body1">Free Cancellation</Typography>
                }
              />
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                minWidth: 0,
                overflow: "hidden",
              }}
            >
              {!!showAmenities && (
                <Stack
                  sx={{ mt: 3, mr: 0.5, minWidth: 0, overflow: "hidden" }}
                  spacing={0.5}
                >
                  {dogAmenities.slice(0, 2).map((amenity) => (
                    <Box
                      key={amenity}
                      sx={{
                        display: "flex",
                      }}
                    >
                      <Check
                        sx={{ fontSize: 15, color: "success.main", mt: 0.4 }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          pr: 0.15,
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {amenity}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              )}
            </Box>
            <Box
              sx={{
                alignItems: "center",
                display: { xs: "inline-block", lg: "flex" },
                textAlign: "right",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mr: { xs: 0, sm: 0.45 },
                  mb: 0,
                  letterSpacing: 1,
                  color: "text.secondary",
                }}
              >
                {currency}
                {Math.round(lowestPrice)}
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.25 }}>
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
