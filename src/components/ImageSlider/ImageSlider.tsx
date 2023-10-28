import { useEffect, useState, Fragment } from "react";
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
  page?: string;
}

const ImageSlider: FC<Props> = ({ sx, images, name, forceLarge, imageCount = 10, page }) => {
  const [items, setItems] = useState<JSX.Element[]>([]);
  const [item, setItem] = useState(0);

  let borderRadius = '6px 0px 0px 6px'

  if (page === 'listings') {
    borderRadius = '6px 0px 0px 6px';
  } else if (page === 'detail-room') {
    borderRadius = '6px 6px 0px 0px'
  }

  useEffect(() => {
    if (images && images.length > 0) {
      const components = 
      forceLarge ?     
            images.slice(0, 3).map((img, i) => <img key={img + i} style={{
              display: 'block', 
              width: '100%', 
              height: '280px',
              objectFit: 'cover',
              objectPosition: 'center', 
              borderRadius: '6px 6px 0px 0px',
            }} src={img.replace(/'/g, "%27")} alt="hotel image" loading="lazy" />)
            : images.slice(0, imageCount).map((img, i) => (
              <Fragment key={img + i+name}>
                <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block'} }}>
                  <img key={img + i} style={{
                    display: 'block', 
                    width: '100%', 
                    height: '284px',
                    objectFit: 'cover',
                    objectPosition: 'center', 
                    borderRadius: borderRadius,
                    ...sx,
                  }} src={img.replace(/'/g, "%27")} loading="lazy" alt="hotel image" />
                </Box>
                <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none'} }}>
                  <img key={img + i+name} style={{
                    display: 'block', 
                    width: '100%', 
                    height: '244px',
                    objectFit: 'cover',
                    objectPosition: 'center', 
                    borderRadius: '6px 6px 0 0',
                    ...sx,
                  }} src={img.replace(/'/g, "%27")} loading="lazy" alt="hotel image" />
                </Box>
              </Fragment>))
      setItems(components);
    }
  }, [images]);

  useEffect(() => {
    // if (item !== 0) {
    //   const addItems = [...items];
    //   const addItem = (
    //     <Box
    //       key={images[item]}
    //       sx={{
    //         ...sx,
    //         display: "block",
    //         backgroundSize: "cover",
    //         backgroundPosition: "center center",
    //         width: "100%",
    //         backgroundImage: `url('${images[item].replace(/'/g, "%27")}')`,
    //       }}
    //     />
    //   );
    //   addItems[item] = addItem;
    //   setItems(addItems);
    // }
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
