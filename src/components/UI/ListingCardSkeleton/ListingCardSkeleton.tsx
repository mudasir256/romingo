import Typography from "@material-ui/core/Typography";
import Stack from "@material-ui/core/Stack";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/core/Skeleton"
import { FC } from "react";
import { CSSObject } from "@material-ui/core";

export interface Props {
  sx?: CSSObject;
}

const ListingCardSkeleton: FC<Props> = ({ sx }) => {
  const mobileCardPadding = 1.8;

  return (
    <Box
      sx={{
        color: "text.primary",
        backgroundColor: "white",
        display: "flex",
        borderRadius: 3,
        boxShadow: 4,
        flexDirection: { xs: "column", sm: "row" },
        maxWidth: "100%",
      }}
    >
      <Skeleton
        sx={{
          width: "100%",
          maxWidth: { sm: 280 },
          maxHeight: { xs: 180, sm: "100%" },
          minHeight: { xs: 180, sm: "100%" },
          borderRadius: 3,
          boxShadow: 0,
          height: "auto"
        }}
        animation="wave"
        variant="rectangular"
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
        <Skeleton 
          animation="wave"
          width="90%"
        />

        <Box>
          <Skeleton 
            animation="wave"
            width="70%"
          />

          <Box sx={{ mt: 3, mb: 3 }}>
            <Skeleton animation="wave" width="60%" />
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
                display: "block",
                minWidth: 0,
                overflow: "hidden",
              }}
            >
              <Skeleton 
                animation="wave"
                sx={{
                  minWidth: "100px"
                }}
              />
              <Skeleton 
                animation="wave"
                sx={{
                  minWidth: "100px"
                }}
              />
            </Box>
            <Box
              sx={{
                alignItems: "center",
                display: { xs: "inline-block", lg: "flex" },
                textAlign: "right",
              }}
            >
              <Skeleton 
                animation="wave"
                sx={{
                  minWidth: "80px"
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ListingCardSkeleton;
