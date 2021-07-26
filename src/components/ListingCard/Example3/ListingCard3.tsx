import React, { FunctionComponent } from "react";
import PropTypes from "prop-types";

type ListingCard3Props = {
  propertyName: string;
  location: string;
  currency: string;
  price: string;
  amenity1: string;
  amenity2: string;
};

export const ListingCard3: FunctionComponent<ListingCardProps> = ({
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
      className="bg-white shadow flex card text-grey-darkest md:m-2 max-w-screen-sm min-w-0"
      style={{ fontFamily: `"Montserrat", sans-serif` }}
    >
      <img
        className="lg:w-36 w-20 object-cover"
        src="https://bit.ly/2EApSiC"
        alt="Room Image"
      />
      <div className="flex flex-col flex-1 whitespace-nowrap overflow-ellipsis overflow-hidden ">
        <div className="lg:px-4 px-2 py-1 flex-1">
          <h3 className="" style={{ color: "#03989E" }}>
            {propertyName}
          </h3>
          <div className="text-xs sm:text-sm flex items-center lg:mb-2 mb-1 font-light text-gray-400">
            {location}
          </div>

          <div className="flex justify-between">
            <div>
              <div className="text-xs text-gray-500">{amenity1}</div>
              <div className="text-xs text-gray-500">{amenity2}</div>
            </div>
            <span className="lg:text-2xl text-sm text-gray-600 self-end text-right lg:pt-0">
              <span
                style={{ color: "#B097B7" }}
                className="font-light lg:text-lg text-xs"
              >
                {currency}
              </span>
              <span style={{ color: "#B097B7" }}>{price}</span>
              <span className="font-light lg:text-md text-xs"> / night</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </>
);

ListingCard3.propTypes = {
  propertyName: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  amenity1: PropTypes.string,
  amenity2: PropTypes.string,
};
