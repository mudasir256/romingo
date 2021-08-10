import Box from "@material-ui/core/Box";
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
        py: 1,
        px: 2.5,
      }}
    >
      {cards.map((card) => (
        <Box
          key={card.name}
          sx={{ maxWidth: "100%", backgroundColor: "white", py: 1.5 }}
        >
          <ListingCard {...card} boxShadow={boxShadow} />
        </Box>
      ))}
    </Box>
  );
};

export default CardList;
