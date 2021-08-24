import Typography from "@material-ui/core/Typography";
import Stack from "@material-ui/core/Stack";
import Box from "@material-ui/core/Box";
import Check from "@material-ui/icons/Check";
import Chip from "@material-ui/core/Chip";
import { FC } from "react";
import RomingoScore from "../RomingoScore/RomingoScore";

export interface ListingCardProps {
  image: string;
  name: string;
  location: string;
  score: number;
  cancellation?: boolean;
  price: number;
  currency?: string;
  amenities?: string[];
  showAmenities?: boolean;
  boxShadow?: number;
}

const ListingCard: FC<ListingCardProps> = ({
  image,
  name,
  location,
  score,
  cancellation = false,
  price,
  currency = "$",
  amenities = [],
  showAmenities = true,
  boxShadow = 4,
  ...props
}) => {
  let mobileCardPadding = 1.8;
  if (boxShadow === 0) {
    mobileCardPadding = 0;
  }
  return (
    <Box
      sx={{
        color: "text.primary",
        backgroundColor: "white",
        display: "flex",
        borderRadius: 3,
        boxShadow,
        flexDirection: { xs: "column", sm: "row" },
        maxWidth: "100%",
      }}
      {...props}
    >
      <Box
        component="img"
        src={image}
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
            {location}
          </Typography>
          <Box sx={{ mt: 3 }}>
            <RomingoScore score={score} />
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
                  {amenities.map((amenity) => (
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
                {price}
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
