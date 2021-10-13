import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { FC } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./slider.css";
import { Carousel } from "react-responsive-carousel";

interface Props {
  images: string[];
  name: string;
  sx?: any;
}

const ImageSlider: FC<Props> = ({ sx, images, name }) => {
  const [items, setItems] = useState<JSX.Element[]>([]);
  const [item, setItem] = useState(0);

  useEffect(() => {
    if (images && images.length > 0) {
      setItems(
        images.slice(0, 10).map((img, i) => {
          if (i === 0) {
            return (
              <Box
                key={img}
                component="img"
                srcSet={`${img.replace(
                  /^http(s?):/i,
                  ""
                )}?w=161&fit=crop&auto=format 1x,
${img.replace(/^http(s?):/i, "")}?w=161&fit=crop&auto=format&dpr=2 2x`}
                alt={name}
                sx={{
                  ...sx,
                }}
              />
            );
          } else {
            return (
              <Box
                sx={{
                  ...sx,
                }}
              />
            );
          }
        })
      );
    }
  }, []);

  useEffect(() => {
    if (item !== 0) {
      const addItems = [...items];
      const addItem = (
        <Box
          key={images[item]}
          component="img"
          src={images[item]}
          alt={name}
          sx={{
            ...sx,
          }}
        />
      );
      addItems[item] = addItem;
      setItems(addItems);
    }
  }, [item]);

  return (
    <Carousel
      infiniteLoop
      showStatus={false}
      showIndicators={true}
      showArrows={true}
      onChange={(i) => setItem(i)}
      showThumbs={false}
    >
      {items}
    </Carousel>
  );
};

export default ImageSlider;
