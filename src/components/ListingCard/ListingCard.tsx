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
  amenities = [],
  showAmenities = true,
}) => {
  return (
    <Box
      sx={{
        color: "text.primary",
        display: "flex",
        borderRadius: 0,
        boxShadow: 4,
        flexDirection: { xs: "column", sm: "row" },
        maxWidth: "100%",
      }}
    >
      <Box
        component="img"
        src={image}
        alt={name}
        sx={{
          objectFit: "cover",
          width: "100%",
          maxWidth: { sm: 200 },
          maxHeight: { xs: 180, sm: "100%" },
          minHeight: { xs: 180, sm: "100%" },
          borderRadius: 0,
          boxShadow: 0,
        }}
      />
      <Box sx={{ py: 1.2, px: 1.8, flex: 1, minWidth: 0 }}>
        <Typography
          variant="h6"
          sx={{
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
              fontWeight: "light",
              mt: 0,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {location}
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="h6"
              sx={{
                color: "secondary.dark",
              }}
            >
              {score}
            </Typography>
            <Typography variant="body1" sx={{ ml: 0.75, mt: "5px" }}>
              Romingo Score
            </Typography>
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
                  sx={{ mt: 1, mr: 0.5, minWidth: 0, overflow: "hidden" }}
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
                        sx={{ fontSize: 15, color: "primary.main", mt: 0.4 }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontStyle: "italic",
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
                display: { xs: "inline-block", sm: "flex" },
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
                }}
              >
                {currency}
                {price}
              </Typography>
              <Typography variant="body2">/ night</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ListingCard;
