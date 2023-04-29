import { withStyles } from "@material-ui/styles";
import { Box, Button, Grid, Link } from "@mui/material";
import { FC, useState } from "react";
import Navbar from "../../components/Navbar";
import ScrollToTop from "../../components/ScrollToTop";
import DetailsPageSkeleton from "./DetailsPageSkeleton";
import styles from "./DetailsPageStyles";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Hidden, Typography } from "@material-ui/core";
import RomingoScore from "../../components/RomingoScore";
import { Circle } from "@mui/icons-material";
import BookingCard from "../../components/BookingCard";

const DetailsPage1 = ({ ...props }) => {
  const classes = props.classes;
  const hotelName = 'pet-friendly-hotels-san-diego-manchester-grand-hyatt-san-diego';
  const data = [
    {
      "ContractId": 6322,
      "CreditCard": 0,
      "HotelId": 11862230,
      "PackageId": "551cb339-9f13-4613-a17b-6f7dd2d53175",
      "PackagePrice": {
        "Currency": "USD",
        "FinalPrice": 110.97,
        "FinalPriceInSupplierCurrency": 110.97,
        "FinalTax": 9.15,
        "OriginalPrice": 110.97,
        "OriginalPriceInSupplierCurrency": 110.97,
        "OriginalTax": 9.15,
        "SupplierCurrency": "USD",
        "TaxesAndFees": [
          {
            "Currency": "USD",
            "FeeTitle": "Taxes And Fees",
            "FrequencyType": "PerStay",
            "IsIncludedInPrice": true,
            "IsMandatory": true,
            "IsValuePercentage": false,
            "UnitType": "PerReservation",
            "Value": "9.15"
          }
        ]
      },
      "Refundability": 2,
      "Rooms": [
        {
          "AdultsCount": 1,
          "Availability": "Available",
          "Id": "69255b95-9ddd-478e-a80d-a1e35259c321",
          "KidsAges": [],
          "Price": {
            "Currency": "USD",
            "FinalPrice": 110.97,
            "FinalPriceInSupplierCurrency": 110.97,
            "FinalTax": 9.15,
            "OriginalPrice": 110.97,
            "OriginalPriceInSupplierCurrency": 110.97,
            "OriginalTax": 9.15,
            "SupplierCurrency": "USD",
            "TaxesAndFees": [
              {
                "Currency": "USD",
                "FeeTitle": "Taxes And Fees",
                "FrequencyType": "PerStay",
                "IsIncludedInPrice": true,
                "IsMandatory": true,
                "IsValuePercentage": false,
                "UnitType": "PerReservation",
                "Value": "9.15"
              }
            ]
          },
          "RoomBasis": "Room only RO",
          "RoomName": "Standard Double Room",
          "SpecialDeals": [
            "Private sale: save 5%"
          ],
          "TargetRoomKey": "CggzNjE3MDI5OBIyCgkyMTY2Mzk2NTMSCTI2NDE3MDg5ORoCMjQqCjIwMTktMDUtMjUyCjIwMTktMDUtMjgqAwoBMQ"
        }
      ],
      "SimplePrice": 110.97,
      "SupplierId": 1166,
      "SupplierName": "ExpediaSite"
    },
    {
      "ContractId": 6322,
      "CreditCard": 1,
      "HotelId": 11862230,
      "PackageId": "002b0367-9354-43f6-9870-e2909f2e12e0",
      "PackagePrice": {
        "Currency": "USD",
        "FinalPrice": 114.59,
        "FinalPriceInSupplierCurrency": 114.59,
        "FinalTax": 9.45,
        "OriginalPrice": 114.59,
        "OriginalPriceInSupplierCurrency": 114.59,
        "OriginalTax": 9.45,
        "PayOnArrivalFinal": 105.14,
        "PayOnArrivalOriginal": 105.14,
        "SupplierCurrency": "USD",
        "TaxesAndFees": [
          {
            "Currency": "USD",
            "FeeTitle": "Taxes And Fees",
            "FrequencyType": "PerStay",
            "IsIncludedInPrice": true,
            "IsMandatory": true,
            "IsValuePercentage": false,
            "UnitType": "PerReservation",
            "Value": "9.45"
          }
        ]
      },
      "Refundability": 2,
      "Rooms": [
        {
          "AdultsCount": 1,
          "Availability": "Available",
          "Id": "46723741-e0e2-4e9f-8a50-9ba0632e3775",
          "KidsAges": [],
          "Price": {
            "Currency": "USD",
            "FinalPrice": 114.59,
            "FinalPriceInSupplierCurrency": 114.59,
            "FinalTax": 9.45,
            "OriginalPrice": 114.59,
            "OriginalPriceInSupplierCurrency": 114.59,
            "OriginalTax": 9.45,
            "PayOnArrivalFinal": 105.14,
            "PayOnArrivalOriginal": 105.14,
            "SupplierCurrency": "USD",
            "TaxesAndFees": [
              {
                "Currency": "USD",
                "FeeTitle": "Taxes And Fees",
                "FrequencyType": "PerStay",
                "IsIncludedInPrice": true,
                "IsMandatory": true,
                "IsValuePercentage": false,
                "UnitType": "PerReservation",
                "Value": "9.45"
              }
            ]
          },
          "RoomBasis": "Room only RO",
          "RoomName": "Standard Double Room",
          "SpecialDeals": [
            "Private sale: save 5%"
          ],
          "TargetRoomKey": "CggzNjE3MDI5OBI0CgkyMTY2Mzk2NTMSCTI2NDE3MDg5ORoCMjQgASoKMjAxOS0wNS0yNTIKMjAxOS0wNS0yOCoDCgEx"
        }
      ],
      "SimplePrice": 114.59,
      "SupplierId": 1166,
      "SupplierName": "ExpediaSite"
    },
    {
      "ContractId": 6322,
      "CreditCard": 0,
      "HotelId": 11862230,
      "PackageId": "ccc975f3-a1a5-492f-aea7-25d5ef3770c2",
      "PackagePrice": {
        "Currency": "USD",
        "FinalPrice": 123.33,
        "FinalPriceInSupplierCurrency": 123.33,
        "FinalTax": 10.2,
        "OriginalPrice": 123.33,
        "OriginalPriceInSupplierCurrency": 123.33,
        "OriginalTax": 10.2,
        "SupplierCurrency": "USD",
        "TaxesAndFees": [
          {
            "Currency": "USD",
            "FeeTitle": "Taxes And Fees",
            "FrequencyType": "PerStay",
            "IsIncludedInPrice": true,
            "IsMandatory": true,
            "IsValuePercentage": false,
            "UnitType": "PerReservation",
            "Value": "10.2"
          }
        ]
      },
      "Refundability": 2,
      "Rooms": [
        {
          "AdultsCount": 1,
          "Availability": "Available",
          "Id": "56fb6ba2-4b3d-40b8-982d-02963bb34fd5",
          "KidsAges": [],
          "Price": {
            "Currency": "USD",
            "FinalPrice": 123.33,
            "FinalPriceInSupplierCurrency": 123.33,
            "FinalTax": 10.2,
            "OriginalPrice": 123.33,
            "OriginalPriceInSupplierCurrency": 123.33,
            "OriginalTax": 10.2,
            "SupplierCurrency": "USD",
            "TaxesAndFees": [
              {
                "Currency": "USD",
                "FeeTitle": "Taxes And Fees",
                "FrequencyType": "PerStay",
                "IsIncludedInPrice": true,
                "IsMandatory": true,
                "IsValuePercentage": false,
                "UnitType": "PerReservation",
                "Value": "10.2"
              }
            ]
          },
          "RoomBasis": "Room only RO",
          "RoomName": "Standard Triple Occupancy: Triple",
          "SpecialDeals": [
            "Private sale: save 5%"
          ],
          "TargetRoomKey": "CggzNjE3MDI5OBIyCgkyMTY2Mzk2NTUSCTI2NDE3MDkwMhoCMjQqCjIwMTktMDUtMjUyCjIwMTktMDUtMjgqAwoBMQ"
        }
      ],
      "SimplePrice": 123.33,
      "SupplierId": 1166,
      "SupplierName": "ExpediaSite"
    },
    {
      "BookUrl": "https://www.travelnow.com/templates/454770/hotels/1988690/book?lang=en&currency=USD&standardCheckin=5/25/2019&standardCheckout=5/28/2019&selectedPrice=125.22&supplierType=E&rateCode=264170899&roomTypeCode=216639653&roomsCount=1&rooms[0].adultsCount=1",
      "ContractId": 3074,
      "HotelId": 11862230,
      "PackageId": "175298b6-b525-47ac-bf76-beda19e2e7ec",
      "PackagePrice": {
        "Currency": "USD",
        "FinalPrice": 125.22,
        "FinalPriceInSupplierCurrency": 125.22,
        "FinalTax": 14.55,
        "OriginalPrice": 125.22,
        "OriginalPriceInSupplierCurrency": 125.22,
        "OriginalTax": 14.55,
        "SupplierCurrency": "USD",
        "TaxesAndFees": [
          {
            "Currency": "USD",
            "FeeTitle": "TaxAndServiceFee",
            "FrequencyType": "PerStay",
            "IsIncludedInPrice": true,
            "IsMandatory": true,
            "UnitType": "PerStay",
            "Value": "14.55"
          }
        ]
      },
      "Refundability": 2,
      "Rooms": [
        {
          "AdultsCount": 1,
          "Availability": "Available",
          "BedType": "Twin",
          "Id": "6788fe3b-10eb-4852-9215-df10bd358338",
          "KidsAges": [],
          "Price": {
            "Currency": "USD",
            "FinalPrice": 125.22,
            "FinalPriceInSupplierCurrency": 125.22,
            "FinalTax": 14.55,
            "OriginalPrice": 125.22,
            "OriginalPriceInSupplierCurrency": 125.22,
            "OriginalTax": 14.55,
            "SupplierCurrency": "USD",
            "TaxesAndFees": [
              {
                "Currency": "USD",
                "FeeTitle": "TaxAndServiceFee",
                "FrequencyType": "PerStay",
                "IsIncludedInPrice": true,
                "IsMandatory": true,
                "UnitType": "PerStay",
                "Value": "14.55"
              }
            ]
          },
          "RoomBasis": "Room only RO",
          "RoomName": "Standard Double Room With Twin Bed"
        }
      ],
      "SimplePrice": 125.22,
      "SupplierId": 51,
      "SupplierName": "ExpediaPackage"
    },
    {
      "ContractId": 6322,
      "CreditCard": 1,
      "HotelId": 11862230,
      "PackageId": "720645bb-dd98-4f44-8e21-a25696725d89",
      "PackagePrice": {
        "Currency": "USD",
        "FinalPrice": 127.35,
        "FinalPriceInSupplierCurrency": 127.35,
        "FinalTax": 10.52,
        "OriginalPrice": 127.35,
        "OriginalPriceInSupplierCurrency": 127.35,
        "OriginalTax": 10.52,
        "PayOnArrivalFinal": 116.83,
        "PayOnArrivalOriginal": 116.83,
        "SupplierCurrency": "USD",
        "TaxesAndFees": [
          {
            "Currency": "USD",
            "FeeTitle": "Taxes And Fees",
            "FrequencyType": "PerStay",
            "IsIncludedInPrice": true,
            "IsMandatory": true,
            "IsValuePercentage": false,
            "UnitType": "PerReservation",
            "Value": "10.52"
          }
        ]
      },
      "Refundability": 2,
      "Rooms": [
        {
          "AdultsCount": 1,
          "Availability": "Available",
          "Id": "f0bf1604-8baa-4a16-80f6-4afb4bcd356c",
          "KidsAges": [],
          "Price": {
            "Currency": "USD",
            "FinalPrice": 127.35,
            "FinalPriceInSupplierCurrency": 127.35,
            "FinalTax": 10.52,
            "OriginalPrice": 127.35,
            "OriginalPriceInSupplierCurrency": 127.35,
            "OriginalTax": 10.52,
            "PayOnArrivalFinal": 116.83,
            "PayOnArrivalOriginal": 116.83,
            "SupplierCurrency": "USD",
            "TaxesAndFees": [
              {
                "Currency": "USD",
                "FeeTitle": "Taxes And Fees",
                "FrequencyType": "PerStay",
                "IsIncludedInPrice": true,
                "IsMandatory": true,
                "IsValuePercentage": false,
                "UnitType": "PerReservation",
                "Value": "10.52"
              }
            ]
          },
          "RoomBasis": "Room only RO",
          "RoomName": "Standard Triple Occupancy: Triple",
          "SpecialDeals": [
            "Private sale: save 5%"
          ],
          "TargetRoomKey": "CggzNjE3MDI5OBI0CgkyMTY2Mzk2NTUSCTI2NDE3MDkwMhoCMjQgASoKMjAxOS0wNS0yNTIKMjAxOS0wNS0yOCoDCgEx"
        }
      ],
      "SimplePrice": 127.35,
      "SupplierId": 1166,
      "SupplierName": "ExpediaSite"
    },
    {
      "BookUrl": "https://www.travelnow.com/templates/454770/hotels/1988690/book?lang=en&currency=USD&standardCheckin=5/25/2019&standardCheckout=5/28/2019&selectedPrice=139.14&supplierType=E&rateCode=264170902&roomTypeCode=216639655&roomsCount=1&rooms[0].adultsCount=1",
      "ContractId": 3074,
      "HotelId": 11862230,
      "PackageId": "31ee7dae-f590-4271-978c-78ae7d28b99f",
      "PackagePrice": {
        "Currency": "USD",
        "FinalPrice": 139.14,
        "FinalPriceInSupplierCurrency": 139.14,
        "FinalTax": 16.17,
        "OriginalPrice": 139.14,
        "OriginalPriceInSupplierCurrency": 139.14,
        "OriginalTax": 16.17,
        "SupplierCurrency": "USD",
        "TaxesAndFees": [
          {
            "Currency": "USD",
            "FeeTitle": "TaxAndServiceFee",
            "FrequencyType": "PerStay",
            "IsIncludedInPrice": true,
            "IsMandatory": true,
            "UnitType": "PerStay",
            "Value": "16.17"
          }
        ]
      },
      "Refundability": 2,
      "Rooms": [
        {
          "AdultsCount": 1,
          "Availability": "Available",
          "BedType": "3 Single",
          "Id": "0a068118-b211-4106-acc5-05dc2f68126a",
          "KidsAges": [],
          "Price": {
            "Currency": "USD",
            "FinalPrice": 139.14,
            "FinalPriceInSupplierCurrency": 139.14,
            "FinalTax": 16.17,
            "OriginalPrice": 139.14,
            "OriginalPriceInSupplierCurrency": 139.14,
            "OriginalTax": 16.17,
            "SupplierCurrency": "USD",
            "TaxesAndFees": [
              {
                "Currency": "USD",
                "FeeTitle": "TaxAndServiceFee",
                "FrequencyType": "PerStay",
                "IsIncludedInPrice": true,
                "IsMandatory": true,
                "UnitType": "PerStay",
                "Value": "16.17"
              }
            ]
          },
          "RoomBasis": "Room only RO",
          "RoomName": "Standard Triple With 3 Single Bed Occupancy: Triple"
        }
      ],
      "SimplePrice": 139.14,
      "SupplierId": 51,
      "SupplierName": "ExpediaPackage"
    },
    {
      "ContractId": 6322,
      "CreditCard": 0,
      "HotelId": 11862230,
      "PackageId": "de4f6bf1-99df-4ee2-9742-a117d8b5ac52",
      "PackagePrice": {
        "Currency": "USD",
        "FinalPrice": 140.37,
        "FinalPriceInSupplierCurrency": 140.37,
        "FinalTax": 11.58,
        "OriginalPrice": 140.37,
        "OriginalPriceInSupplierCurrency": 140.37,
        "OriginalTax": 11.58,
        "SupplierCurrency": "USD",
        "TaxesAndFees": [
          {
            "Currency": "USD",
            "FeeTitle": "Taxes And Fees",
            "FrequencyType": "PerStay",
            "IsIncludedInPrice": true,
            "IsMandatory": true,
            "IsValuePercentage": false,
            "UnitType": "PerReservation",
            "Value": "11.58"
          }
        ]
      },
      "Refundability": 2,
      "Rooms": [
        {
          "AdultsCount": 1,
          "Availability": "Available",
          "Id": "dc425866-9779-4dab-9cb5-482cde53574e",
          "KidsAges": [],
          "Price": {
            "Currency": "USD",
            "FinalPrice": 140.37,
            "FinalPriceInSupplierCurrency": 140.37,
            "FinalTax": 11.58,
            "OriginalPrice": 140.37,
            "OriginalPriceInSupplierCurrency": 140.37,
            "OriginalTax": 11.58,
            "SupplierCurrency": "USD",
            "TaxesAndFees": [
              {
                "Currency": "USD",
                "FeeTitle": "Taxes And Fees",
                "FrequencyType": "PerStay",
                "IsIncludedInPrice": true,
                "IsMandatory": true,
                "IsValuePercentage": false,
                "UnitType": "PerReservation",
                "Value": "11.58"
              }
            ]
          },
          "RoomBasis": "Bed and Breakfast BB",
          "RoomName": "Standard Double Room",
          "TargetRoomKey": "CggzNjE3MDI5OBIyCgkyMTY2Mzk2NTMSCTI2NDE3MTgyNhoCMjQqCjIwMTktMDUtMjUyCjIwMTktMDUtMjgqAwoBMQ"
        }
      ],
      "SimplePrice": 140.37,
      "SupplierId": 1166,
      "SupplierName": "ExpediaSite"
    },
    {
      "ContractId": 6322,
      "CreditCard": 1,
      "HotelId": 11862230,
      "PackageId": "5cfb8ee4-7180-4ca2-b154-2cf6390c7586",
      "PackagePrice": {
        "Currency": "USD",
        "FinalPrice": 144.71,
        "FinalPriceInSupplierCurrency": 144.71,
        "FinalTax": 11.93,
        "OriginalPrice": 144.71,
        "OriginalPriceInSupplierCurrency": 144.71,
        "OriginalTax": 11.93,
        "PayOnArrivalFinal": 132.78,
        "PayOnArrivalOriginal": 132.78,
        "SupplierCurrency": "USD",
        "TaxesAndFees": [
          {
            "Currency": "USD",
            "FeeTitle": "Taxes And Fees",
            "FrequencyType": "PerStay",
            "IsIncludedInPrice": true,
            "IsMandatory": true,
            "IsValuePercentage": false,
            "UnitType": "PerReservation",
            "Value": "11.93"
          }
        ]
      },
      "Refundability": 2,
      "Rooms": [
        {
          "AdultsCount": 1,
          "Availability": "Available",
          "Id": "2ee4593e-43cd-4c7a-b9a7-bb2acabc5820",
          "KidsAges": [],
          "Price": {
            "Currency": "USD",
            "FinalPrice": 144.71,
            "FinalPriceInSupplierCurrency": 144.71,
            "FinalTax": 11.93,
            "OriginalPrice": 144.71,
            "OriginalPriceInSupplierCurrency": 144.71,
            "OriginalTax": 11.93,
            "PayOnArrivalFinal": 132.78,
            "PayOnArrivalOriginal": 132.78,
            "SupplierCurrency": "USD",
            "TaxesAndFees": [
              {
                "Currency": "USD",
                "FeeTitle": "Taxes And Fees",
                "FrequencyType": "PerStay",
                "IsIncludedInPrice": true,
                "IsMandatory": true,
                "IsValuePercentage": false,
                "UnitType": "PerReservation",
                "Value": "11.93"
              }
            ]
          },
          "RoomBasis": "Bed and Breakfast BB",
          "RoomName": "Standard Double Room",
          "TargetRoomKey": "CggzNjE3MDI5OBI0CgkyMTY2Mzk2NTMSCTI2NDE3MTgyNhoCMjQgASoKMjAxOS0wNS0yNTIKMjAxOS0wNS0yOCoDCgEx"
        }
      ],
      "SimplePrice": 144.71,
      "SupplierId": 1166,
      "SupplierName": "ExpediaSite"
    },
    {
      "ContractId": 6322,
      "CreditCard": 0,
      "HotelId": 11862230,
      "PackageId": "7ad7c320-c5e5-4e24-bf17-0eb57192fd27",
      "PackagePrice": {
        "Currency": "USD",
        "FinalPrice": 147.96,
        "FinalPriceInSupplierCurrency": 147.96,
        "FinalTax": 12.24,
        "OriginalPrice": 147.96,
        "OriginalPriceInSupplierCurrency": 147.96,
        "OriginalTax": 12.24,
        "SupplierCurrency": "USD",
        "TaxesAndFees": [
          {
            "Currency": "USD",
            "FeeTitle": "Taxes And Fees",
            "FrequencyType": "PerStay",
            "IsIncludedInPrice": true,
            "IsMandatory": true,
            "IsValuePercentage": false,
            "UnitType": "PerReservation",
            "Value": "12.24"
          }
        ]
      },
      "Refundability": 2,
      "Rooms": [
        {
          "AdultsCount": 1,
          "Availability": "Available",
          "Id": "bfbe0845-65e8-4f40-b509-0dabb4bbc533",
          "KidsAges": [],
          "Price": {
            "Currency": "USD",
            "FinalPrice": 147.96,
            "FinalPriceInSupplierCurrency": 147.96,
            "FinalTax": 12.24,
            "OriginalPrice": 147.96,
            "OriginalPriceInSupplierCurrency": 147.96,
            "OriginalTax": 12.24,
            "SupplierCurrency": "USD",
            "TaxesAndFees": [
              {
                "Currency": "USD",
                "FeeTitle": "Taxes And Fees",
                "FrequencyType": "PerStay",
                "IsIncludedInPrice": true,
                "IsMandatory": true,
                "IsValuePercentage": false,
                "UnitType": "PerReservation",
                "Value": "12.24"
              }
            ]
          },
          "RoomBasis": "Room only RO",
          "RoomName": "Standard Quadruple Occupancy: Quadruple",
          "SpecialDeals": [
            "Private sale: save 5%"
          ],
          "TargetRoomKey": "CggzNjE3MDI5OBIyCgkyMTY2Mzk2NTcSCTI2NDE3MDkwORoCMjQqCjIwMTktMDUtMjUyCjIwMTktMDUtMjgqAwoBMQ"
        }
      ],
      "SimplePrice": 147.96,
      "SupplierId": 1166,
      "SupplierName": "ExpediaSite"
    },
    {
      "BookUrl": "https://www.travelnow.com/templates/454770/hotels/1988690/book?lang=en&currency=USD&standardCheckin=5/25/2019&standardCheckout=5/28/2019&selectedPrice=150.21&supplierType=E&rateCode=264171826&roomTypeCode=216639653&roomsCount=1&rooms[0].adultsCount=1",
      "ContractId": 3074,
      "HotelId": 11862230,
      "PackageId": "19409490-978e-4e40-9a42-4ac7275e0bcc",
      "PackagePrice": {
        "Currency": "USD",
        "FinalPrice": 150.21,
        "FinalPriceInSupplierCurrency": 150.21,
        "FinalTax": 17.43,
        "OriginalPrice": 150.21,
        "OriginalPriceInSupplierCurrency": 150.21,
        "OriginalTax": 17.43,
        "SupplierCurrency": "USD",
        "TaxesAndFees": [
          {
            "Currency": "USD",
            "FeeTitle": "TaxAndServiceFee",
            "FrequencyType": "PerStay",
            "IsIncludedInPrice": true,
            "IsMandatory": true,
            "UnitType": "PerStay",
            "Value": "17.43"
          }
        ]
      },
      "Refundability": 2,
      "Rooms": [
        {
          "AdultsCount": 1,
          "Availability": "Available",
          "BedType": "Twin",
          "Id": "3c0757e9-f518-41ff-a6ac-1c0c829b1b2c",
          "KidsAges": [],
          "Price": {
            "Currency": "USD",
            "FinalPrice": 150.21,
            "FinalPriceInSupplierCurrency": 150.21,
            "FinalTax": 17.43,
            "OriginalPrice": 150.21,
            "OriginalPriceInSupplierCurrency": 150.21,
            "OriginalTax": 17.43,
            "SupplierCurrency": "USD",
            "TaxesAndFees": [
              {
                "Currency": "USD",
                "FeeTitle": "TaxAndServiceFee",
                "FrequencyType": "PerStay",
                "IsIncludedInPrice": true,
                "IsMandatory": true,
                "UnitType": "PerStay",
                "Value": "17.43"
              }
            ]
          },
          "RoomBasis": "Bed and Breakfast BB",
          "RoomName": "Standard Double Room With Twin Bed"
        }
      ],
      "SimplePrice": 150.21,
      "SupplierId": 51,
      "SupplierName": "ExpediaPackage"
    },
    {
      "ContractId": 6322,
      "CreditCard": 1,
      "HotelId": 11862230,
      "PackageId": "d34a1289-9888-4475-a21a-a98b0c821913",
      "PackagePrice": {
        "Currency": "USD",
        "FinalPrice": 152.78,
        "FinalPriceInSupplierCurrency": 152.78,
        "FinalTax": 12.6,
        "OriginalPrice": 152.78,
        "OriginalPriceInSupplierCurrency": 152.78,
        "OriginalTax": 12.6,
        "PayOnArrivalFinal": 140.18,
        "PayOnArrivalOriginal": 140.18,
        "SupplierCurrency": "USD",
        "TaxesAndFees": [
          {
            "Currency": "USD",
            "FeeTitle": "Taxes And Fees",
            "FrequencyType": "PerStay",
            "IsIncludedInPrice": true,
            "IsMandatory": true,
            "IsValuePercentage": false,
            "UnitType": "PerReservation",
            "Value": "12.6"
          }
        ]
      },
      "Refundability": 2,
      "Rooms": [
        {
          "AdultsCount": 1,
          "Availability": "Available",
          "Id": "3fb7107b-1859-4cae-a573-dad939d30440",
          "KidsAges": [],
          "Price": {
            "Currency": "USD",
            "FinalPrice": 152.78,
            "FinalPriceInSupplierCurrency": 152.78,
            "FinalTax": 12.6,
            "OriginalPrice": 152.78,
            "OriginalPriceInSupplierCurrency": 152.78,
            "OriginalTax": 12.6,
            "PayOnArrivalFinal": 140.18,
            "PayOnArrivalOriginal": 140.18,
            "SupplierCurrency": "USD",
            "TaxesAndFees": [
              {
                "Currency": "USD",
                "FeeTitle": "Taxes And Fees",
                "FrequencyType": "PerStay",
                "IsIncludedInPrice": true,
                "IsMandatory": true,
                "IsValuePercentage": false,
                "UnitType": "PerReservation",
                "Value": "12.6"
              }
            ]
          },
          "RoomBasis": "Room only RO",
          "RoomName": "Standard Quadruple Occupancy: Quadruple",
          "SpecialDeals": [
            "Private sale: save 5%"
          ],
          "TargetRoomKey": "CggzNjE3MDI5OBI0CgkyMTY2Mzk2NTcSCTI2NDE3MDkwORoCMjQgASoKMjAxOS0wNS0yNTIKMjAxOS0wNS0yOCoDCgEx"
        }
      ],
      "SimplePrice": 152.78,
      "SupplierId": 1166,
      "SupplierName": "ExpediaSite"
    },
    {
      "ContractId": 6322,
      "CreditCard": 0,
      "HotelId": 11862230,
      "PackageId": "c182a77d-efa7-4db2-b8e2-dc1bc81f4e19",
      "PackagePrice": {
        "Currency": "USD",
        "FinalPrice": 155.97,
        "FinalPriceInSupplierCurrency": 155.97,
        "FinalTax": 12.87,
        "OriginalPrice": 155.97,
        "OriginalPriceInSupplierCurrency": 155.97,
        "OriginalTax": 12.87,
        "SupplierCurrency": "USD",
        "TaxesAndFees": [
          {
            "Currency": "USD",
            "FeeTitle": "Taxes And Fees",
            "FrequencyType": "PerStay",
            "IsIncludedInPrice": true,
            "IsMandatory": true,
            "IsValuePercentage": false,
            "UnitType": "PerReservation",
            "Value": "12.87"
          }
        ]
      },
      "Refundability": 2,
      "Rooms": [
        {
          "AdultsCount": 1,
          "Availability": "Available",
          "Id": "8bd39bd9-e962-4e78-94d9-c8ae90920d3e",
          "KidsAges": [],
          "Price": {
            "Currency": "USD",
            "FinalPrice": 155.97,
            "FinalPriceInSupplierCurrency": 155.97,
            "FinalTax": 12.87,
            "OriginalPrice": 155.97,
            "OriginalPriceInSupplierCurrency": 155.97,
            "OriginalTax": 12.87,
            "SupplierCurrency": "USD",
            "TaxesAndFees": [
              {
                "Currency": "USD",
                "FeeTitle": "Taxes And Fees",
                "FrequencyType": "PerStay",
                "IsIncludedInPrice": true,
                "IsMandatory": true,
                "IsValuePercentage": false,
                "UnitType": "PerReservation",
                "Value": "12.87"
              }
            ]
          },
          "RoomBasis": "Bed and Breakfast BB",
          "RoomName": "Standard Triple Occupancy: Triple",
          "TargetRoomKey": "CggzNjE3MDI5OBIyCgkyMTY2Mzk2NTUSCTI2NDE3MTgyNxoCMjQqCjIwMTktMDUtMjUyCjIwMTktMDUtMjgqAwoBMQ"
        }
      ],
      "SimplePrice": 155.97,
      "SupplierId": 1166,
      "SupplierName": "ExpediaSite"
    },
    {
      "ContractId": 6322,
      "CreditCard": 1,
      "HotelId": 11862230,
      "PackageId": "f02f0347-f816-4eec-970b-e3e0ed960cb4",
      "PackagePrice": {
        "Currency": "USD",
        "FinalPrice": 160.82,
        "FinalPriceInSupplierCurrency": 160.82,
        "FinalTax": 13.27,
        "OriginalPrice": 160.82,
        "OriginalPriceInSupplierCurrency": 160.82,
        "OriginalTax": 13.27,
        "PayOnArrivalFinal": 147.55,
        "PayOnArrivalOriginal": 147.55,
        "SupplierCurrency": "USD",
        "TaxesAndFees": [
          {
            "Currency": "USD",
            "FeeTitle": "Taxes And Fees",
            "FrequencyType": "PerStay",
            "IsIncludedInPrice": true,
            "IsMandatory": true,
            "IsValuePercentage": false,
            "UnitType": "PerReservation",
            "Value": "13.27"
          }
        ]
      },
      "Refundability": 2,
      "Rooms": [
        {
          "AdultsCount": 1,
          "Availability": "Available",
          "Id": "2f603a57-0f45-4d53-8f85-68afb5d493be",
          "KidsAges": [],
          "Price": {
            "Currency": "USD",
            "FinalPrice": 160.82,
            "FinalPriceInSupplierCurrency": 160.82,
            "FinalTax": 13.27,
            "OriginalPrice": 160.82,
            "OriginalPriceInSupplierCurrency": 160.82,
            "OriginalTax": 13.27,
            "PayOnArrivalFinal": 147.55,
            "PayOnArrivalOriginal": 147.55,
            "SupplierCurrency": "USD",
            "TaxesAndFees": [
              {
                "Currency": "USD",
                "FeeTitle": "Taxes And Fees",
                "FrequencyType": "PerStay",
                "IsIncludedInPrice": true,
                "IsMandatory": true,
                "IsValuePercentage": false,
                "UnitType": "PerReservation",
                "Value": "13.27"
              }
            ]
          },
          "RoomBasis": "Bed and Breakfast BB",
          "RoomName": "Standard Triple Occupancy: Triple",
          "TargetRoomKey": "CggzNjE3MDI5OBI0CgkyMTY2Mzk2NTUSCTI2NDE3MTgyNxoCMjQgASoKMjAxOS0wNS0yNTIKMjAxOS0wNS0yOCoDCgEx"
        }
      ],
      "SimplePrice": 160.82,
      "SupplierId": 1166,
      "SupplierName": "ExpediaSite"
    },
    {
      "BookUrl": "https://www.travelnow.com/templates/454770/hotels/1988690/book?lang=en&currency=USD&standardCheckin=5/25/2019&standardCheckout=5/28/2019&selectedPrice=166.95&supplierType=E&rateCode=264170909&roomTypeCode=216639657&roomsCount=1&rooms[0].adultsCount=1",
      "ContractId": 3074,
      "HotelId": 11862230,
      "PackageId": "66001012-676d-4398-8987-9b4ffdf51553",
      "PackagePrice": {
        "Currency": "USD",
        "FinalPrice": 166.95,
        "FinalPriceInSupplierCurrency": 166.95,
        "FinalTax": 19.41,
        "OriginalPrice": 166.95,
        "OriginalPriceInSupplierCurrency": 166.95,
        "OriginalTax": 19.41,
        "SupplierCurrency": "USD",
        "TaxesAndFees": [
          {
            "Currency": "USD",
            "FeeTitle": "TaxAndServiceFee",
            "FrequencyType": "PerStay",
            "IsIncludedInPrice": true,
            "IsMandatory": true,
            "UnitType": "PerStay",
            "Value": "19.41"
          }
        ]
      },
      "Refundability": 2,
      "Rooms": [
        {
          "AdultsCount": 1,
          "Availability": "Available",
          "BedType": "4 Twin",
          "Id": "3d780fca-6f58-4c4a-84be-a8181ad2cdad",
          "KidsAges": [],
          "Price": {
            "Currency": "USD",
            "FinalPrice": 166.95,
            "FinalPriceInSupplierCurrency": 166.95,
            "FinalTax": 19.41,
            "OriginalPrice": 166.95,
            "OriginalPriceInSupplierCurrency": 166.95,
            "OriginalTax": 19.41,
            "SupplierCurrency": "USD",
            "TaxesAndFees": [
              {
                "Currency": "USD",
                "FeeTitle": "TaxAndServiceFee",
                "FrequencyType": "PerStay",
                "IsIncludedInPrice": true,
                "IsMandatory": true,
                "UnitType": "PerStay",
                "Value": "19.41"
              }
            ]
          },
          "RoomBasis": "Room only RO",
          "RoomName": "Standard Quadruple With 4 Twin Bed Occupancy: Quadruple"
        }
      ],
      "SimplePrice": 166.95,
      "SupplierId": 51,
      "SupplierName": "ExpediaPackage"
    },
    {
      "BookUrl": "https://www.travelnow.com/templates/454770/hotels/1988690/book?lang=en&currency=USD&standardCheckin=5/25/2019&standardCheckout=5/28/2019&selectedPrice=166.95&supplierType=E&rateCode=264171827&roomTypeCode=216639655&roomsCount=1&rooms[0].adultsCount=1",
      "ContractId": 3074,
      "HotelId": 11862230,
      "PackageId": "904cc5d1-369c-4734-a7c1-7e6597614301",
      "PackagePrice": {
        "Currency": "USD",
        "FinalPrice": 166.95,
        "FinalPriceInSupplierCurrency": 166.95,
        "FinalTax": 19.41,
        "OriginalPrice": 166.95,
        "OriginalPriceInSupplierCurrency": 166.95,
        "OriginalTax": 19.41,
        "SupplierCurrency": "USD",
        "TaxesAndFees": [
          {
            "Currency": "USD",
            "FeeTitle": "TaxAndServiceFee",
            "FrequencyType": "PerStay",
            "IsIncludedInPrice": true,
            "IsMandatory": true,
            "UnitType": "PerStay",
            "Value": "19.41"
          }
        ]
      },
      "Refundability": 2,
      "Rooms": [
        {
          "AdultsCount": 1,
          "Availability": "Available",
          "BedType": "3 Single",
          "Id": "7ee5348c-f462-4c1f-85ef-009eb5ea594c",
          "KidsAges": [],
          "Price": {
            "Currency": "USD",
            "FinalPrice": 166.95,
            "FinalPriceInSupplierCurrency": 166.95,
            "FinalTax": 19.41,
            "OriginalPrice": 166.95,
            "OriginalPriceInSupplierCurrency": 166.95,
            "OriginalTax": 19.41,
            "SupplierCurrency": "USD",
            "TaxesAndFees": [
              {
                "Currency": "USD",
                "FeeTitle": "TaxAndServiceFee",
                "FrequencyType": "PerStay",
                "IsIncludedInPrice": true,
                "IsMandatory": true,
                "UnitType": "PerStay",
                "Value": "19.41"
              }
            ]
          },
          "RoomBasis": "Bed and Breakfast BB",
          "RoomName": "Standard Triple With 3 Single Bed Occupancy: Triple"
        }
      ],
      "SimplePrice": 166.95,
      "SupplierId": 51,
      "SupplierName": "ExpediaPackage"
    },
    {
      "ContractId": 6322,
      "CreditCard": 0,
      "HotelId": 11862230,
      "PackageId": "9e080dbf-b6ea-47e3-b1ee-922bdc3f0213",
      "PackagePrice": {
        "Currency": "USD",
        "FinalPrice": 169.68,
        "FinalPriceInSupplierCurrency": 169.68,
        "FinalTax": 14.04,
        "OriginalPrice": 169.68,
        "OriginalPriceInSupplierCurrency": 169.68,
        "OriginalTax": 14.04,
        "SupplierCurrency": "USD",
        "TaxesAndFees": [
          {
            "Currency": "USD",
            "FeeTitle": "Taxes And Fees",
            "FrequencyType": "PerStay",
            "IsIncludedInPrice": true,
            "IsMandatory": true,
            "IsValuePercentage": false,
            "UnitType": "PerReservation",
            "Value": "14.04"
          }
        ]
      },
      "Refundability": 2,
      "Rooms": [
        {
          "AdultsCount": 1,
          "Availability": "Available",
          "Id": "4a49f840-48dc-4ea8-953f-41ec7c044329",
          "KidsAges": [],
          "Price": {
            "Currency": "USD",
            "FinalPrice": 169.68,
            "FinalPriceInSupplierCurrency": 169.68,
            "FinalTax": 14.04,
            "OriginalPrice": 169.68,
            "OriginalPriceInSupplierCurrency": 169.68,
            "OriginalTax": 14.04,
            "SupplierCurrency": "USD",
            "TaxesAndFees": [
              {
                "Currency": "USD",
                "FeeTitle": "Taxes And Fees",
                "FrequencyType": "PerStay",
                "IsIncludedInPrice": true,
                "IsMandatory": true,
                "IsValuePercentage": false,
                "UnitType": "PerReservation",
                "Value": "14.04"
              }
            ]
          },
          "RoomBasis": "Half board HB",
          "RoomName": "Standard Double Room",
          "TargetRoomKey": "CggzNjE3MDI5OBIyCgkyMTY2Mzk2NTMSCTI2NDE3MTg0OBoCMjQqCjIwMTktMDUtMjUyCjIwMTktMDUtMjgqAwoBMQ"
        }
      ],
      "SimplePrice": 169.68,
      "SupplierId": 1166,
      "SupplierName": "ExpediaSite"
    },
    {
      "ContractId": 6322,
      "CreditCard": 1,
      "HotelId": 11862230,
      "PackageId": "c4b33c16-990b-4dc2-b27f-a6630020edee",
      "PackagePrice": {
        "Currency": "USD",
        "FinalPrice": 174.93,
        "FinalPriceInSupplierCurrency": 174.93,
        "FinalTax": 14.47,
        "OriginalPrice": 174.93,
        "OriginalPriceInSupplierCurrency": 174.93,
        "OriginalTax": 14.47,
        "PayOnArrivalFinal": 160.46,
        "PayOnArrivalOriginal": 160.46,
        "SupplierCurrency": "USD",
        "TaxesAndFees": [
          {
            "Currency": "USD",
            "FeeTitle": "Taxes And Fees",
            "FrequencyType": "PerStay",
            "IsIncludedInPrice": true,
            "IsMandatory": true,
            "IsValuePercentage": false,
            "UnitType": "PerReservation",
            "Value": "14.47"
          }
        ]
      },
      "Refundability": 2,
      "Rooms": [
        {
          "AdultsCount": 1,
          "Availability": "Available",
          "Id": "21f5a497-f972-4398-8d4e-d0f5b90d4a6e",
          "KidsAges": [],
          "Price": {
            "Currency": "USD",
            "FinalPrice": 174.93,
            "FinalPriceInSupplierCurrency": 174.93,
            "FinalTax": 14.47,
            "OriginalPrice": 174.93,
            "OriginalPriceInSupplierCurrency": 174.93,
            "OriginalTax": 14.47,
            "PayOnArrivalFinal": 160.46,
            "PayOnArrivalOriginal": 160.46,
            "SupplierCurrency": "USD",
            "TaxesAndFees": [
              {
                "Currency": "USD",
                "FeeTitle": "Taxes And Fees",
                "FrequencyType": "PerStay",
                "IsIncludedInPrice": true,
                "IsMandatory": true,
                "IsValuePercentage": false,
                "UnitType": "PerReservation",
                "Value": "14.47"
              }
            ]
          },
          "RoomBasis": "Half board HB",
          "RoomName": "Standard Double Room",
          "TargetRoomKey": "CggzNjE3MDI5OBI0CgkyMTY2Mzk2NTMSCTI2NDE3MTg0OBoCMjQgASoKMjAxOS0wNS0yNTIKMjAxOS0wNS0yOCoDCgEx"
        }
      ],
      "SimplePrice": 174.93,
      "SupplierId": 1166,
      "SupplierName": "ExpediaSite"
    },
    {
      "BookUrl": "https://www.travelnow.com/templates/454770/hotels/1988690/book?lang=en&currency=USD&standardCheckin=5/25/2019&standardCheckout=5/28/2019&selectedPrice=181.56&supplierType=E&rateCode=264171848&roomTypeCode=216639653&roomsCount=1&rooms[0].adultsCount=1",
      "ContractId": 3074,
      "HotelId": 11862230,
      "PackageId": "c85c3551-8325-417a-a4ef-fd6851c2cdcf",
      "PackagePrice": {
        "Currency": "USD",
        "FinalPrice": 181.56,
        "FinalPriceInSupplierCurrency": 181.56,
        "FinalTax": 21.12,
        "OriginalPrice": 181.56,
        "OriginalPriceInSupplierCurrency": 181.56,
        "OriginalTax": 21.12,
        "SupplierCurrency": "USD",
        "TaxesAndFees": [
          {
            "Currency": "USD",
            "FeeTitle": "TaxAndServiceFee",
            "FrequencyType": "PerStay",
            "IsIncludedInPrice": true,
            "IsMandatory": true,
            "UnitType": "PerStay",
            "Value": "21.12"
          }
        ]
      },
      "Refundability": 2,
      "Rooms": [
        {
          "AdultsCount": 1,
          "Availability": "Available",
          "BedType": "Twin",
          "Id": "2aaa64d9-800e-45ed-8bf0-7952569f2378",
          "KidsAges": [],
          "Price": {
            "Currency": "USD",
            "FinalPrice": 181.56,
            "FinalPriceInSupplierCurrency": 181.56,
            "FinalTax": 21.12,
            "OriginalPrice": 181.56,
            "OriginalPriceInSupplierCurrency": 181.56,
            "OriginalTax": 21.12,
            "SupplierCurrency": "USD",
            "TaxesAndFees": [
              {
                "Currency": "USD",
                "FeeTitle": "TaxAndServiceFee",
                "FrequencyType": "PerStay",
                "IsIncludedInPrice": true,
                "IsMandatory": true,
                "UnitType": "PerStay",
                "Value": "21.12"
              }
            ]
          },
          "RoomBasis": "Half board HB",
          "RoomName": "Standard Double Room With Twin Bed"
        }
      ],
      "SimplePrice": 181.56,
      "SupplierId": 51,
      "SupplierName": "ExpediaPackage"
    },
    {
      "ContractId": 6322,
      "CreditCard": 0,
      "HotelId": 11862230,
      "PackageId": "ede50566-70ae-427e-a539-19f614bfd32b",
      "PackagePrice": {
        "Currency": "USD",
        "FinalPrice": 187.2,
        "FinalPriceInSupplierCurrency": 187.2,
        "FinalTax": 15.48,
        "OriginalPrice": 187.2,
        "OriginalPriceInSupplierCurrency": 187.2,
        "OriginalTax": 15.48,
        "SupplierCurrency": "USD",
        "TaxesAndFees": [
          {
            "Currency": "USD",
            "FeeTitle": "Taxes And Fees",
            "FrequencyType": "PerStay",
            "IsIncludedInPrice": true,
            "IsMandatory": true,
            "IsValuePercentage": false,
            "UnitType": "PerReservation",
            "Value": "15.48"
          }
        ]
      },
      "Refundability": 2,
      "Rooms": [
        {
          "AdultsCount": 1,
          "Availability": "Available",
          "Id": "0596b435-5da7-4134-b4ac-382ec7871cff",
          "KidsAges": [],
          "Price": {
            "Currency": "USD",
            "FinalPrice": 187.2,
            "FinalPriceInSupplierCurrency": 187.2,
            "FinalTax": 15.48,
            "OriginalPrice": 187.2,
            "OriginalPriceInSupplierCurrency": 187.2,
            "OriginalTax": 15.48,
            "SupplierCurrency": "USD",
            "TaxesAndFees": [
              {
                "Currency": "USD",
                "FeeTitle": "Taxes And Fees",
                "FrequencyType": "PerStay",
                "IsIncludedInPrice": true,
                "IsMandatory": true,
                "IsValuePercentage": false,
                "UnitType": "PerReservation",
                "Value": "15.48"
              }
            ]
          },
          "RoomBasis": "Bed and Breakfast BB",
          "RoomName": "Standard Quadruple Occupancy: Quadruple",
          "TargetRoomKey": "CggzNjE3MDI5OBIyCgkyMTY2Mzk2NTcSCTI2NDE3MTgyOBoCMjQqCjIwMTktMDUtMjUyCjIwMTktMDUtMjgqAwoBMQ"
        }
      ],
      "SimplePrice": 187.2,
      "SupplierId": 1166,
      "SupplierName": "ExpediaSite"
    },
    {
      "ContractId": 6322,
      "CreditCard": 0,
      "HotelId": 11862230,
      "PackageId": "7abf41bc-9879-42d7-b94b-4f621c21b2bd",
      "PackagePrice": {
        "Currency": "USD",
        "FinalPrice": 188.49,
        "FinalPriceInSupplierCurrency": 188.49,
        "FinalTax": 15.54,
        "OriginalPrice": 188.49,
        "OriginalPriceInSupplierCurrency": 188.49,
        "OriginalTax": 15.54,
        "SupplierCurrency": "USD",
        "TaxesAndFees": [
          {
            "Currency": "USD",
            "FeeTitle": "Taxes And Fees",
            "FrequencyType": "PerStay",
            "IsIncludedInPrice": true,
            "IsMandatory": true,
            "IsValuePercentage": false,
            "UnitType": "PerReservation",
            "Value": "15.54"
          }
        ]
      },
      "Refundability": 2,
      "Rooms": [
        {
          "AdultsCount": 1,
          "Availability": "Available",
          "Id": "d6530d8a-b23d-4916-9334-0397c5bfe68a",
          "KidsAges": [],
          "Price": {
            "Currency": "USD",
            "FinalPrice": 188.49,
            "FinalPriceInSupplierCurrency": 188.49,
            "FinalTax": 15.54,
            "OriginalPrice": 188.49,
            "OriginalPriceInSupplierCurrency": 188.49,
            "OriginalTax": 15.54,
            "SupplierCurrency": "USD",
            "TaxesAndFees": [
              {
                "Currency": "USD",
                "FeeTitle": "Taxes And Fees",
                "FrequencyType": "PerStay",
                "IsIncludedInPrice": true,
                "IsMandatory": true,
                "IsValuePercentage": false,
                "UnitType": "PerReservation",
                "Value": "15.54"
              }
            ]
          },
          "RoomBasis": "Half board HB",
          "RoomName": "Standard Triple Occupancy: Triple",
          "TargetRoomKey": "CggzNjE3MDI5OBIyCgkyMTY2Mzk2NTUSCTI2NDE3MTg1MRoCMjQqCjIwMTktMDUtMjUyCjIwMTktMDUtMjgqAwoBMQ"
        }
      ],
      "SimplePrice": 188.49,
      "SupplierId": 1166,
      "SupplierName": "ExpediaSite"
    },
    {
      "ContractId": 6322,
      "CreditCard": 1,
      "HotelId": 11862230,
      "PackageId": "ce7c45f2-58d4-4cb0-aac3-2edbe453d886",
      "PackagePrice": {
        "Currency": "USD",
        "FinalPrice": 192.99,
        "FinalPriceInSupplierCurrency": 192.99,
        "FinalTax": 15.95,
        "OriginalPrice": 192.99,
        "OriginalPriceInSupplierCurrency": 192.99,
        "OriginalTax": 15.95,
        "PayOnArrivalFinal": 177.04,
        "PayOnArrivalOriginal": 177.04,
        "SupplierCurrency": "USD",
        "TaxesAndFees": [
          {
            "Currency": "USD",
            "FeeTitle": "Taxes And Fees",
            "FrequencyType": "PerStay",
            "IsIncludedInPrice": true,
            "IsMandatory": true,
            "IsValuePercentage": false,
            "UnitType": "PerReservation",
            "Value": "15.95"
          }
        ]
      },
      "Refundability": 2,
      "Rooms": [
        {
          "AdultsCount": 1,
          "Availability": "Available",
          "Id": "0a325ae8-9aeb-4adb-9d36-285f970b2344",
          "KidsAges": [],
          "Price": {
            "Currency": "USD",
            "FinalPrice": 192.99,
            "FinalPriceInSupplierCurrency": 192.99,
            "FinalTax": 15.95,
            "OriginalPrice": 192.99,
            "OriginalPriceInSupplierCurrency": 192.99,
            "OriginalTax": 15.95,
            "PayOnArrivalFinal": 177.04,
            "PayOnArrivalOriginal": 177.04,
            "SupplierCurrency": "USD",
            "TaxesAndFees": [
              {
                "Currency": "USD",
                "FeeTitle": "Taxes And Fees",
                "FrequencyType": "PerStay",
                "IsIncludedInPrice": true,
                "IsMandatory": true,
                "IsValuePercentage": false,
                "UnitType": "PerReservation",
                "Value": "15.95"
              }
            ]
          },
          "RoomBasis": "Bed and Breakfast BB",
          "RoomName": "Standard Quadruple Occupancy: Quadruple",
          "TargetRoomKey": "CggzNjE3MDI5OBI0CgkyMTY2Mzk2NTcSCTI2NDE3MTgyOBoCMjQgASoKMjAxOS0wNS0yNTIKMjAxOS0wNS0yOCoDCgEx"
        }
      ],
      "SimplePrice": 192.99,
      "SupplierId": 1166,
      "SupplierName": "ExpediaSite"
    },
    {
      "ContractId": 6322,
      "CreditCard": 1,
      "HotelId": 11862230,
      "PackageId": "ef1ec608-e0ec-4cbc-8637-c9d89b7c2c89",
      "PackagePrice": {
        "Currency": "USD",
        "FinalPrice": 194.29,
        "FinalPriceInSupplierCurrency": 194.29,
        "FinalTax": 16.02,
        "OriginalPrice": 194.29,
        "OriginalPriceInSupplierCurrency": 194.29,
        "OriginalTax": 16.02,
        "PayOnArrivalFinal": 178.27,
        "PayOnArrivalOriginal": 178.27,
        "SupplierCurrency": "USD",
        "TaxesAndFees": [
          {
            "Currency": "USD",
            "FeeTitle": "Taxes And Fees",
            "FrequencyType": "PerStay",
            "IsIncludedInPrice": true,
            "IsMandatory": true,
            "IsValuePercentage": false,
            "UnitType": "PerReservation",
            "Value": "16.02"
          }
        ]
      },
      "Refundability": 2,
      "Rooms": [
        {
          "AdultsCount": 1,
          "Availability": "Available",
          "Id": "1b076e83-cf7c-4df9-9db9-77515332d105",
          "KidsAges": [],
          "Price": {
            "Currency": "USD",
            "FinalPrice": 194.29,
            "FinalPriceInSupplierCurrency": 194.29,
            "FinalTax": 16.02,
            "OriginalPrice": 194.29,
            "OriginalPriceInSupplierCurrency": 194.29,
            "OriginalTax": 16.02,
            "PayOnArrivalFinal": 178.27,
            "PayOnArrivalOriginal": 178.27,
            "SupplierCurrency": "USD",
            "TaxesAndFees": [
              {
                "Currency": "USD",
                "FeeTitle": "Taxes And Fees",
                "FrequencyType": "PerStay",
                "IsIncludedInPrice": true,
                "IsMandatory": true,
                "IsValuePercentage": false,
                "UnitType": "PerReservation",
                "Value": "16.02"
              }
            ]
          },
          "RoomBasis": "Half board HB",
          "RoomName": "Standard Triple Occupancy: Triple",
          "TargetRoomKey": "CggzNjE3MDI5OBI0CgkyMTY2Mzk2NTUSCTI2NDE3MTg1MRoCMjQgASoKMjAxOS0wNS0yNTIKMjAxOS0wNS0yOCoDCgEx"
        }
      ],
      "SimplePrice": 194.29,
      "SupplierId": 1166,
      "SupplierName": "ExpediaSite"
    },
    {
      "BookUrl": "https://www.travelnow.com/templates/454770/hotels/1988690/book?lang=en&currency=USD&standardCheckin=5/25/2019&standardCheckout=5/28/2019&selectedPrice=200.34&supplierType=E&rateCode=264171828&roomTypeCode=216639657&roomsCount=1&rooms[0].adultsCount=1",
      "ContractId": 3074,
      "HotelId": 11862230,
      "PackageId": "7d7dc54e-a1bc-491c-b91d-9553663c84b4",
      "PackagePrice": {
        "Currency": "USD",
        "FinalPrice": 200.34,
        "FinalPriceInSupplierCurrency": 200.34,
        "FinalTax": 23.31,
        "OriginalPrice": 200.34,
        "OriginalPriceInSupplierCurrency": 200.34,
        "OriginalTax": 23.31,
        "SupplierCurrency": "USD",
        "TaxesAndFees": [
          {
            "Currency": "USD",
            "FeeTitle": "TaxAndServiceFee",
            "FrequencyType": "PerStay",
            "IsIncludedInPrice": true,
            "IsMandatory": true,
            "UnitType": "PerStay",
            "Value": "23.31"
          }
        ]
      },
      "Refundability": 2,
      "Rooms": [
        {
          "AdultsCount": 1,
          "Availability": "Available",
          "BedType": "4 Twin",
          "Id": "adf1487c-b05d-47ac-8c54-29aab9676bef",
          "KidsAges": [],
          "Price": {
            "Currency": "USD",
            "FinalPrice": 200.34,
            "FinalPriceInSupplierCurrency": 200.34,
            "FinalTax": 23.31,
            "OriginalPrice": 200.34,
            "OriginalPriceInSupplierCurrency": 200.34,
            "OriginalTax": 23.31,
            "SupplierCurrency": "USD",
            "TaxesAndFees": [
              {
                "Currency": "USD",
                "FeeTitle": "TaxAndServiceFee",
                "FrequencyType": "PerStay",
                "IsIncludedInPrice": true,
                "IsMandatory": true,
                "UnitType": "PerStay",
                "Value": "23.31"
              }
            ]
          },
          "RoomBasis": "Bed and Breakfast BB",
          "RoomName": "Standard Quadruple With 4 Twin Bed Occupancy: Quadruple"
        }
      ],
      "SimplePrice": 200.34,
      "SupplierId": 51,
      "SupplierName": "ExpediaPackage"
    },
    {
      "BookUrl": "https://www.travelnow.com/templates/454770/hotels/1988690/book?lang=en&currency=USD&standardCheckin=5/25/2019&standardCheckout=5/28/2019&selectedPrice=201.72&supplierType=E&rateCode=264171851&roomTypeCode=216639655&roomsCount=1&rooms[0].adultsCount=1",
      "ContractId": 3074,
      "HotelId": 11862230,
      "PackageId": "8edeaa95-3029-44a1-83af-296e17fa5778",
      "PackagePrice": {
        "Currency": "USD",
        "FinalPrice": 201.72,
        "FinalPriceInSupplierCurrency": 201.72,
        "FinalTax": 23.43,
        "OriginalPrice": 201.72,
        "OriginalPriceInSupplierCurrency": 201.72,
        "OriginalTax": 23.43,
        "SupplierCurrency": "USD",
        "TaxesAndFees": [
          {
            "Currency": "USD",
            "FeeTitle": "TaxAndServiceFee",
            "FrequencyType": "PerStay",
            "IsIncludedInPrice": true,
            "IsMandatory": true,
            "UnitType": "PerStay",
            "Value": "23.43"
          }
        ]
      },
      "Refundability": 2,
      "Rooms": [
        {
          "AdultsCount": 1,
          "Availability": "Available",
          "BedType": "3 Single",
          "Id": "688be82d-ba85-42f1-bf34-89cec831fa45",
          "KidsAges": [],
          "Price": {
            "Currency": "USD",
            "FinalPrice": 201.72,
            "FinalPriceInSupplierCurrency": 201.72,
            "FinalTax": 23.43,
            "OriginalPrice": 201.72,
            "OriginalPriceInSupplierCurrency": 201.72,
            "OriginalTax": 23.43,
            "SupplierCurrency": "USD",
            "TaxesAndFees": [
              {
                "Currency": "USD",
                "FeeTitle": "TaxAndServiceFee",
                "FrequencyType": "PerStay",
                "IsIncludedInPrice": true,
                "IsMandatory": true,
                "UnitType": "PerStay",
                "Value": "23.43"
              }
            ]
          },
          "RoomBasis": "Half board HB",
          "RoomName": "Standard Triple With 3 Single Bed Occupancy: Triple"
        }
      ],
      "SimplePrice": 201.72,
      "SupplierId": 51,
      "SupplierName": "ExpediaPackage"
    },
    {
      "ContractId": 6322,
      "CreditCard": 0,
      "HotelId": 11862230,
      "PackageId": "da70501a-793b-4534-8bdd-80e27495a52e",
      "PackagePrice": {
        "Currency": "USD",
        "FinalPrice": 226.2,
        "FinalPriceInSupplierCurrency": 226.2,
        "FinalTax": 18.69,
        "OriginalPrice": 226.2,
        "OriginalPriceInSupplierCurrency": 226.2,
        "OriginalTax": 18.69,
        "SupplierCurrency": "USD",
        "TaxesAndFees": [
          {
            "Currency": "USD",
            "FeeTitle": "Taxes And Fees",
            "FrequencyType": "PerStay",
            "IsIncludedInPrice": true,
            "IsMandatory": true,
            "IsValuePercentage": false,
            "UnitType": "PerReservation",
            "Value": "18.69"
          }
        ]
      },
      "Refundability": 2,
      "Rooms": [
        {
          "AdultsCount": 1,
          "Availability": "Available",
          "Id": "32dd9d05-5ace-4365-8dc2-2cf4bdcaf045",
          "KidsAges": [],
          "Price": {
            "Currency": "USD",
            "FinalPrice": 226.2,
            "FinalPriceInSupplierCurrency": 226.2,
            "FinalTax": 18.69,
            "OriginalPrice": 226.2,
            "OriginalPriceInSupplierCurrency": 226.2,
            "OriginalTax": 18.69,
            "SupplierCurrency": "USD",
            "TaxesAndFees": [
              {
                "Currency": "USD",
                "FeeTitle": "Taxes And Fees",
                "FrequencyType": "PerStay",
                "IsIncludedInPrice": true,
                "IsMandatory": true,
                "IsValuePercentage": false,
                "UnitType": "PerReservation",
                "Value": "18.69"
              }
            ]
          },
          "RoomBasis": "Half board HB",
          "RoomName": "Standard Quadruple Occupancy: Quadruple",
          "TargetRoomKey": "CggzNjE3MDI5OBIyCgkyMTY2Mzk2NTcSCTI2NDE3MTg1MhoCMjQqCjIwMTktMDUtMjUyCjIwMTktMDUtMjgqAwoBMQ"
        }
      ],
      "SimplePrice": 226.2,
      "SupplierId": 1166,
      "SupplierName": "ExpediaSite"
    },
    {
      "ContractId": 6322,
      "CreditCard": 1,
      "HotelId": 11862230,
      "PackageId": "8a1d333c-ba4e-4c64-9abc-26ba822c0a51",
      "PackagePrice": {
        "Currency": "USD",
        "FinalPrice": 233.16,
        "FinalPriceInSupplierCurrency": 233.16,
        "FinalTax": 19.23,
        "OriginalPrice": 233.16,
        "OriginalPriceInSupplierCurrency": 233.16,
        "OriginalTax": 19.23,
        "PayOnArrivalFinal": 213.93,
        "PayOnArrivalOriginal": 213.93,
        "SupplierCurrency": "USD",
        "TaxesAndFees": [
          {
            "Currency": "USD",
            "FeeTitle": "Taxes And Fees",
            "FrequencyType": "PerStay",
            "IsIncludedInPrice": true,
            "IsMandatory": true,
            "IsValuePercentage": false,
            "UnitType": "PerReservation",
            "Value": "19.23"
          }
        ]
      },
      "Refundability": 2,
      "Rooms": [
        {
          "AdultsCount": 1,
          "Availability": "Available",
          "Id": "1917c67f-cc96-4ade-bfb4-2c0ae682ba7a",
          "KidsAges": [],
          "Price": {
            "Currency": "USD",
            "FinalPrice": 233.16,
            "FinalPriceInSupplierCurrency": 233.16,
            "FinalTax": 19.23,
            "OriginalPrice": 233.16,
            "OriginalPriceInSupplierCurrency": 233.16,
            "OriginalTax": 19.23,
            "PayOnArrivalFinal": 213.93,
            "PayOnArrivalOriginal": 213.93,
            "SupplierCurrency": "USD",
            "TaxesAndFees": [
              {
                "Currency": "USD",
                "FeeTitle": "Taxes And Fees",
                "FrequencyType": "PerStay",
                "IsIncludedInPrice": true,
                "IsMandatory": true,
                "IsValuePercentage": false,
                "UnitType": "PerReservation",
                "Value": "19.23"
              }
            ]
          },
          "RoomBasis": "Half board HB",
          "RoomName": "Standard Quadruple Occupancy: Quadruple",
          "TargetRoomKey": "CggzNjE3MDI5OBI0CgkyMTY2Mzk2NTcSCTI2NDE3MTg1MhoCMjQgASoKMjAxOS0wNS0yNTIKMjAxOS0wNS0yOCoDCgEx"
        }
      ],
      "SimplePrice": 233.16,
      "SupplierId": 1166,
      "SupplierName": "ExpediaSite"
    },
    {
      "BookUrl": "https://www.travelnow.com/templates/454770/hotels/1988690/book?lang=en&currency=USD&standardCheckin=5/25/2019&standardCheckout=5/28/2019&selectedPrice=242.07&supplierType=E&rateCode=264171852&roomTypeCode=216639657&roomsCount=1&rooms[0].adultsCount=1",
      "ContractId": 3074,
      "HotelId": 11862230,
      "PackageId": "e30ec4a1-a92b-4225-a5f3-5c57723c94d2",
      "PackagePrice": {
        "Currency": "USD",
        "FinalPrice": 242.07,
        "FinalPriceInSupplierCurrency": 242.07,
        "FinalTax": 28.14,
        "OriginalPrice": 242.07,
        "OriginalPriceInSupplierCurrency": 242.07,
        "OriginalTax": 28.14,
        "SupplierCurrency": "USD",
        "TaxesAndFees": [
          {
            "Currency": "USD",
            "FeeTitle": "TaxAndServiceFee",
            "FrequencyType": "PerStay",
            "IsIncludedInPrice": true,
            "IsMandatory": true,
            "UnitType": "PerStay",
            "Value": "28.14"
          }
        ]
      },
      "Refundability": 2,
      "Rooms": [
        {
          "AdultsCount": 1,
          "Availability": "Available",
          "BedType": "4 Twin",
          "Id": "1ab47e2e-ae33-47e4-928a-d724dd78ed8e",
          "KidsAges": [],
          "Price": {
            "Currency": "USD",
            "FinalPrice": 242.07,
            "FinalPriceInSupplierCurrency": 242.07,
            "FinalTax": 28.14,
            "OriginalPrice": 242.07,
            "OriginalPriceInSupplierCurrency": 242.07,
            "OriginalTax": 28.14,
            "SupplierCurrency": "USD",
            "TaxesAndFees": [
              {
                "Currency": "USD",
                "FeeTitle": "TaxAndServiceFee",
                "FrequencyType": "PerStay",
                "IsIncludedInPrice": true,
                "IsMandatory": true,
                "UnitType": "PerStay",
                "Value": "28.14"
              }
            ]
          },
          "RoomBasis": "Half board HB",
          "RoomName": "Standard Quadruple With 4 Twin Bed Occupancy: Quadruple"
        }
      ],
      "SimplePrice": 242.07,
      "SupplierId": 51,
      "SupplierName": "ExpediaPackage"
    }
  ];
  const gallery = ['https://storage.googleapis.com/romingo-production-public/images/Grand%20Hyatt%20San%20Diego/Manchester-Grand-Hyatt-San-Diego-P508-Exterior-Marina.16x9.webp',
    'https://storage.googleapis.com/romingo-production-public/images/Grand%20Hyatt%20San%20Diego/Manchester-Grand-Hyatt-San-Diego-P566-Lobby-Front-Desk-Wide.16x9.webp',
    'https://storage.googleapis.com/romingo-production-public/images/Grand%20Hyatt%20San%20Diego/Manchester-Grand-Hyatt-P214-King-View.16x9.webp',
    'https://storage.googleapis.com/romingo-production-public/images/Grand%20Hyatt%20San%20Diego/SANRS-P235-Penthouse-Bedroom.16x9.webp',
    'https://storage.googleapis.com/romingo-production-public/images/Grand%20Hyatt%20San%20Diego/SANRS-P319-Conference-Suite-B-Living-Room.16x9.webp']

  const [loading, setLoading] = useState(true);

  const goToRateScroll = () => {
    // RateCardRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!loading) {
    return <DetailsPageSkeleton />
  }

  return (
    <Grid sx={{ background: "#feffff", scrollBehavior: "smooth" }}>
      <ScrollToTop />
      <Navbar />
      <Grid container direction='row' spacing={2} sx={{ maxWidth: 1200, margin: 'auto', position: 'relative', }} >
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={gallery[0]}
            // alt={name}
            boxShadow={2}
            // onClick={handleOpen}
            className={classes.mainBox}
          />
        </Grid>
        <Grid item xs={12} sm={6} display={{ xs: 'none', sm: 'block' }}>
          <Grid container spacing={2}>
            {
              gallery.slice(1, 5).map((img: any) => {
                return (
                  <Grid item sm={6} key={img}>
                    <Box
                      // onClick={handleOpen}
                      boxShadow={2}
                      component="img"
                      src={img}
                      // alt={name}
                      className={classes.sideBox}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
        <Box
          sx={{
            position: "absolute",
            right: { xs: "-10px", md: "20px" },
            bottom: { xs: "8px", md: "20px" },
            textAlign: "right",
          }}
        >
          <Button
            variant="outlined"
            size="small"
            sx={{
              textTransform: "none",
              backgroundColor: "white",
              "&:hover": { backgroundColor: "#fff" },
            }}
          // onClick={handleOpen}
          >
            <PhotoCameraIcon sx={{ fontSize: 15, mr: 0.5 }} />
            View Photos
          </Button>
        </Box>
      </Grid>
      <Grid container direction={'row'} sx={{ maxWidth: 1200, margin: 'auto', position: 'relative', marginTop: '20px' }}>
        <Grid item xs={12} md={6} sx={{paddingLeft: '16px'}}><Typography variant="h6" >{hotelName}</Typography></Grid>
        <Grid item xs={12} md={3} sx={{display: 'inline-flex'}}><RomingoScore score={1000} />
          <Circle
            sx={{
              fontWeight: 500,
              mx: 0.5,
              opacity: 0.75,
              color: "#BC4749",
              fontSize: "20%",
              margin: 'auto 10px'
            }} />
          <Link
            // onClick={() => setReviewDialog(true)}
            sx={{
              cursor: "pointer",
              color: "#666",
              textDecoration: "underline",
              display: { xs: "inline", sm: "inline", md: "block" },
              fontWeight: 500,
              opacity: 0.75,
              fontSize: "70%",
              margin: 'auto 5px'
            }}
          >
            1000 reviews
          </Link>
        </Grid>
        <Grid item xs={12} md={3}><Hidden mdDown>
          <BookingCard
            sx={{ background: "#fff" }}
            roomList={[]}
            goToRate={goToRateScroll}
          />
        </Hidden></Grid>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(DetailsPage1);
