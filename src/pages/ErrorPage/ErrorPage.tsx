import { FC } from "react";
import Box from "@mui/material/Box";
import { CSSObject } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ErrorDog from "../../components/UI/ErrorDog";
import Footer from "../../components/Footer";

interface Props {
  sx?: CSSObject;
}

const ErrorPage: FC<Props> = () => {
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ErrorDog size="250px" />
        <Box
          sx={{
            display: {
              md: "flex",
              sm: "block",
            },
            alignItems: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "primary.main",
            }}
          >
            Error 404
          </Typography>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              mx: 3,
              borderColor: "white",
            }}
          />
          <Box>
            <Typography
              variant="h4"
              sx={{
                mb: 2,
                color: "primary.main",
              }}
            >
              Sorry
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 1,
                fontSize: {
                  md: "125%",
                  sm: "100%",
                  fontWeight: "bold",
                },
                textTransform: "capitalize",
              }}
            >
              The page you&apos;re looking for was not found.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 1,
              }}
            >
              (maybe the dog ate it?)
            </Typography>
            <Link
              href="/"
              sx={{
                display: "flex",
              }}
            >
              <ChevronLeftIcon />
              <Typography
                variant="body2"
                sx={{
                  fontSize: "125%",
                }}
              >
                Go To Back
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default ErrorPage;
