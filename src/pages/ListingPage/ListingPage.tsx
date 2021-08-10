import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import { motion, useMotionValue } from "framer-motion";
import { FC, useRef, useState } from "react";
import { useWindowSize } from "react-use";
import CardList from "../../components/CardList/CardList";
import { ListingCardProps } from "../../components/ListingCard/ListingCard";
import ListingMap from "../../components/ListingMap";
import FilterBar from "../../components/FilterBar";

const MotionBox = motion(Box);

interface Props {
  cards: ListingCardProps[];
}

const ListingPage: FC<Props> = ({ cards }) => {
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

  console.log(animate);
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
          justifyContent: "center",
          zIndex: 1000,
          py: { xs: 0, md: 1 },
        }}
      >
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
            drag="y"
            dragElastic={0.5}
            dragConstraints={{
              top: variants[animate].y,
              bottom: variants[animate].y,
            }}
            style={{
              y,
              position: "absolute",
              top: height - 52,
              left: 0,
              right: 0,
              padding: "24px 20px",
              backgroundColor: "white",
              overflow: animate === "expanded" ? "auto" : "hidden",
              maxHeight: height - 48,
              zIndex: 200,
              boxShadow: "4px -1px 10px 0px rgba(0,0,0,0.3)",
            }}
            ref={scrollRef}
            variants={variants}
            animate={animate}
            transition={{ duration: 0.3 }}
            onDragEnd={(_, { offset }) => {
              if (offset.y < -30) {
                if (animate === "collapsed") {
                  setAnimate("preview");
                } else if (animate === "preview") {
                  setAnimate("expanded");
                }
              } else if (offset.y > 30) {
                if (animate === "preview") {
                  setAnimate("collapsed");
                } else if (animate === "expanded") {
                  scrollRef?.current?.scrollTo({ top: 0, behavior: "smooth" });
                  setAnimate("preview");
                }
              }
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                overflow: animate === "expanded" ? "auto" : "hidden",
              }}
            >
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
            <CardList cards={cards} boxShadow={0} />
          </motion.div>
        </Hidden>
        <Hidden mdDown>
          <Box
            sx={{
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
            <CardList cards={cards} />
          </Box>
        </Hidden>
      </Box>
    </>
  );
};

export default ListingPage;
