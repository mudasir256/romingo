import { FC, useState, MouseEventHandler, useEffect } from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";



const RedesignedSearchBar: FC = () => {

  const search = useSelector((state: any) => state.searchReducer.search);
  const cities = useSelector((state: any) => state.cityListReducer.cities);
  const [selectedCity, setSelectedCity] = useState(search.city ? search.city : null);


  const getCity = (cityId: string) => cities.filter((city: any) => city.id === cityId)[0];


  return (
    <Box sx={{
      height: '120px',
      background: 'white',
      borderRadius: '15px',
      border: '4px solid #009ca1',
      boxSizing: 'border-box',
      py: '2em',
      mx: 'auto',
      mt: '16em',
      position: 'relative',
      width: '95%',
      zIndex: 20,
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
      }}>

      </Box>
    </Box>
  );
};

export default RedesignedSearchBar;
