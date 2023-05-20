import Box from "@mui/material/Box";
import { FC } from "react";
import ListingCard, { ListingCardProps } from "../ListingCard/ListingCard";

interface Props {
  cards: ListingCardProps[];
  boxShadow?: number;
}

const CardList: FC<Props> = ({ cards, boxShadow = 4, sessionId }) => {
  return (
    <Box
    >
      {cards.map((card) => (
        <Box
          key={card.name}
          sx={{ maxWidth: "100%", backgroundColor: "white", py: 1.5 }}
        >
          <ListingCard {...card} sessionId={sessionId} hotel={card}/>
        </Box>
      ))}
    </Box>
  );
};

export default CardList;
