/* eslint-disable */
import React from "react";

import { ListingCard3 } from "./components/ListingCard/Example3/ListingCard3";
const App = () => {
  return (
    <div className="App">
      <ListingCard3
        imageSrc="https://bit.ly/2EApSiC"
        propertyName="Hilton Tucson"
        location="6330 N Papaya Pl, Tucson AZ 85741"
        currency="$"
        price="100"
        amenity1="Dog park nearby"
        amenity2="Pet friendly patio"
      />
    </div>
  );
};

export default App;
