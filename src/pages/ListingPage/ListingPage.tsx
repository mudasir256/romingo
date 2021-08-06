import Box from "@material-ui/core/Box";
import Stack from "@material-ui/core/Stack";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import { motion, useMotionValue } from "framer-motion";
import { FC, useRef, useState } from "react";
import { useWindowSize } from "react-use";
import ListingCard, {
  ListingCardProps,
} from "../../components/ListingCard/ListingCard";
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

  return (
    <Box>
      <Box
        sx={{
          py: 0.3
        }}
      >
        <FilterBar />
      </Box>
      <Box
        sx={{
          backgroundColor: "grey.200",
          display: {
            md: "flex"
          },
          height: "90vh",
          overflow: {
            md: "hidden"
          }
        }}
      >
        <ListingMap 
          center={{ lat: 32.221, lng: -110.969 }} 
          sx={{
            maxWidth: {
              md: "45%"
            }
          }}
        />
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
              {cards.map((card, index) => (
                <ListingCard key={index} {...card} boxShadow={0} />
              ))}
            </Stack>
          </motion.div>
        </Hidden>
        <Hidden mdDown>
          <Box
            sx={{
              overflowY: "auto",
              '&::-webkit-scrollbar': {
                width: '0.4em'
              },
              '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                borderRadius: '0.3em'
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,.1)',
                borderRadius: '0.3em'
              },
            }}
          >
            <Stack spacing={3} divider={<Divider variant="middle" />}>
              {cards.map((card, index) => (
                <ListingCard key={index} {...card} boxShadow={0} />
              ))}
            </Stack>
          </Box>
        </Hidden>
      </Box>
    </Box>
  );
};

export default ListingPage;
