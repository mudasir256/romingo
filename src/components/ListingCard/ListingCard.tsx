import { FC } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Check from "@mui/icons-material/Check";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";
import { useHistory } from "react-router-dom";
import ImageSlider from "../ImageSlider";
import RomingoScore from "../RomingoScore/RomingoScore";

import LocationCityIcon from "@mui/icons-material/LocationCity";

export interface ListingCardProps {
  id: string;
  imageURLs: string[];
  name: string;
  addressLine1: string;
  romingoScore: number;
  cancellation?: boolean;
  lowestAveragePrice: number;
  currency?: string;
  dogAmenities?: string[];
  showAmenities?: boolean;
  highlighted?: boolean;
  location: {
    latitude: number;
    longitude: number;
  };
  city: {
    id: string;
    name: string;
  };
  neighborhood: string;
  showPrice?: boolean;
  noLink?: boolean;
}
const ListingCard: FC<ListingCardProps> = ({
  id,
  imageURLs,
  name,
  addressLine1,
  romingoScore,
  city,
  neighborhood,
  cancellation = false,
  lowestAveragePrice,
  currency = "$",
  dogAmenities = [],
  showAmenities = true,
  highlighted = false,
  showPrice = true,
  noLink = false,
  ...props
}) => {
  const history = useHistory();
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
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: highlighted ? "lightBackground.main" : "white",
      }}
      {...props}
    >
      <Box
        sx={{
          width: { sm: 300 },
          height: { xs: 200, sm: 242 },
        }}
      >
        <ImageSlider
          images={imageURLs}
          name={name}
          sx={{
            width: { sm: 300 },
            height: { xs: 200, sm: 242 },
            borderRadius: 3,
            boxShadow: 0,
          }}
        />
      </Box>
      <Link
        href="#"
        onClick={(e: any) => {
          e.preventDefault();
          e.stopPropagation();
          !noLink && history.push("/details/" + id);
        }}
        underline="none"
        sx={{ flex: 1, minWidth: { xs: "100%", sm: 0 }, maxWidth: "100%" }}
      >
        <Box
          sx={{
            pt: 1,
            px: { xs: mobileCardPadding, sm: 1.8 },
            pb: { xs: mobileCardPadding, sm: '0rem' },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              fontSize: "140%",
              fontWeight: 800,
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
                color: "text.secondary",
              }}
            >
              {addressLine1}, {city?.name}
            </Typography>
            <Chip icon={<LocationCityIcon />} label={neighborhood} />
              <Box sx={{ mt: 3, mb: 1, display: 'flex' }}>
              <Check sx={{ fontSize: 15, color: "primary", mt: '.25rem', mr: '.5rem', }}/>
              <Typography variant="body1" color="primary" sx={{ pr: 0.15, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", }}>
                No hidden fees
              </Typography>
            </Box>
            <Box sx={{ mt: 1, mb: -2, display: 'flex' }}>
              <Check sx={{ fontSize: 15, color: "primary", mt: '.25rem', mr: '.5rem', }}/>
              <Typography variant="body1" color="primary" sx={{ pr: 0.15, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", }}>
                Free cancellation
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", width: "100%", }}>
              <Box sx={{ mt: '1rem', mb: '0px' }}>
                <RomingoScore score={romingoScore} />
              </Box>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  textAlign: "right",
                  justifyContent: "end",
                  flexDirection: "column",
                }}
              >
                {showPrice && (
                  <>
                    <Typography
                      variant="h5"
                      sx={{
                        mr: 0.45,
                        letterSpacing: 1,
                        color: "text.secondary",
                        fontSize: "190%",
                      }}
                    >
                      {currency}
                      {Math.round(lowestAveragePrice)}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      / night
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

export default ListingCard;
