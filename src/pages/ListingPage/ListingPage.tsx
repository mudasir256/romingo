import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import Stack from "@material-ui/core/Stack";
import Divider from "@material-ui/core/Divider";
import MapIcon from "@material-ui/icons/Map";
import { motion, useMotionValue } from "framer-motion";
import { FC, useRef, useState } from "react";
import { useWindowSize } from "react-use";

import RomingoGuarantee from "../../components/RomingoGuarantee";
import { ListingCardProps } from "../../components/ListingCard/ListingCard";
import ListingCard from "../../components/ListingCard";
import ListingMap from "../../components/ListingMap";
import FilterBar from "../../components/FilterBar";
import { Button } from "@material-ui/core";
import Footer from "../../components/Footer";

const MotionBox = motion(Box);
const FooterMenus = {
  about: [
    {
      text: "How Romingo Works",
      link: "#",
    },
    {
      text: "Newsroom",
      link: "#",
    },
    {
      text: "Romingo 2021",
      link: "#",
    },
    {
      text: "Investors",
      link: "#",
    },
    {
      text: "Romingo Plus",
      link: "#",
    },
  ],
  contact: [
    {
      text: "Contact Us",
      link: "#",
    },
    {
      text: "Schedule a Meeting",
      link: "#",
    },
    {
      text: "Romingo 2021",
      link: "#",
    },
    {
      text: "Investors",
      link: "#",
    },
    {
      text: "Romingo Plus",
      link: "#",
    },
  ],
  blog: [
    {
      text: "Overview",
      link: "#",
    },
    {
      text: "Romingo Blog",
      link: "#",
    },
    {
      text: "Romingo 2021",
      link: "#",
    },
  ],
  sitemap: [
    {
      text: "How Romingo Works",
      link: "#",
    },
    {
      text: "Newsroom",
      link: "#",
    },
    {
      text: "Romingo 2021",
      link: "#",
    },
    {
      text: "Investors",
      link: "#",
    },
    {
      text: "Romingo Plus",
      link: "#",
    },
  ],
};

interface Props {
  cards: ListingCardProps[];
  footerMenus: {
    about: {
      text: string;
      link: string;
    }[];
    contact: {
      text: string;
      link: string;
    }[];
    blog: {
      text: string;
      link: string;
    }[];
    sitemap: {
      text: string;
      link: string;
    }[];
  };
}

const ListingPage: FC<Props> = ({ cards, footerMenus = FooterMenus }) => {
  const y = useMotionValue(0);
  const { height } = useWindowSize();
  const variants = {
    collapsed: {
      y: 0,
      borderTopLeftRadius: "24px",
      borderTopRightRadius: "24px",
    },
    preview: {
      y: (-2 * height) / 5,
      borderTopLeftRadius: "24px",
      borderTopRightRadius: "24px",
    },
    expanded: {
      y: -height + 52,
      borderTopLeftRadius: "0px",
      borderTopRightRadius: "0px",
    },
  };
  const triggerVariants = {
    collapsed: { height: 4, marginBottom: "24px" },
    preview: { height: 4, marginBottom: "24px" },
    expanded: { height: 0, marginBottom: "0px" },
  };
  const [animate, setAnimate] = useState<keyof typeof variants>("preview");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <Box
        sx={{
          position: { xs: "fixed", md: "relative" },
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          margin: "0 auto",
          boxShadow: { xs: 0, md: 2 },
          display: "flex",
          justifyContent: { xs: "center", md: "flex-start" },
          zIndex: 1000,
          py: { xs: 0, md: 1 },
        }}
      >
        <Box
          component="img"
          src={"/images/romingo_logo_yellow.svg"}
          alt="Logo"
          draggable="false"
          sx={{
            display: { xs: "none", md: "block" },
            ml: { xs: 0, md: 4 },
            mr: { xs: 0, md: 8 },
            height: { xs: "0px", md: "42px" },
          }}
        />
        <FilterBar />
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          display: {
            md: "flex",
          },
          height: { md: "calc(100vh - 60px)" },
        }}
      >
        <ListingMap center={{ lat: 32.221, lng: -110.969 }} />
        <Hidden mdUp>
          <motion.div
            drag={animate !== "expanded" && "y"}
            dragElastic={0.5}
            dragConstraints={{
              top: variants[animate].y,
              bottom: variants[animate].y,
            }}
            ref={scrollRef}
            style={{
              y,
              position: "absolute",
              top: height - 52,
              left: 0,
              right: 0,
              padding: 24,
              backgroundColor: "white",
              overflow: animate === "expanded" ? "auto" : "hidden",
              maxHeight: height - 48,
              zIndex: 100,
            }}
            variants={variants}
            animate={animate}
            transition={{ duration: 0.3 }}
            onDragEnd={(_, { offset }) => {
              if (offset.y < -30) {
                if (animate === "collapsed") {
                  setAnimate("preview");
                } else {
                  setAnimate("expanded");
                }
              } else if (offset.y > 30) {
                if (animate === "preview") {
                  setAnimate("collapsed");
                } else {
                  setAnimate("preview");
                }
              }
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <MotionBox
                variants={triggerVariants}
                animate={animate}
                sx={{
                  width: 40,
                  borderRadius: 1,
                  backgroundColor: "grey.200",
                }}
              />
            </Box>
            <Stack spacing={3} divider={<Divider variant="middle" />}>
              <RomingoGuarantee sx={{ mb: 0 }} />

              {cards.map((card, index) => (
                <ListingCard key={index} {...card} boxShadow={0} />
              ))}
            </Stack>
          </motion.div>
          {animate === "expanded" && (
            <Button
              size="small"
              variant="contained"
              onClick={() => {
                scrollRef?.current?.scrollTo({ top: 0, behavior: "auto" });
                setAnimate("collapsed");
              }}
              sx={{
                position: "absolute",
                bottom: 30,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 100,
                boxShadow: 10,
                borderRadius: 1,
              }}
            >
              <MapIcon sx={{ fontSize: 15, mr: 0.5 }} />
              Map
            </Button>
          )}
        </Hidden>
        <Hidden mdDown>
          <Box
            sx={{
              px: 3,
              pt: 2,
              pb: 3,
              width: "55%",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "0.4em",
              },
              "&::-webkit-scrollbar-track": {
                boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                borderRadius: "0.3em",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,.1)",
                borderRadius: "0.3em",
              },
            }}
          >
            <RomingoGuarantee sx={{ mb: 3 }} />
            <Stack spacing={3} divider={<Divider variant="middle" />}>
              {cards.map((card, index) => (
                <ListingCard key={index} {...card} boxShadow={0} />
              ))}
            </Stack>
          </Box>
        </Hidden>
      </Box>
      <Box display={{ xs: "none", sm: "block" }}>
        <Footer footerMenus={footerMenus} />
      </Box>
    </>
  );
};

export default ListingPage;
