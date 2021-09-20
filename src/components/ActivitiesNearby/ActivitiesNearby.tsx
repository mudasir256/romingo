import { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Check from "@mui/icons-material/Check";

interface Props {
  title: string;
  nearby: {
    name: string;
    distance: number;
  }[];
}

const ActivitiesNeary: FC<Props> = ({ title, nearby }) => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        color: "text.primary",
        borderRadius: 3,
        py: 0,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "secondary.main",
          mb: 1,
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
              }}
            >
              {item.name}({item.distance.toFixed(2)} mi)
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default ActivitiesNeary;
