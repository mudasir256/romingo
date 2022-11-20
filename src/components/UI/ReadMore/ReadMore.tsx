import { FC, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface Props {
  text: string;
  length: number;
  small?: boolean;
  justify?: boolean;
}

const ReadMore: FC<Props> = ({
  text,
  length,
  small = false,
  justify = false,
}) => {
  const [showLess, setShowLess] = useState(true);


  return (
    <Typography
      variant="body2"
      component="h2"
      sx={{
        lineHeight: small ? 1 : 2,
        display: "inline",
        my: 0,
        fontSize: small ? ".9rem" : "100%",
        textAlign: justify ? "justify" : "left",
      }}
    >
      {text}
    </Typography>
  );
  
  // return (
  //   <Box>
  //     <Typography
  //       variant="body2"
  //       dangerouslySetInnerHTML={{
  //         __html: showLess ? `${text.slice(0, length)}... ` : text + " ",
  //       }}
  //       sx={{
  //         lineHeight: small ? 1.75 : 2,
  //         display: "inline",
  //         my: 0,
  //         fontWeight: 400,
  //         color: "#000000c7",
  //         fontSize: small ? ".9rem" : "100%",
  //         textAlign: justify ? "justify" : "left",
  //       }}
  //     />
  //     <Box
  //       sx={{ display: "inline", p: small ? 0 : 2 }}
  //       onClick={() => setShowLess(!showLess)}
  //     >
  //       <Typography
  //         variant="body2"
  //         sx={{
  //           fontSize: small ? "80%" : { xs: "85%", sm: "100%" },
  //           lineHeight: small ? 1 : 2,
  //           display: "inline",
  //           color: "primary.main",
  //           cursor: "pointer",
  //           textDecoration: "underline",
  //         }}
  //       >
  //         {showLess ? "Read More" : "Show Less"}
  //       </Typography>
  //     </Box>
  //   </Box>
  // );
};

export default ReadMore;
