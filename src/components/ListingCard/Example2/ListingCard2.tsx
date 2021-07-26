import React, { FunctionComponent } from "react";
import PropTypes from "prop-types";

type ListingCard2Props = {
  propertyName: string;
  location: string;
  currency: string;
  price: string;
  amenity1: string;
  amenity2: string;
};

export const ListingCard2: FunctionComponent<ListingCardProps> = ({
  propertyName,
  location,
  currency = "$",
  price,
  amenity1,
  amenity2,
}) => (
  <>
    <div
      id="app"
      className="listing-card2 bg-white rounded-lg border border-gray-300 flex card text-grey-darkest md:m-2 max-w-screen-sm overflow-ellipsis overflow-hidden"
    >
      <img
        className="lg:w-36 w-24 rounded-l-lg shadow-inner object-cover"
        src="https://bit.ly/2EApSiC"
        alt="Room Image"
      />
      <div className="w-full flex flex-col">
        <div className="lg:px-4 px-2 py-2 flex-1">
          <h3 className="text-grey-darkest overflow-elliipsis">
            {propertyName}
          </h3>
          <div className="text-xs sm:text-sm  flex items-center lg:mb-4 mb-1 overflow-elliipsis">
            {location}
          </div>

          <div className="flex justify-between align-middle whitespace-nowrap overflow-elliipsis">
            <div>
              <div className="text-xs text-gray-600">{amenity1}</div>
              <div className="text-xs text-gray-600">{amenity2}</div>
            </div>
            <span className="self-end font-light lg:text-2xl text-sm text-gray-600 md:whitespace-nowrap whitespace-wrap text-right pt-1 lg:pt-0">
              <span className="lg:text-lg text-xs">{currency}</span>
              {price}
              <span className="lg:text-md text-xs hidden sm:inline">
                {" "}
                / night
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </>
);

ListingCard2.propTypes = {
  propertyName: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  amenity1: PropTypes.string,
  amenity2: PropTypes.string,
};
