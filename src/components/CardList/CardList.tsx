import Stack from "@material-ui/core/Stack";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import { FC } from "react";
import ListingCard, { ListingCardProps } from "../ListingCard/ListingCard";

interface Props {
  cards: ListingCardProps[];
  boxShadow?: number;
}

const CardList: FC<Props> = ({ cards, boxShadow = 4 }) => {
  return (
    <Box
      sx={{
        borderRadius: 1,
        maxWidth: "100%",
        pt: 0,
        px: 2,
        pb: 2,
      }}
    >
      {cards.map((card) => (
        <Box
          key={card.name}
          sx={{ maxWidth: "100%", backgroundColor: "white", pb: 2 }}
        >
          <ListingCard {...card} boxShadow={boxShadow} />
        </Box>
      ))}
    </Box>
  );
};

export default CardList;
