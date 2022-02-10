import Box from "@mui/material/Box";
import { FC } from "react";
import { CSSObject } from "@mui/material";
import { PopupButton } from "@typeform/embed-react";
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
import PetsIcon from "@mui/icons-material/Pets";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HotelIcon from "@mui/icons-material/Hotel";

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
      text: "Manage reservation",
      link: "/reservation/manage",
      target: "",
    },
  ],
  about: [
    {
      text: "Our story",
      link: "/about",
      target: "",
    },
    {
      text: "FAQ",
      link: "/faq",
      target: "",
    },
    {
      text: "Romingo score",
      link: "/romingo-score",
      target: "",
    },
    {
      text: "RedRover partnership",
      link: "/romingo-partners",
      target: "",
    },
  ],
  contact: [
    {
      text: "Contact us",
      link: "/contact",
      target: "",
    },
    {
      text: "Facebook",
      link: "https://www.facebook.com/RomingoTravel",
      target: "_blank",
    },
    {
      text: "Instagram",
      link: "https://www.instagram.com/romingotravel/",
      target: "_blank",
    },
  ],
  blog: [
    {
      text: "Romingo Blog",
      link: "/blog",
      target: "_blank",
    },
    {
      text: "Top Travel Tips",
      link: "/blog/12",
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
        backgroundColor: "#f7f7f7",
        borderTop: '1px solid #f2f2f2'
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
                    <Link href={menu.link} sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          textDecoration: 'none',
                          '&:hover': { color: 'primary.main' }
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
              Site map
            </Typography>
            <List>
              {footerMenus.about.map((menu, key) => {
                return (
                  <ListItem key={key} sx={{ pl: 0 }}>
                    <Link href={menu.link} sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          textDecoration: 'none',
                          '&:hover': { color: 'primary.main' }
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
              Contact
            </Typography>
            <List>
              {footerMenus.contact.map((menu, key) => {
                return (
                  <ListItem key={key} sx={{ pl: 0 }}>
                    <Link href={menu.link} sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          textDecoration: 'none',
                          '&:hover': { color: 'primary.main' }
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
              Content &amp; Blog
            </Typography>
            <List>
              <ListItem key={"definitive-guide"} sx={{ pl: 0 }}>
                <PopupButton
                  id="SYpKecCU"
                  style={{
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    padding: 0,
                    cursor: "pointer",
                    margin: 0,
                    marginBottom: -5,
                  }}
                >
                  <Link sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        textDecoration: 'none',
                        '&:hover': { color: 'primary.main' }
                      }}
                    >
                      Guide to Dog-Friendly Travel
                    </Typography>
                  </Link>
                </PopupButton>
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <Link
                  href="https://storage.googleapis.com/romingo-development-public/ebooks/Air%20Travel%20Guide.pdf"
                  target="_blank"
                  sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      textDecoration: 'none',
                      '&:hover': { color: 'primary.main' }
                    }}
                  >
                    Guide to Air Travel With Your Dog
                  </Typography>
                </Link>
              </ListItem>
              {footerMenus.blog.map((menu, key) => {
                return (
                  <ListItem key={key} sx={{ pl: 0 }}>
                    <Link href={menu.link} sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          textDecoration: 'none',
                          '&:hover': { color: 'primary.main' }
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
              href="/privacy"
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
            <Link href="/terms-of-use">
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
            <Typography variant="body2" color="#ccc">
              <PetsIcon sx={{ fontSize: "13px", mx: 0.2, mb: -0.1 }} />+
              <HotelIcon sx={{ fontSize: "15px", mx: 0.2, mb: -0.3 }} />=
              <FavoriteIcon
                onClick={() => (window.location.href = "/romingo-partners")}
                sx={{
                  fontSize: "15px",
                  mx: 0.2,
                  mb: -0.3,
                  "& :hover": { color: "#03989E", cursor: "pointer" },
                }}
              />
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
              href="https://www.facebook.com/RomingoTravel/"
              target="_blank"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              edge="start"
              sx={{ mr: 1, color: "black" }}
              aria-label="menu"
              href="https://www.instagram.com/romingotravel/"
              target="_blank"
            >
              <InstagramIcon />
            </IconButton>
          </Box>
        </Hidden>
      </Container>
    </Box>
  );
};

export default Footer;
