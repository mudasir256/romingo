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

  useEffect(() => {
    if (images.length > 0) {
      setItems(
        images.map((img) => {
          return (
            <Box
              key={img}
              component="img"
              src={img}
              alt={name}
              sx={{
                ...sx,
              }}
            />
          );
        })
      );
    }
  }, []);

  return (
    <Carousel infiniteLoop showStatus={false}>
      {items}
    </Carousel>
  );
};

export default ImageSlider;
