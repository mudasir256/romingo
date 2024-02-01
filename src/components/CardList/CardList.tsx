import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import { FC, useRef, useState } from "react";
import ListingCard, { ListingCardProps } from "../ListingCard/ListingCard";
import usePagination from "./pagination";

interface Props {
  cards: ListingCardProps[];
  boxShadow?: number;
  sessionId: string;
  search: JSON
}

const CardList: FC<Props> = ({ cards, boxShadow = 4, sessionId, search }) => {
  // const [newCards, setNewCards] = useState(cards)
  // const [page, setPage] = useState(0);
  // const PER_PAGE = 1000;

  // const count = Math.ceil(cards.length / PER_PAGE);

  // const _DATA = usePagination(cards, PER_PAGE);
  // const divRef = useRef();

  // const handleChange = (e, p) => {
  //   e.preventDefault()
  //   setPage(p);
  //   // _DATA.jump(p);
  // };

  // useEffect(() => {
  //   setPage(1);
  //   // _DATA.jump(1);
  // }, [cards]);
  return (
    <Box>
      {cards.map(card =>(
        <div key={card.id}>
          <Box
            sx={{ maxWidth: "100%", backgroundColor: "white", py: '0.8rem' }}
          >
            <ListingCard {...card} sessionId={sessionId} hotel={card} id={card.id} page="listings" search={search} />
          </Box>
        </div>
      ))}
    
     {/* <div ref={divRef}>
        {cards.length > 0 && _DATA.currentData().map((card) => {
          const exists = cards.find(el => el.ID === card.ID);
          if (exists) {
            return (<div key={card.id}>
              <Box data-hotel-id={exists.ID}
                sx={{ maxWidth: "100%", backgroundColor: "white", py: '0.8rem' }}
              >
                <ListingCard {...card} sessionId={sessionId} hotel={card} id={card.ID} page="listings" />
              </Box>
            </div>)
          }
        }

        )}
      </div>*/}
  {/*    {cards.length > PER_PAGE && 
      <Box mb="1rem" sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'center', md: 'flex-start', lg: 'flex-start' } }}>
        <Pagination
          count={count}
          size="large"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </Box>
      }*/}

    </Box>
  );
};

export default CardList;
