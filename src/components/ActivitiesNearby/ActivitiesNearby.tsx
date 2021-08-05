import React, { FC, useState, MouseEventHandler } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Check from "@material-ui/icons/Check";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTheme } from "@material-ui/core/styles";

interface Props {
  title: string;
  nearby: {
    text: string;
    distance: number;
  }[];
}

const ActivitiesNeary: FC<Props> = ({
  title,
  nearby,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        color: "text.primary",
        borderRadius: 1,
        pt: 2,
        pb: 2.5,
        mt: 1,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "secondary.main",
          fontWeight: "bold",
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
                mt: 0.4 
              }} 
            />
            <Typography
              variant="body1"
              sx={{
                fontWeight: "light",
                mt: 0,
                color: "text.primary",
                textIndent: "-8px",
                paddingLeft: "8px",
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
