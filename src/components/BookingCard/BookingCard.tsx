import { FC, useState, useEffect } from "react";
import { CSSObject } from "@mui/material";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { RangeInput } from "@mui/lab/DateRangePicker/RangeTypes";
import Link from "@mui/material/Link";
import { RoomInfo } from "../../components/RoomCard/RoomCard";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { saveSearch } from "../../store/searchReducer";

interface Props {
  sx?: CSSObject;
  roomList: {
    value: number;
    description: string;
    room: RoomInfo;
  }[];
  goToRate?: () => void;
}

const BookingCard: FC<Props> = ({
  sx,
  roomList,
  goToRate,
}) => {
  const history = useHistory();
  const [roomType, setRoomType] = useState("0");

  // eslint-disable-next-line
  const dispatch: Dispatch<any> = useDispatch();

  const search = useSelector(
    // eslint-disable-next-line
    (state: any) => state.searchReducer.search,
    shallowEqual
  );

  const [checkDate] = useState<RangeInput<Date | null>>([
    search.checkIn ? search.checkIn : null,
    search.checkOut ? search.checkOut : null,
  ]);

  const [selectedRoom, setSelectedRoom] = useState<{
    value: number;
    description: string;
    room: RoomInfo;
  }>(roomList[0]);

  useEffect(() => {
    for (let i = 0; i < roomList.length; i++) {
      if (roomList[i].value === parseInt(roomType)) {
        setSelectedRoom(roomList[i]);
      }
    }
  }, [roomType]);

  useEffect(() => {
    if (
      checkDate[0] &&
      new Date(checkDate[0]) >=
        new Date(new Date().setDate(new Date().getDate() - 1)) &&
      checkDate[1] &&
      new Date(checkDate[1]) >= new Date()
    ) {
      dispatch(
        saveSearch({
          ...search,
          checkIn: checkDate[0] && new Date(checkDate[0]).toISOString(),
          checkOut: checkDate[1] && new Date(checkDate[1]).toISOString(),
        })
      );
    }
  }, [checkDate]);

  return (
    <Grid sx={{ width: "95%", ml: "auto" }}>
      <Box
        sx={{
          ...sx,
          borderRadius: 2,
          boxShadow: 0,
          p: ".25rem 0rem .25rem 2rem",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Link href="#rooms" sx={{ textDecoration: "none" }}>
              <Button
                disableElevation
                fullWidth
                variant="contained"
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: 600,
                  mb: "0rem",
                  display: { md: "flex", xs: "none" },
                }}
              >
                {" "}
                Reserve a room{" "}
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default BookingCard;
