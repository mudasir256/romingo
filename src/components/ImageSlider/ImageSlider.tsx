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
  setShow?: any;
}

const ImageSlider: FC<Props> = ({ sx, images, name, setShow }) => {
  const [items, setItems] = useState<JSX.Element[]>([]);
  const [item, setItem] = useState(0);

  useEffect(() => {
    if (images && images.length > 0) {
      setItems(
        images.slice(0, 10).map((img, i) => (
          <Box
            component="div"
            key={img}
            sx={{
              ...sx,
              display: "block",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              width: "100%",
              backgroundImage: `url('${img.replace(/'/g, "%27")}')`,
            }}
          />
        ))
      );
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
          setShow(false)
          setTimeout(() => {
            setShow(true)
          }, 6000)
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
