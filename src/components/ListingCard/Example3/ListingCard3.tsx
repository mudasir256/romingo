import React, { FunctionComponent } from "react";
import PropTypes from "prop-types";

type ListingCard3Props = {
  imageSrc: string;
  propertyName: string;
  location: string;
  currency: string;
  price: string;
  amenity1: string;
  amenity2: string;
};

export const ListingCard3: FunctionComponent<ListingCard3Props> = ({
  imageSrc,
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
      className="bg-white shadow flex card text-grey-darkest md:m-2 min-w-0"
      style={{ fontFamily: `"Montserrat", sans-serif` }}
    >
      <img
        className="md:w-30 w-24 object-cover"
        src={imageSrc}
        alt="Room Image"
      />
      <div className="flex flex-col flex-1 mx-2 py-1 whitespace-nowrap overflow-ellipsis overflow-hidden ">
        <div>
          <div>
            <h3 className="" style={{ color: "#03989E" }}>
              {propertyName}
            </h3>
            <div className="text-xs sm:text-sm items-center font-light text-gray-400">
              {location}
            </div>
          </div>
          <div className="pt-3">
            <div>
              <div className="text-xs text-gray-500">{amenity1}</div>
              <div className="text-xs text-gray-500">{amenity2}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-0 mr-2 self-end">
        <div className="text-right">
          <span className="md:text-2xl text-sm text-gray-600">
            <span
              style={{ color: "#B097B7" }}
              className="font-light md:text-lg text-xs"
            >
              {currency}
            </span>
            <span style={{ color: "#B097B7" }}>{price}</span>
          </span>
        </div>
        <div className="text-right self-end -mt-3">
          <span className="font-light md:text-md text-xs"> / night</span>
        </div>
      </div>
    </div>
  </>
);

ListingCard3.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  propertyName: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  amenity1: PropTypes.string.isRequired,
  amenity2: PropTypes.string.isRequired,
};
