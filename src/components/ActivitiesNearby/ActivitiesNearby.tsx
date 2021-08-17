import { FC } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Check from "@material-ui/icons/Check";

interface Props {
  title: string;
  nearby: {
    text: string;
    distance: number;
  }[];
}

const ActivitiesNeary: FC<Props> = ({ title, nearby }) => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        color: "text.primary",
        borderRadius: 1,
        py: 0,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "secondary.main",
          fontWeight: "bold",
          mb: 1,
          fontSize: { xs: "85%", sm: "100%" },
        }}
      >
        {title}
      </Typography>
      {nearby.map((item, key) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "bottom",
              mt: 0.4,
            }}
            key={key}
          >
            <Check
              sx={{
                fontSize: 15,
                color: "primary.main",
                mt: 0.4,
              }}
            />
            <Typography
              variant="body1"
              sx={{
                mt: 0,
                color: "text.primary",
                textIndent: "-8px",
                paddingLeft: "8px",
                fontSize: { xs: "85%", sm: "100%" },
              }}
            >
              {item.text}({item.distance} mi)
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default ActivitiesNeary;
