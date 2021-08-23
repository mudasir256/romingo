import { FC } from "react";
import Box from "@material-ui/core/Box";
import { CSSObject } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

interface Props {
  sx?: CSSObject
}

const ErrorPage: FC<Props> = ({ sx }) => {
  return (
    <Box
      sx={{
        height: "100vh"
      }}
    >
      <Box
        component="img"
        src="/images/Adobe_6.jpeg"
        alt="background"
        draggable="false"
        sx={{
          objectFit: "cover",
          width: "100%",
          height: "100vh",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "center",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Box
          sx={{
            display: {
              md: "flex",
              sm: "block"
            },
            alignItems: "center"
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "primary.main"
            }}
          >
            Error 404
          </Typography>
          <Divider orientation="vertical" flexItem
            sx={{
              mx: 3,
              borderColor: "white"
            }}
          />
          <Box>
            <Typography
              variant="h4"
              sx={{
                mb: 2,
                color: "primary.main"
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
                  fontWeight: "bold"
                },
                textTransform: "capitalize"
              }}
            >
              {"The page you're looking for was not found."}
            </Typography>
            <Link href="/"
              sx={{
                display: "flex"
              }}>
              <ChevronLeftIcon />
              <Typography
                variant="body2"
                sx={{
                  fontSize: "125%"
                }}
              >
                Go To Back
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ErrorPage;