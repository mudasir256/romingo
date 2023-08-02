import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import { FC, useEffect, useRef, useState } from "react";
import ListingCard, { ListingCardProps } from "../ListingCard/ListingCard";
import usePagination from "./pagination";

interface Props {
  cards: ListingCardProps[];
  boxShadow?: number;
}

const CardList: FC<Props> = ({ cards, boxShadow = 4, sessionId }) => {
  // const [newCards, setNewCards] = useState(cards)
  const [page, setPage] = useState(0);
  const PER_PAGE = 25;

  const count = Math.ceil(cards.length / PER_PAGE);

  const _DATA = usePagination(cards, PER_PAGE);
  const divRef = useRef();

  const handleChange = (e, p) => {
    e.preventDefault()
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    setPage(1);
    _DATA.jump(1);
  }, [cards]);

  return (
    <Box>
      <div ref={divRef}>
        {cards.length > 0 && _DATA.currentData().map((card) => {
          const exists = cards.find(el => el.ID === card.ID);
          if (exists) {
            return (<div key={card.ID}>
              <Box data-hotel-id={exists.ID}
                sx={{ maxWidth: "100%", backgroundColor: "white", py: 1.5 }}
              >
                <ListingCard {...card} sessionId={sessionId} hotel={card} id={card.ID} page="listings" />
              </Box>
            </div>)
          }
        }

        )}
      </div>
      <Box mb="1rem" ml="-2rem" sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'center', md: 'flex-start', lg: 'flex-start' } }}>
        <Pagination
          count={count}
          size="large"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </Box>

    </Box>
  );
};

export default CardList;
