import { FC } from "react";
import { CSSObject } from "@mui/material";
import Box from "@mui/material/Box";

interface Props {
  sx?: CSSObject;
}

const RomingoGuarantee: FC<Props> = ({ sx }) => {
  return (
    <Box
      component="img"
      src={"https://storage.googleapis.com/romingo-development-public/images/front-end/RomingoGuarantee1.svg"}
      alt="Logo"
      draggable="false"
      sx={{
        objectFit: "contain",
        overflow: "hidden",
        width: { xs: "200%", md: "100%" },
        maxWidth: { xs: "200%", md: "1050px" },
        ml: { xs: "-50%", md: 0 },
        ...sx,
      }}
    />
  );
};

export default RomingoGuarantee;
