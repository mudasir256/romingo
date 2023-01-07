import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { FC } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./slider.css";
import { Carousel } from "react-responsive-carousel";

interface Props {
  images: string[];
  name: string;
  indicators?: boolean;
  sx?: any;
  forceLarge?: boolean;
}

const ImageSlider: FC<Props> = ({ sx, images, name, forceLarge }) => {
  const [items, setItems] = useState<JSX.Element[]>([]);
  const [item, setItem] = useState(0);

  useEffect(() => {
    if (images && images.length > 0) {
      const components = 
      forceLarge ?     
            images.slice(0, 10).map((img, i) => <img key={img + i} style={{
              display: 'block', 
              width: '100%', 
              height: '244px',
              objectFit: 'cover',
              objectPosition: 'center', 
              borderRadius: '6px 6px 0 0',
            }} src={img.replace(/'/g, "%27")} loading="lazy" />)
            : images.slice(0, 10).map((img, i) => (
              <>
                <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block'} }}>
                  <img key={img + i} style={{
                    display: 'block', 
                    width: '100%', 
                    height: '187px',
                    objectFit: 'cover',
                    objectPosition: 'center', 
                    borderRadius: '6px 0px 0px 6px',
                  }} src={img.replace(/'/g, "%27")} loading="lazy" alt="hotel image" />
                </Box>
                <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none'} }}>
                  <img key={img + i} style={{
                    display: 'block', 
                    width: '100%', 
                    height: '244px',
                    objectFit: 'cover',
                    objectPosition: 'center', 
                    borderRadius: '6px 6px 0 0',
                  }} src={img.replace(/'/g, "%27")} loading="lazy" alt="hotel image" />
                </Box>
              </>))

      setItems(components);
    }
  }, []);

  useEffect(() => {
    if (item !== 0) {
      const addItems = [...items];
      const addItem = (
        <Box
          key={images[item]}
          sx={{
            ...sx,
            display: "block",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            width: "100%",
            backgroundImage: `url('${images[item].replace(/'/g, "%27")}')`,
          }}
        />
      );
      addItems[item] = addItem;
      setItems(addItems);
    }
  }, [item]);

  return (
    (items.length > 0 && (
      <Carousel
        infiniteLoop
        selectedItem={item || 0}
        showStatus={false}
        showIndicators={false}
        showArrows={true}
        onChange={(i) => {
          setItem(i)
        }}
        showThumbs={false}
        preventMovementUntilSwipeScrollTolerance
        swipeScrollTolerance={100}
      >
        {items}
      </Carousel>
    )) || <Grid></Grid>
  );
};

export default ImageSlider;
