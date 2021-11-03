import Box from "@mui/material/Box";
import { FC } from "react";
import { CSSObject } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Hidden from "@mui/material/Hidden";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PetsIcon from "@mui/icons-material/Pets";
interface Props {
  sx?: CSSObject;
  footerMenus?: {
    reservation: {
      text: string;
      link: string;
      target: string;
    }[];
    about: {
      text: string;
      link: string;
      target: string;
    }[];
    contact: {
      text: string;
      link: string;
      target: string;
    }[];
    blog: {
      text: string;
      link: string;
      target: string;
    }[];
    sitemap: {
      text: string;
      link: string;
      target: string;
    }[];
  };
}

const FooterMenus = {
  reservation: [
    {
      text: "Manage Reservation",
      link: "/reservation/manage",
      target: "",
    },
    {
      text: "Cancel Reservation",
      link: "/reservation/manage",
      target: "",
    },
  ],
  about: [
    {
      text: "Our Story",
      link: "/about",
      target: "",
    },
    {
      text: "FAQ",
      link: "/faq",
      target: "",
    },
    {
      text: "Romingo Score",
      link: "/romingo-score",
      target: "",
    },
  ],
  contact: [
    {
      text: "Contact Us",
      link: "/contact",
      target: "",
    },
    {
      text: "Partner Inquiry",
      link: "https://form.typeform.com/to/zdVrRtxT",
      target: "_blank",
    },
    {
      text: "On Facebook",
      link: "https://www.facebook.com/RomingoTravel",
      target: "_blank",
    },
    {
      text: "On Instagram",
      link: "https://www.instagram.com/romingotravel/",
      target: "_blank",
    },
  ],
  blog: [
    {
      text: "Romingo Blog",
      link: "https://romingo.com/blog",
      target: "_blank",
    },
    {
      text: "California Tavel Tips",
      link: "https://romingo.com/tag/californiatravel/",
      target: "_blank",
    },
    {
      text: "Top Travel Tips",
      link: "https://romingo.com/tag/traveltips/",
      target: "_blank",
    },
  ],
  sitemap: [],
};

const Footer: FC<Props> = ({ sx, footerMenus = FooterMenus }) => {
  return (
    <Box
      sx={{
        ...sx,
        pt: 3,
        backgroundColor: "#F7F7F7",
      }}
    >
      <Container maxWidth="lg">
        <Grid container sx={{ borderBottom: "1px solid #DDDDDD" }}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "text.primary",
              }}
            >
              Reservation
            </Typography>
            <List>
              {footerMenus.reservation.map((menu, key) => {
                return (
                  <ListItem key={key} sx={{ pl: 0 }}>
                    <Link href={menu.link}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "primary.main",
                        }}
                      >
                        {menu.text}
                      </Typography>
                    </Link>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "text.primary",
              }}
            >
              About Us
            </Typography>
            <List>
              {footerMenus.about.map((menu, key) => {
                return (
                  <ListItem key={key} sx={{ pl: 0 }}>
                    <Link href={menu.link}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "primary.main",
                        }}
                      >
                        {menu.text}
                      </Typography>
                    </Link>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "text.primary",
              }}
            >
              Contact Us
            </Typography>
            <List>
              {footerMenus.contact.map((menu, key) => {
                return (
                  <ListItem key={key} sx={{ pl: 0 }}>
                    <Link href={menu.link} target={menu.target}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "primary.main",
                        }}
                      >
                        {menu.text}
                      </Typography>
                    </Link>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "text.primary",
              }}
            >
              Blog
            </Typography>
            <List>
              {footerMenus.blog.map((menu, key) => {
                return (
                  <ListItem key={key} sx={{ pl: 0 }}>
                    <Link href={menu.link}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "primary.main",
                        }}
                      >
                        {menu.text}
                      </Typography>
                    </Link>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "space-between",
            justifyContent: "space-between",
            py: 1,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography
              variant="body2"
              sx={{
                mr: 1,
              }}
            >
              © {new Date().getFullYear()} Romingo, Inc.
            </Typography>
            <Link
              href="#"
              sx={{
                mr: 1,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "primary.main",
                }}
              >
                Privacy
              </Typography>
            </Link>
            <Link href="#">
              <Typography
                variant="body2"
                sx={{
                  color: "primary.main",
                }}
              >
                Terms
              </Typography>
            </Link>
          </Box>
          <Hidden smDown>
            <Typography variant="body2" color="primary">
              Made with <PetsIcon sx={{ fontSize: "13px", mb: -0.25 }} /> by
              Romingo
            </Typography>
          </Hidden>
        </Box>
        <Hidden smUp>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton
              edge="start"
              sx={{ mr: 1, color: "black" }}
              aria-label="menu"
              href="https://www.facebook.com/RomingoTravel"
              target="_blank"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              edge="start"
              sx={{ mr: 1, color: "black" }}
              aria-label="menu"
              href="https://www.instagram.com/romingotravel"
              target="_blank"
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              edge="start"
              sx={{ mr: 1, color: "black" }}
              aria-label="menu"
              href="https://twitter.com/RomingoTravel"
              target="_blank"
            >
              <TwitterIcon />
            </IconButton>
          </Box>
        </Hidden>
      </Container>
    </Box>
  );
};

export default Footer;
