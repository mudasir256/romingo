import { FC, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface Props {
  text: string;
  length: number;
  small?: boolean;
  capitalize?: boolean;
}

const ReadMore: FC<Props> = ({
  text,
  length,
  small = false,
  capitalize = false,
}) => {
  const [showLess, setShowLess] = useState(true);

  if (text.length < length) {
    return (
      <Typography
        variant="body2"
        sx={{
          lineHeight: small ? 1 : 2,
          display: "inline",
          my: 0,
          fontSize: small ? "80%" : "100%",
          textTransform: capitalize ? "uppercase" : "none",
        }}
      >
        {text}
      </Typography>
    );
  }

  return (
    <Box>
      <Typography
        variant="body2"
        dangerouslySetInnerHTML={{
          __html: showLess ? `${text.slice(0, length)}... ` : text + " ",
        }}
        sx={{
          lineHeight: small ? 1 : 2,
          display: "inline",
          textTransform: capitalize ? "uppercase" : "none",
          my: 0,
          fontSize: small ? "80%" : "100%",
        }}
      />
      <Box
        sx={{ display: "inline", py: small ? 0 : 2 }}
        onClick={() => setShowLess(!showLess)}
      >
        <Typography
          sx={{
            fontSize: small ? "80%" : { xs: "85%", sm: "100%" },
            lineHeight: 2,
            display: "inline",
            color: "primary.main",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          {showLess ? "Read More" : "Show Less"}
        </Typography>
      </Box>
    </Box>
  );
};

export default ReadMore;
