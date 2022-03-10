import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { FC } from "react";
import { CSSObject } from "@mui/material";

export interface Props {
  sx?: CSSObject;
}

const ListingCardSkeleton: FC<Props> = ({ sx }) => {
  const mobileCardPadding = 0;

  return (
    <Box
      sx={{
        color: "text.primary",
        backgroundColor: "white",
        display: "flex",
        borderRadius: 3,
        flexDirection: { xs: "column", sm: "row" },
        maxWidth: "100%",
      }}
    >
      <Skeleton
        sx={{
          width: { xs: "100%", sm: 400, md: 350, lg: 350 },
          maxWidth: { xs: "100%", sm: 280 },
          height: { xs: 300, sm: 211, md: 186 },
          borderRadius: 3,
          boxShadow: 0,
        }}
        animation="wave"
        variant="rectangular"
      />
      <Box
        sx={{
          pt: 0,
          px: { xs: mobileCardPadding, sm: 1.8 },
          pb: { xs: mobileCardPadding, sm: 1.8 },
          flex: 1,
          minWidth: 0,
        }}
      >
        <Skeleton animation="wave" width="90%" height={25} />

        <Box>
          <Skeleton animation="wave" width="70%" height={18} />

          <Box sx={{ mt: 3, mb: 1.85 }}>
            <Skeleton
              animation="wave"
              width={160}
              height={58}
              sx={{ mt: -1, borderRadius: 0 }}
            />
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
                  minWidth: "100px",
                }}
              />
              <Skeleton
                animation="wave"
                sx={{
                  minWidth: "100px",
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
                  minWidth: "80px",
                  mt: 1,
                }}
                width={100}
                height={38}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ListingCardSkeleton;
