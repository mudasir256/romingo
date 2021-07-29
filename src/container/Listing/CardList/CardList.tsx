import Box from "@material-ui/core/Box";
import { FC } from "react";
import ListingCard from "../../../components/ListingCard";

interface Card {
  image: string;
  name: string;
  location: string;
  score: number;
  cancellation?: boolean;
  price: number;
  currency?: string;
  amenities?: string[];
  showAmenities?: boolean;
}
interface Props {
  cards: Array<Card>;
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
        <Box key={card.name} sx={{ my: 2, maxWidth: "100%" }}>
          <ListingCard {...card} />
        </Box>
      ))}
    </Box>
  );
};

export default CardList;
