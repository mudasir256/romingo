import React, { FunctionComponent } from "react";
import PropTypes from "prop-types";

type ListingCardProps = {
  propertyName: string;
  location: string;
  currency: string;
  price: string;
  amenity1: string;
  amenity2: string;
};

export const ListingCard: FunctionComponent<ListingCardProps> = ({
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
      className="bg-white shadow-md flex card text-grey-darkest md:m-2 max-w-screen-sm"
    >
      <img
        className="lg:w-36 w-24 object-cover"
        src="https://bit.ly/2EApSiC"
        alt="Room Image"
      />
      <div className="w-full flex flex-col">
        <div className="lg:px-4 px-2 py-2 flex-1">
          <h3 className="font-light text-grey-darkest">{propertyName}</h3>
          <div className="text-xs sm:text-sm flex items-center lg:mb-2 mb-1 font-light text-gray-600">
            {location}
          </div>

          <div className="flex justify-between align-middle whitespace-nowrap overflow-ellipsis">
            <div>
              <div className="ml-1 text-xs text-gray-400">{amenity1}</div>
              <div className="ml-1 text-xs text-gray-400">{amenity2}</div>
            </div>
            <span className="self-end font-light lg:text-2xl text-sm text-gray-600 text-right pt-1 lg:pt-0">
              <span className="lg:text-lg text-xs">{currency}</span>
              <span className="">{price}</span>
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

ListingCard.propTypes = {
  propertyName: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  amenity1: PropTypes.string.isRequired,
  amenity2: PropTypes.string.isRequired,
};
