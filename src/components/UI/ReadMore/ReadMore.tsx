import { FC } from "react";
import Typography from "@mui/material/Typography";

interface Props {
  text: string;
  justify?: boolean;
}

const ReadMore: FC<Props> = ({
  text,
  justify = false,
}) => {

  return (
    <Typography
      variant="base"
      component="h2"
      sx={{
        display: "inline",
        my: 0,
        textAlign: justify ? "justify" : "left",
      }}
    >
      {text}
    </Typography>
  );
};

export default ReadMore;
