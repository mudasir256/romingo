import { FC, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

interface Props {
  text: string;
  length: number;
}

const ReadMore: FC<Props> = ({ text, length }) => {
  const [showLess, setShowLess] = useState(true);

  if (text.length < length) {
    return <p>{text}</p>;
  }

  return (
    <Box>
      <Typography
        variant="body1"
        dangerouslySetInnerHTML={{
          __html: showLess ? `${text.slice(0, length)}... ` : text + " ",
        }}
        sx={{
          lineHeight: 2,
          display: "inline",
          my: 0,
        }}
      />
      <Box
        sx={{ display: "inline", py: 2 }}
        onClick={() => setShowLess(!showLess)}
      >
        <Typography
          sx={{
            fontSize: { xs: "85%", sm: "100%" },
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
