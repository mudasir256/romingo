import Box from "@material-ui/core/Box";
import Stack from "@material-ui/core/Stack";
import { motion, useMotionValue } from "framer-motion";
import { FC, useState } from "react";
import { useWindowSize } from "react-use";
import ListingCard, {
  ListingCardProps,
} from "../../components/ListingCard/ListingCard";

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
      y: -250,
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

  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        backgroundColor: "grey.200",
      }}
    >
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
          padding: 24,
          backgroundColor: "white",
          overflow: animate === "expanded" ? "auto" : "hidden",
          maxHeight: height - 48,
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
        <Stack spacing={3}>
          {cards.map((card, index) => (
            <ListingCard key={index} {...card} boxShadow={0} />
          ))}
        </Stack>
      </motion.div>
    </Box>
  );
};

export default ListingPage;
