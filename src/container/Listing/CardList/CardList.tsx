import Box from "@material-ui/core/Box";
import { FC } from "react";
import ListingCard, {
  ListingCardProps,
} from "../../../components/ListingCard/ListingCard";
interface Props {
  cards: ListingCardProps[];
}

const CardList: FC<Props> = ({ cards }) => {
  return (
    <Box
      sx={{
        borderRadius: 1,
        maxWidth: "100%",
      }}
    >
      {cards.map((card) => (
        <Box key={card.name} sx={{ my: 2, maxWidth: "100%" }}>
          <ListingCard {...card} />
        </Box>
      ))}
    </Box>
  );
};

export default CardList;
