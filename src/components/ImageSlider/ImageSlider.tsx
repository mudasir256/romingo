import { useEffect, useState } from "react"
import { Box, Grid } from "@mui/material"
import { FC } from "react"
import useWindowSize from "../../hooks/UseWindowSize"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "./slider.css"
import { Carousel } from "react-responsive-carousel"

interface Props {
  images: string[];
  name: string;
  indicators?: boolean;
  sx?: any;
}

const ImageSlider: FC<Props> = ({ sx, images, name }) => {
  const [items, setItems] = useState<JSX.Element[]>([]);
  const [item, setItem] = useState(0);
  const size = useWindowSize();

  const initialSrcSet = images.map((img, i) => img.replace(/^http(s?):/i, "") + '?w=161&fit=crop&auto=format 1x')
  const secondSrcSet = images.map((img, i) => img.replace(/^http(s?):/i, "") + '?w=161&fit=crop&auto=format&dpr=2 2x)')

  useEffect(() => {
    if (images && images.length > 0) {
      setItems( images.slice(0, 10).map((img, i) => {
          if (i === 0) {
            return <Box key={img} component="img" srcSet={`https:${initialSrcSet[i]},https:${secondSrcSet[i]}`} alt={name} sx={{ ...sx, }} />
          } else {
            return <Box key={img + "lazy"} sx={{ ...sx, }} />
          }
        })
      )
    }
  }, [])



//   useEffect(() => {
//     if (images && images.length > 0) {
//       setItems(
//         images.slice(0, 10).map((img, i) => {
//           if (i === 0) {

//               console.log(`${img.replace(/^http(s?):/i, "")}?w=161&fit=crop&auto=format 1x,
// ${img.replace(/^http(s?):/i, "")}?w=161&fit=crop&auto=format&dpr=2 2x`)

//             return (
//               <Box key={img} component="img"
//                 srcSet={`${img.replace(
//                   /^http(s?):/i,
//                   ""
//                 )}?w=161&fit=crop&auto=format 1x,
// ${img.replace(/^http(s?):/i, "")}?w=161&fit=crop&auto=format&dpr=2 2x`}
//                 alt={name}
//                 sx={{
//                   ...sx,
//                 }}
//               />
//             );
//           } else {
//             return (
//               <Box key={img + "lazy"} sx={{ ...sx, }} />
//             );
//           }
//         })
//       );
//     }
//   }, []);

  useEffect(() => {
    if (item !== 0) {
      const addItems = [...items];
      const addItem =  <Box key={images[item]} component="img" src={images[item]} alt={name} sx={{ ...sx, backgroundSize: 'cover' }} />
      addItems[item] = addItem;
      setItems(addItems);
    }
  }, [item]);

  return items.length > 0 && <Carousel infiniteLoop selectedItem={item || 0} showStatus={false} showIndicators={size?.width < 600 ? false : true} showArrows={true} onChange={(i) => setItem(i)} showThumbs={false} >
    {items}
  </Carousel> || <Grid></Grid>
}

export default ImageSlider;
