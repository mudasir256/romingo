import Typography from "@material-ui/core/Typography";
import Stack from "@material-ui/core/Stack";
import Box from "@material-ui/core/Box";
import Check from "@material-ui/icons/Check";
import { FC } from "react";
import { Calculate } from "@material-ui/icons";

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
    <Box
      sx={{
        display: "flex",
        borderRadius: 3,
        boxShadow: 2,
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
          height: 164,
          maxWidth: { sm: 200 },
          borderRadius: 3,
          boxShadow: 2,
        }}
      />
      <Box sx={{ py: 1.5, px: 1.8, flex: 1 }}>
        <Typography
          variant="h6"
          sx={{
            color: "primary.main",
            textDecoration: "underline",
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
              mt: 0,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
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
              <Stack
                sx={{ mt: 1, mr: 2, minWidth: 0, overflow: "hidden" }}
                spacing={0.5}
              >
                {amenities.map((amenity) => (
                  <Box
                    key={amenity}
                    sx={{
                      display: "flex",
                    }}
                  >
                    <Check fontSize="small" />
                    <Typography
                      variant="body2"
                      sx={{
                        fontStyle: "italic",
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
            </Box>
            <Box
              sx={{
                alignItems: "center",
                display: { xs: "inline-block", sm: "flex" },
                textAlign: "right",
              }}
            >
              <Typography variant="h6" sx={{ mr: { xs: 0, sm: 0.2 } }}>
                {currency}
                {price}
              </Typography>
              <Typography variant="body2">/night</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ListingCard;
