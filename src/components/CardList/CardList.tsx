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
  const PER_PAGE = 10;

  const count = Math.ceil(cards.length / PER_PAGE);
  
  const _DATA = usePagination(cards, PER_PAGE);
  const divRef = useRef();

  const handleChange = (e, p) => {
    e.preventDefault()
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {  
    if(divRef.current.children.length > 0)
    for(const child of divRef.current.children){
      console.log(child)
      console.log(child.getAttribute('data-hotel-id'))
    }
      // divRef.current.removeChild(divRef.current.children[divRef.current.children.length - 1])
    setPage(1);
    _DATA.jump(1);
  }, [cards]);

  return (
    <div>
      <div ref={divRef}>
      {cards.length> 0 && _DATA.currentData().map((card) => {
        const exists = cards.find(el => el.ID === card.ID);
        if(exists){
          return ( <div             key={card.name}
             data-hotel-id={exists.ID}><Box
            sx={{ maxWidth: "100%", backgroundColor: "white", py: 1.5 }}
          >
            <ListingCard {...card} sessionId={sessionId} hotel={card} />
          </Box></div>)
        }
      }
       
      )}
      </div>
      
      <Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </div>
  );
};

export default CardList;
