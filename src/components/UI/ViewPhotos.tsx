import { Button } from "@mui/material";

import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";


const ViewPhotos: FC<Props> = ({ onClick }) => {

  return(
    <Button
      variant="outlined"
      size="small"
      sx={{
        textTransform: "none",
        backgroundColor: "white",
        "&:hover": { backgroundColor: "#fff" },
      }}
      onClick={onClick}
    >
      <PhotoCameraIcon sx={{ fontSize: 15, mr: 0.5 }} />
      View Photos
    </Button>
  )
}


export default ViewPhotos;
