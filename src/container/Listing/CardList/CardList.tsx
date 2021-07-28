import Box from "@material-ui/core/Box";
import { FC } from "react";
import ListingCard from "../../../components/ListingCard";

interface Props {
  cards: ListingCard[];
}

const CardList: FC<Props> = ({ cards }) => {
  return (
    <Box
      sx={{
        borderRadius: 3,
        maxWidth: "100%",
      }}
    >
      {cards.map((card) => (
        <Box key={card.id} sx={{ my: 2, maxWidth: "100%" }}>
          <ListingCard
            image={card.image}
            name={card.name}
            location={card.location}
            score={card.score}
            price={card.price}
            currency="$"
            amenities={card.amenities}
          />
        </Box>
      ))}
    </Box>
  );
};

export default CardList;
