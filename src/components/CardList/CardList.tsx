import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import { FC, useEffect, useState } from "react";
import ListingCard, { ListingCardProps } from "../ListingCard/ListingCard";
import usePagination from "./pagination";

interface Props {
  cards: ListingCardProps[];
  boxShadow?: number;
}

const CardList: FC<Props> = ({ cards, boxShadow = 4, sessionId }) => {
  const [newCards, setNewCards] = useState(cards)
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const count = Math.ceil(newCards.length / PER_PAGE);
  const _DATA = usePagination(newCards, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    setNewCards(cards)
    setPage(1)
  }, [cards])

  return (
    <Box
    >
      {_DATA.currentData().map((card) => (
        <Box
          key={card.name}
          sx={{ maxWidth: "100%", backgroundColor: "white", py: 1.5 }}
        >
          <ListingCard {...card} sessionId={sessionId} hotel={card} />
        </Box>
      ))}
      <Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </Box>
  );
};

export default CardList;
