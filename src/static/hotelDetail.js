const data = {
  name: "Hotel McCoy",
  location: {
    lat: "32.19983",
    lon: "-110.98048",
    address: "720 W. Silverlake Road, Tucson, 85713, AZ",
  },
  score: 5,
  romingoDescription: "",
  defaultDescription:
    "Retro meets contemporary here at our 1960’s mid-century modern art hotel. From the fully restored pool to the A-shaped entrance & exposed posts & beams, it’s the best of both worlds.\n\nTucson is magic. We’ll share that with you when you are here. The lobby is adorned with pieces created by Arizona artists. The beer we serve was brewed just down the street. The wine we pour comes from AZ wine country. The coffee we brew was roasted right here in Tucson.\n\nTrue to our roots, Hotel McCoy emphasizes function & affordability – offering fellow wanderers local style & high-end amenities at reachable rates. This is what we call Travel For All.",
  mainImg:
    "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/11025302_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
  gallery: [
    "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/abf88bf7_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
    "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/d3e668fe_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
    "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/262404e1_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
    "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/d73122d2_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
    "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/5bfd85d6_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
    "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/349fd0e3_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
    "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/efb27d2e_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
    "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/30a7777c_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
    "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/2355a48d_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
    "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/62ea6b9c_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
    "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/7a2f4e7a_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
  ],
  nearby: [
    { text: "Lorem ipsum dolor sit amet accomodare his consul", distance: 0.2 },
    { text: "Accomodare his consul", distance: 0.37 },
    { text: "Lorem ipsum dolor sit", distance: 0.75 },
    { text: "Accomodare his consul nesarchum qui posse", distance: 1.2 },
    { text: "Ei mea falli legere efficiantur", distance: 2.1 },
  ],
  roomList: [
    {
      value: 0,
      description: "Room TWO DOUBLE BEDS"
    },
    {
      value: 1,
      description: "Two Double Beds - Non-refundable"
    },
    {
      value: 2,
      description: "SUITE TWO BEDROOMS"
    },
  ],
  cancelPenalty: [
    {
      cancelable: true,
      deadline: {
        absoluteDeadline: "2021-08-14T23:59:00-05:00",
      },
      amountPercent: {
        amount: 62.93,
        currencyCode: "USD",
      },
    },
    {
      cancelable: true,
      deadline: {
        absoluteDeadline: "2021-08-19T23:59:00-05:00",
      },
      amountPercent: {
        amount: 125.85,
        currencyCode: "USD",
      },
    },
  ],
  dogAmenitiesTitle: "Pet-Friendly Amenities",
  amenitiesTitle: "Other Amenities",
  amenities: [
    {
      code: 101,
      description: "Wheelchair access",
      value: "",
    },
    {
      code: 162,
      description: "Meal plan available",
      value: "Y",
    },
    {
      code: 198,
      description: "Non-smoking rooms (generic)",
      value: "",
    },
    {
      code: 2001,
      description: "Eco Friendly",
      value: "",
    },
    {
      code: 2002,
      description: "Stay Safe",
      value: "",
    },
    {
      code: 2004,
      description: "Local Calls",
      ComplimentaryInd: false,
      value: "MINIMAL FEE FOR ALL LOCAL CALLS",
    },
    {
      code: 2017,
      description: "Crib charge",
      value: "",
    },
    {
      code: 2018,
      description: "Extra person",
      value: "",
    },
    {
      code: 224,
      description: "Pets allowed",
      value: "Y",
    },
    {
      code: 227,
      description: "Complimentary breakfast",
      value: "",
    },
    {
      code: 228,
      description: "Business center",
      value: "",
    },
    {
      code: 233,
      description: "Tennis court",
      value: "",
    },
    {
      code: 236,
      description: "Golf",
      value: "",
    },
    {
      code: 24,
      description: "Conference facilities",
      value: "",
    },
    {
      code: 255,
      description: "Data port",
      value: "",
    },
    {
      code: 259,
      description: "High speed internet access",
      ComplimentaryInd: false,
      value: "WIRED HSIA CHARGE NOT TO EXCEED 9.95",
    },
    {
      code: 260,
      description: "Interior corridors",
      value: "",
    },
    {
      code: 289,
      description: "Children programs",
      value: "",
    },
    {
      code: 44,
      description: "Game room",
      value: "",
    },
    {
      code: 48,
      description: "Health club",
      value: "",
    },
    {
      code: 54,
      description: "Indoor pool",
      value: "",
    },
    {
      code: 55,
      description: "Hot Tub",
      value: "",
    },
    {
      code: 71,
      description: "Pool",
      value: "",
    },
    {
      code: 77,
      description: "Room service",
      value: "11a-11p",
    },
    {
      code: 96,
      description: "Dry cleaning",
      value: "",
    },
  ],
  rooms: [
    {
      "RoomIndex": 1,
      "BedTypes": {
        "BedType": [
          {
            "Code": 5,
            "Count": 2
          }
        ]
      },
      "RoomDescription": {
        "Name": "Room, 2 Queen Beds, Non Smoking",
        "Text": [
          "2 Queen Beds / 392 sq feet / Internet - Free WiFi / Entertainment - 32-inch LCD TV with premium channels / Food & Drink - Coffee/tea maker / Sleep - Bed sheets / Bathroom - Private bathroom, a hair dryer, and a shower/tub combination / Practical - Free weekday newspaper, iron/ironing board, and desk; free cribs/infant beds available on request / Comfort - Climate-controlled air conditioning and daily housekeeping / Accessibility - Height-adjustable showerhead, closed-captioned TV, low-height door lock, grab bar in bathtub, lever door handles, low-height electrical outlets in bathroom, transfer shower, visual fire alarm, and low-height view port in door / Non-Smoking / Connecting/adjoining rooms can be requested, subject to availability / "
        ]
      },
      "Amenities": {
        "Amenity": [
          {
            "Code": 2,
            "Description": "Air conditioning"
          },
          {
            "Code": 55,
            "Description": "Iron"
          },
          {
            "Code": 56,
            "Description": "Ironing board"
          },
          {
            "Code": 26,
            "Description": "Cribs"
          },
          {
            "Code": 161,
            "Description": "Accessible room"
          },
          {
            "Code": 107,
            "Description": "Telephone"
          },
          {
            "Code": 28,
            "Description": "Desk"
          },
          {
            "Code": 74,
            "Description": "Non-smoking"
          },
          {
            "Code": 85,
            "Description": "Private bathroom"
          },
          {
            "Code": 19,
            "Description": "Coffee/Tea maker"
          },
          {
            "Code": 227,
            "Description": "Premium movie channels"
          },
          {
            "Code": 22,
            "Description": "Connecting rooms"
          },
          {
            "Code": 251,
            "Description": "TV"
          },
          {
            "Code": 73,
            "Description": "Newspaper"
          },
          {
            "Code": 208,
            "Description": "Maid service"
          },
          {
            "Code": 50,
            "Description": "Hairdryer"
          },
          {
            "Code": 15,
            "Description": "Bathtub/shower combination"
          }
        ]
      },
      "Occupancy": {
        "Max": 4
      },
      "RatePlans": {
        "RatePlan": [
          {
            "RatePlanName": "Room, 2 Queen Beds, Non Smoking",
            "RatePlanType": "13",
            "PrepaidIndicator": true,
            "AvailableQuantity": 5,
            "RateSource": "110",
            "RateKey": "gKH4v2ybOhkZbJUT10wf0bKSWzvyycc9grVUAtFTvridnNthUxhMkQelaDWf54O4qoLLUFCdnvN7Tc0SBiWf0UfQfSQ33uroDxBAPyAuXDi9JnDRjahJXoY+8DfBr+LvqIh+11FLxW0cUrLUwWdTc3LBCE9P1fDsJLLTdvD9Up/ggRjjZiDoqCBSi2kibbZGdc70DrPF9w3iLcO976K2BOTYnSlK1PEaHEUPIT+uavPizgOqA8KGRNA55dyLa2iGJtUL9J3bRGnGwd500TZUYJE2BJpYYoNrKqb3nXa+nQWHwkS1SBs2+BZ/BWAZScPx/3noV88g5wf6BHUn/+tzQAeXLhklSW6RexHul8MYSxptMJ0/EAZ5luTcmnf5nc2J4jS78bawUb5WFs2IHIAHnluYOPCOceJ4TbUZaaMqxbqCUcuGKX6FCpGc0X+pDU+EY8UlezAnTxp5tKXLaqGxZPJHgFqRpVddpMgI5KOuscLnynpWxyE3gZA4MrKiTUniKvAoLRDsM8keFV4GAorTyD8Y+xeCSe8BxRm1TRMaic1zfIdNizRC7/J18QqFs6bFNy4i+w6I1NUTkTjjEjhB6xdPE5nDy5/P5q66/aSmNvI4nBgDJhS1nfWcoIPBjN5H5g6SKxDnyWwpP82yW7p0N+E60Ud8YLJV4TqyHnJ1YCJU0DfbtX3oq6CqnB+GGs0HjDly/RRaBQzCq7X7VA1tKhOWOaFKydyyMQrz65QbC+17IzVUscfL96IbnDA1AcVOsv8Cfyd1H9IOjzCBD3+8x+XOqenRo5llnhvH8GJnJ3UuqtPE9Fvb3d6EyZXMYA3LVbM4tB+9pM2qZUE98O162ET1s/t6nIEu+4fs/XQ9c4pjeGKcjyAhEEDyebrVbz39",
            "RatePlanDescription": {
              "Text": "Room, 2 Queen Beds, Non Smoking"
            },
            "RatePlanInclusions": {
              "RatePlanInclusionDescription": [
                {
                  "Name": "Complimentary wireless internet",
                  "Code": 286
                }
              ]
            },
            "RateInfo": {
              "StartDate": "2021-09-16",
              "EndDate": "2021-09-23",
              "AmountBeforeTax": 821.17,
              "AmountAfterTax": 947.77,
              "AverageNightlyRate": 135.4,
              "CurrencyCode": "USD",
              "AdditionalFeesInclusive": false,
              "TaxInclusive": true,
              "Rates": {
                "Rate": [
                  {
                    "StartDate": "2021-09-16",
                    "EndDate": "2021-09-17",
                    "AmountBeforeTax": 118.31,
                    "AmountAfterTax": 136.55,
                    "CurrencyCode": "USD"
                  },
                  {
                    "StartDate": "2021-09-17",
                    "EndDate": "2021-09-19",
                    "AmountBeforeTax": 90.31,
                    "AmountAfterTax": 104.23,
                    "CurrencyCode": "USD"
                  },
                  {
                    "StartDate": "2021-09-19",
                    "EndDate": "2021-09-20",
                    "AmountBeforeTax": 111.31,
                    "AmountAfterTax": 128.47,
                    "CurrencyCode": "USD"
                  },
                  {
                    "StartDate": "2021-09-20",
                    "EndDate": "2021-09-22",
                    "AmountBeforeTax": 139.31,
                    "AmountAfterTax": 160.79,
                    "CurrencyCode": "USD"
                  },
                  {
                    "StartDate": "2021-09-22",
                    "EndDate": "2021-09-23",
                    "AmountBeforeTax": 132.31,
                    "AmountAfterTax": 152.71,
                    "CurrencyCode": "USD"
                  }
                ]
              },
              "Taxes": {
                "Amount": 126.6,
                "CurrencyCode": "USD",
                "Tax": [
                  {
                    "StartDate": "2021-09-16",
                    "EndDate": "2021-09-17",
                    "Amount": 18.24,
                    "CurrencyCode": "USD"
                  },
                  {
                    "StartDate": "2021-09-17",
                    "EndDate": "2021-09-19",
                    "Amount": 13.92,
                    "CurrencyCode": "USD"
                  },
                  {
                    "StartDate": "2021-09-19",
                    "EndDate": "2021-09-20",
                    "Amount": 17.16,
                    "CurrencyCode": "USD"
                  },
                  {
                    "StartDate": "2021-09-20",
                    "EndDate": "2021-09-22",
                    "Amount": 21.48,
                    "CurrencyCode": "USD"
                  },
                  {
                    "StartDate": "2021-09-22",
                    "EndDate": "2021-09-23",
                    "Amount": 20.4,
                    "CurrencyCode": "USD"
                  }
                ],
                "TaxGroups": {
                  "TaxGroup": [
                    {
                      "Code": 201,
                      "Amount": 126.6,
                      "CurrencyCode": "USD",
                      "TaxDescription": {
                        "Text": [
                          "Tax Recovery Charges and Service Fees"
                        ]
                      }
                    }
                  ]
                }
              },
              "CancelPenalties": {
                "CancelPenalty": [
                  {
                    "cancelable": true,
                    "Deadline": {
                      "AbsoluteDeadline": "2021-09-15T23:59:00.000-05:00"
                    },
                    "AmountPercent": {
                      "NmbrOfNights": 1
                    }
                  }
                ]
              },
              "Guarantee": {
                "GuaranteeType": "GUAR",
                "GuaranteesAccepted": {
                  "GuaranteeAccepted": [
                    {
                      "GuaranteeTypeCode": 5,
                      "PaymentCards": {
                        "PaymentCard": [
                          {
                            "CardCode": "DS",
                            "value": "DISCOVER CARD"
                          },
                          {
                            "CardCode": "DC",
                            "value": "DINERS CLUB CARD"
                          },
                          {
                            "CardCode": "MC",
                            "value": "MASTER CARD"
                          },
                          {
                            "CardCode": "AX",
                            "value": "AMERICAN EXPRESS"
                          },
                          {
                            "CardCode": "JC",
                            "value": "JCB CREDIT CARD"
                          },
                          {
                            "CardCode": "UP",
                            "value": "UNION PAY"
                          },
                          {
                            "CardCode": "BC",
                            "value": "BANK CARD"
                          },
                          {
                            "CardCode": "VI",
                            "value": "VISA"
                          }
                        ]
                      }
                    },
                    {
                      "GuaranteeTypeCode": 18
                    }
                  ]
                },
                "GuaranteeDescription": {
                  "Text": [
                    "This payment will be processed in US if using MasterCard and Visa"
                  ]
                }
              },
              "AdditionalDetails": {
                "AdditionalDetail": [
                  {
                    "Code": 5,
                    "Text": [
                      "This payment will be processed in US if using MasterCard and Visa"
                    ]
                  },
                  {
                    "Code": 7,
                    "Text": [
                      "If you fail to check-in for this reservation, or if you cancel or change this reservation after check-in, you may incur penalty charges at the discretion of the property of up to 100% of the booking value."
                    ]
                  },
                  {
                    "Code": 8,
                    "Text": [
                      "Special Instructions: Front desk staff will greet guests on arrival.  Due to COVID-19, this property’s hotel facilities or services options may be limited pursuant to local regulations.",
                      "  Extra-person charges may apply and vary depending on property policy / Government-issued photo identification and a credit card, debit card, or cash deposit may be required at check-in for incidental charges / Special requests are subject to availability upon check-in and may incur additional charges; special requests cannot be guaranteed / This property accepts credit cards and cash / Please note that cultural norms and guest policies may differ by country and by property; the policies listed are provided by the property / "
                    ]
                  },
                  {
                    "Code": 9,
                    "Text": [
                      "The following fees and deposits are charged by the property at time of service, check-in, or check-out. / Breakfast fee: between USD 5 and USD 14 per person (approximately) / Self parking fee: USD 7.00 per night / The above list may not be comprehensive. Fees and deposits may not include tax and are subject to change. / "
                    ]
                  },
                  {
                    "Code": 14,
                    "Text": [
                      "  The property has connecting/adjoining rooms, which are subject to availability and can be requested by contacting the property using the number on the booking confirmation. / This property advises that enhanced cleaning and guest safety measures are currently in place. / Disinfectant is used to clean the property. / Guests are provided with hand sanitizer. / This property affirms that it follows the cleaning and disinfection practices of Commitment to Clean (Marriott). / This property welcomes guests of all sexual orientations and gender identities (LGBTQ friendly). / "
                    ]
                  }
                ]
              }
            }
          }
        ]
      }
    },
    {
      "RoomIndex": 1,
      "RoomType": "Queen Room with Two Queen Beds - Booking.com rate",
      "RoomTypeCode": "Queen Room with Two Queen Beds - Booking.com rate",
      "RoomViewCode": 20,
      "NonSmoking": true,
      "GuestRoomInfo": 42,
      "BedTypes": {
        "BedType": [
          {
            "Code": 5,
            "Count": 2
          }
        ]
      },
      "RoomDescription": {
        "Name": "Queen Room with Two Queen Beds - Booking.com rate",
        "Text": [
          "A flat-screen TV with cable channels is offered in this room.  A coffee machine and work desk are included. "
        ]
      },
      "Amenities": {
        "Amenity": [
          {
            "Code": 19,
            "Description": "Coffee/Tea maker"
          },
          {
            "Code": 92,
            "Description": "Safe"
          },
          {
            "Code": 78,
            "Description": "Pay per view movies on TV"
          },
          {
            "Code": 107,
            "Description": "Telephone"
          },
          {
            "Code": 2,
            "Description": "Air conditioning"
          },
          {
            "Code": 50,
            "Description": "Hairdryer"
          },
          {
            "Code": 119,
            "Description": "Wake-up calls"
          },
          {
            "Code": 3,
            "Description": "Alarm clock"
          },
          {
            "Code": 55,
            "Description": "Iron"
          },
          {
            "Code": 5,
            "Description": "AM/FM radio"
          },
          {
            "Code": 28,
            "Description": "Desk"
          },
          {
            "Code": 270,
            "Description": "Seating area with sofa/chair"
          },
          {
            "Code": 85,
            "Description": "Private bathroom"
          },
          {
            "Code": 166,
            "Description": "Self-controlled heating/cooling system"
          },
          {
            "Code": 18,
            "Description": "Cable television"
          },
          {
            "Code": 15,
            "Description": "Bathtub/shower combination"
          },
          {
            "Code": 273,
            "Description": "Widescreen TV"
          },
          {
            "Code": 162,
            "Description": "Closets in room"
          },
          {
            "Code": 142,
            "Description": "Shower"
          }
        ]
      },
      "Occupancy": {
        "Max": 4
      },
      "RatePlans": {
        "RatePlan": [
          {
            "RatePlanName": "Queen Room with Two Queen Beds - Booking.com rate",
            "PrepaidIndicator": false,
            "AvailableQuantity": 5,
            "RateSource": "113",
            "RateKey": "PzVOn59Sub1mwrUPXx7dID/Cw/mlI4lmqeCf30v2npCzo4yjwShGqRskOCY6dx+zeav+rPlOifZIdC98nEszMci6dCUpdj1RPnC7Fg5gQGmAuQSd98IiRScJPQh2lE5lDiMnbCyBFeA10NaW2hd3knoo/RhsMiuuAg34PR3M6TMkaW3P/IeWCefTChNb6axXG3eE55E1N909eo5qDB24BiO9LEpK33upnGioPPGENGDMd9wR/E/42SMbgNNv65BjGwrYSnKzk1mHK10UxCiJXLOJkdGW62kJf2R//woJhKORNJGEtss9lAZaiRfeWB3C",
            "RatePlanDescription": {
              "Text": "Queen Room with Two Queen Beds - Booking.com rate"
            },
            "RatePlanInclusions": {
              "RatePlanInclusionDescription": [
                {
                  "Name": "Free high speed internet connection",
                  "Code": 222
                }
              ]
            },
            "MealsIncluded": {
              "Breakfast": false,
              "Lunch": false,
              "Dinner": false,
              "MealPlanCode": 14
            },
            "RateInfo": {
              "StartDate": "2021-09-16",
              "EndDate": "2021-09-23",
              "AmountBeforeTax": 903,
              "AmountAfterTax": 1020.39,
              "AverageNightlyRate": 145.77,
              "CurrencyCode": "USD",
              "AdditionalFeesInclusive": false,
              "TaxInclusive": true,
              "Taxes": {
                "Amount": 117.39,
                "CurrencyCode": "USD",
                "TaxGroups": {
                  "TaxGroup": [
                    {
                      "Code": 36,
                      "Amount": 117.39,
                      "CurrencyCode": "USD",
                      "TaxDescription": {
                        "Text": ["VAT"]
                      }
                    }
                  ]
                }
              },
              "Fees": {
                "Amount": 36.12,
                "CurrencyCode": "USD",
                "FeeGroups": {
                  "FeeGroup": [
                    {
                      "Code": 3,
                      "Amount": 18.06,
                      "CurrencyCode": "USD",
                      "FeeDescription": {
                        "Text": ["Tourism fee"]
                      }
                    },
                    {
                      "Code": 3,
                      "Amount": 18.06,
                      "CurrencyCode": "USD",
                      "FeeDescription": {
                        "Text": ["local council tax"]
                      }
                    }
                  ]
                }
              },
              "CancelPenalties": {
                "CancelPenalty": [
                  {
                    "cancelable": true,
                    "Deadline": {
                      "AbsoluteDeadline": "2021-09-16T00:00:00"
                    },
                    "AmountPercent": {
                      "Amount": 129,
                      "CurrencyCode": "USD"
                    },
                    "PenaltyDescription": {
                      "Text": "You may cancel free of charge until 00:00 on the day of arrival. You will be charged the cost of the first night if you cancel after 00:00 on the day of arrival."
                    }
                  }
                ]
              },
              "Guarantee": {
                "GuaranteeType": "GUAR",
                "GuaranteesAccepted": {
                  "GuaranteeAccepted": [
                    {
                      "GuaranteeTypeCode": 5,
                      "PaymentCards": {
                        "PaymentCard": [
                          {
                            "CardCode": "IK",
                            "value": "MASTER CARD"
                          },
                          {
                            "CardCode": "VI",
                            "value": "VISA"
                          },
                          {
                            "CardCode": "MC",
                            "value": "MASTER CARD"
                          },
                          {
                            "CardCode": "AX",
                            "value": "AMERICAN EXPRESS"
                          },
                          {
                            "CardCode": "JC",
                            "value": "JCB CREDIT CARD"
                          },
                          {
                            "CardCode": "VS",
                            "value": "VISA"
                          },
                          {
                            "CardCode": "CA",
                            "value": "MASTERCARD"
                          },
                          {
                            "CardCode": "DC",
                            "value": "DINERS CLUB CARD"
                          },
                          {
                            "CardCode": "DS",
                            "value": "DISCOVER CARD"
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              "AdditionalDetails": {
                "AdditionalDetail": [
                  {
                    "Code": 8,
                    "CurrencyCode": "USD",
                    "Text": [
                      "Guests are required to show a photo identification and credit card upon check-in. Please note that all Special Requests are subject to availability and additional charges may apply. In response to Coronavirus (COVID-19), additional safety and sanitation measures are in effect at this property. Food & beverage services at this property may be limited or unavailable due to Coronavirus (COVID-19)."
                    ]
                  },
                  {
                    "Code": 29,
                    "CurrencyCode": "USD",
                    "Text": ["No prepayment is needed."]
                  }
                ]
              }
            }
          }
        ]
      }
    },
    {
      "RoomIndex": 1,
      "RoomType": "Newly Renovated One-Bedroom King Suite with Sofa Bed - Booking.com rate",
      "RoomTypeCode": "Newly Renovated One-Bedroom King Suite with Sofa Bed - Booking.com rate",
      "RoomViewCode": 20,
      "NonSmoking": true,
      "GuestRoomInfo": 3,
      "BedTypes": {
        "BedType": [
          {
            "Code": 3,
            "Count": 1
          }
        ]
      },
      "RoomDescription": {
        "Name": "Newly Renovated One-Bedroom King Suite with Sofa Bed - Booking.com rate",
        "Text": [
          "This suite has a private entrance, tile/marble floor and tea/coffee maker."
        ]
      },
      "Amenities": {
        "Amenity": [
          {
            "Code": 19,
            "Description": "Coffee/Tea maker"
          },
          {
            "Code": 92,
            "Description": "Safe"
          },
          {
            "Code": 78,
            "Description": "Pay per view movies on TV"
          },
          {
            "Code": 107,
            "Description": "Telephone"
          },
          {
            "Code": 2,
            "Description": "Air conditioning"
          },
          {
            "Code": 50,
            "Description": "Hairdryer"
          },
          {
            "Code": 119,
            "Description": "Wake-up calls"
          },
          {
            "Code": 3,
            "Description": "Alarm clock"
          },
          {
            "Code": 55,
            "Description": "Iron"
          },
          {
            "Code": 5,
            "Description": "AM/FM radio"
          },
          {
            "Code": 28,
            "Description": "Desk"
          },
          {
            "Code": 270,
            "Description": "Seating area with sofa/chair"
          },
          {
            "Code": 85,
            "Description": "Private bathroom"
          },
          {
            "Code": 166,
            "Description": "Self-controlled heating/cooling system"
          },
          {
            "Code": 18,
            "Description": "Cable television"
          },
          {
            "Code": 15,
            "Description": "Bathtub/shower combination"
          },
          {
            "Code": 273,
            "Description": "Widescreen TV"
          },
          {
            "Code": 162,
            "Description": "Closets in room"
          },
          {
            "Code": 102,
            "Description": "Sofa bed"
          },
          {
            "Code": 142,
            "Description": "Shower"
          }
        ]
      },
      "Occupancy": {
        "Max": 4
      },
      "RatePlans": {
        "RatePlan": [
          {
            "RatePlanName": "Newly Renovated One-Bedroom King Suite with Sofa Bed - Booking.com rate",
            "PrepaidIndicator": false,
            "AvailableQuantity": 5,
            "RateSource": "113",
            "RateKey": "xGvVJyKQyC15qbVhVOkh7LhrrhsNYMpLC6FyX36gg4+rOHx79Rrim7M647zQNg+c/GelyQ6hzAkW3hEmAtSGRlg0A9oJntxIzqcQJUSrKZTM1raH2vcOpnKTNslVyy/mRa4CTd3ZVS71L5O9XbcbJI2WaZNvSyf1lJCqw4UnVnhLkKn2MkjCjo1x5ePDDCjpYVb6qAVsV4WM77MOOGuTiZeqzu9agv5FEZQBOZI3g/iH9N/Ymn0CAZGZ73H4CjJYIM6tZEn48dERUEY9QsjjsSnfXykI5oa0uI9b5G40wKDxR24/g4A9pl1/+s4t2cc6",
            "RatePlanDescription": {
              "Text": "Newly Renovated One-Bedroom King Suite with Sofa Bed - Booking.com rate"
            },
            "RatePlanInclusions": {
              "RatePlanInclusionDescription": [
                {
                  "Name": "Free high speed internet connection",
                  "Code": 222
                }
              ]
            },
            "MealsIncluded": {
              "Breakfast": false,
              "Lunch": false,
              "Dinner": false,
              "MealPlanCode": 14
            },
            "RateInfo": {
              "StartDate": "2021-09-16",
              "EndDate": "2021-09-23",
              "AmountBeforeTax": 903,
              "AmountAfterTax": 1020.39,
              "AverageNightlyRate": 145.77,
              "CurrencyCode": "USD",
              "AdditionalFeesInclusive": false,
              "TaxInclusive": true,
              "Taxes": {
                "Amount": 117.39,
                "CurrencyCode": "USD",
                "TaxGroups": {
                  "TaxGroup": [
                    {
                      "Code": 36,
                      "Amount": 117.39,
                      "CurrencyCode": "USD",
                      "TaxDescription": {
                        "Text": ["VAT"]
                      }
                    }
                  ]
                }
              },
              "Fees": {
                "Amount": 36.12,
                "CurrencyCode": "USD",
                "FeeGroups": {
                  "FeeGroup": [
                    {
                      "Code": 3,
                      "Amount": 18.06,
                      "CurrencyCode": "USD",
                      "FeeDescription": {
                        "Text": ["Tourism fee"]
                      }
                    },
                    {
                      "Code": 3,
                      "Amount": 18.06,
                      "CurrencyCode": "USD",
                      "FeeDescription": {
                        "Text": ["local council tax"]
                      }
                    }
                  ]
                }
              },
              "CancelPenalties": {
                "CancelPenalty": [
                  {
                    "cancelable": true,
                    "Deadline": {
                      "AbsoluteDeadline": "2021-09-16T00:00:00"
                    },
                    "AmountPercent": {
                      "Amount": 129,
                      "CurrencyCode": "USD"
                    },
                    "PenaltyDescription": {
                      "Text": "You may cancel free of charge until 00:00 on the day of arrival. You will be charged the cost of the first night if you cancel after 00:00 on the day of arrival."
                    }
                  }
                ]
              },
              "Guarantee": {
                "GuaranteeType": "GUAR",
                "GuaranteesAccepted": {
                  "GuaranteeAccepted": [
                    {
                      "GuaranteeTypeCode": 5,
                      "PaymentCards": {
                        "PaymentCard": [
                          {
                            "CardCode": "IK",
                            "value": "MASTER CARD"
                          },
                          {
                            "CardCode": "VI",
                            "value": "VISA"
                          },
                          {
                            "CardCode": "MC",
                            "value": "MASTER CARD"
                          },
                          {
                            "CardCode": "AX",
                            "value": "AMERICAN EXPRESS"
                          },
                          {
                            "CardCode": "JC",
                            "value": "JCB CREDIT CARD"
                          },
                          {
                            "CardCode": "VS",
                            "value": "VISA"
                          },
                          {
                            "CardCode": "CA",
                            "value": "MASTERCARD"
                          },
                          {
                            "CardCode": "DC",
                            "value": "DINERS CLUB CARD"
                          },
                          {
                            "CardCode": "DS",
                            "value": "DISCOVER CARD"
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              "AdditionalDetails": {
                "AdditionalDetail": [
                  {
                    "Code": 8,
                    "CurrencyCode": "USD",
                    "Text": [
                      "Guests are required to show a photo identification and credit card upon check-in. Please note that all Special Requests are subject to availability and additional charges may apply. In response to Coronavirus (COVID-19), additional safety and sanitation measures are in effect at this property. Food & beverage services at this property may be limited or unavailable due to Coronavirus (COVID-19)."
                    ]
                  },
                  {
                    "Code": 29,
                    "CurrencyCode": "USD",
                    "Text": ["No prepayment is needed."]
                  }
                ]
              }
            }
          }
        ]
      }
    },
    {
      "RoomIndex": 1,
      "RoomType": "King Room with Sofa Bed - Booking.com rate",
      "RoomTypeCode": "King Room with Sofa Bed - Booking.com rate",
      "RoomViewCode": 20,
      "NonSmoking": true,
      "GuestRoomInfo": 42,
      "BedTypes": {
        "BedType": [
          {
            "Code": 3,
            "Count": 1
          }
        ]
      },
      "RoomDescription": {
        "Name": "King Room with Sofa Bed - Booking.com rate",
        "Text": [
          "A flat-screen TV with cable channels is offered in this room.  A coffee machine and work desk are included. "
        ]
      },
      "Amenities": {
        "Amenity": [
          {
            "Code": 19,
            "Description": "Coffee/Tea maker"
          },
          {
            "Code": 92,
            "Description": "Safe"
          },
          {
            "Code": 78,
            "Description": "Pay per view movies on TV"
          },
          {
            "Code": 107,
            "Description": "Telephone"
          },
          {
            "Code": 2,
            "Description": "Air conditioning"
          },
          {
            "Code": 50,
            "Description": "Hairdryer"
          },
          {
            "Code": 119,
            "Description": "Wake-up calls"
          },
          {
            "Code": 3,
            "Description": "Alarm clock"
          },
          {
            "Code": 55,
            "Description": "Iron"
          },
          {
            "Code": 5,
            "Description": "AM/FM radio"
          },
          {
            "Code": 28,
            "Description": "Desk"
          },
          {
            "Code": 270,
            "Description": "Seating area with sofa/chair"
          },
          {
            "Code": 85,
            "Description": "Private bathroom"
          },
          {
            "Code": 166,
            "Description": "Self-controlled heating/cooling system"
          },
          {
            "Code": 18,
            "Description": "Cable television"
          },
          {
            "Code": 15,
            "Description": "Bathtub/shower combination"
          },
          {
            "Code": 273,
            "Description": "Widescreen TV"
          },
          {
            "Code": 162,
            "Description": "Closets in room"
          },
          {
            "Code": 102,
            "Description": "Sofa bed"
          },
          {
            "Code": 142,
            "Description": "Shower"
          }
        ]
      },
      "Occupancy": {
        "Max": 4
      },
      "RatePlans": {
        "RatePlan": [
          {
            "RatePlanName": "King Room with Sofa Bed - Booking.com rate",
            "PrepaidIndicator": false,
            "AvailableQuantity": 5,
            "RateSource": "113",
            "RateKey": "MbDMEW4SyxlXczfzCII20gepQNzeWaeoqC1dKAxcJNm+ys5HWBct5o6zno6COZXuGIyWtSIFYRVBTybf2Mvvk3Ig7D+GaQpxNf+5i4a0pM2nse1dG4BirCMH5LdnrQmqcji5K5D59Nc+ujBaB3me1Z6QL7bLUinjzl61eKsTcWKb3eO4SQ3Pphxa/MK+jh/wdj5VcOHpXWFKaIZ8/DlImIyxHtTA0DcC9vVVz5cKtHmuHH8qJJJUZFFHZD5focLVFa9mbYkeotO5xggpaoY5MGiEY+xJKPSpWPeQ9f3A8Q9wBm0o/NRdEiXm+B14yxFu",
            "RatePlanDescription": {
              "Text": "King Room with Sofa Bed - Booking.com rate"
            },
            "RatePlanInclusions": {
              "RatePlanInclusionDescription": [
                {
                  "Name": "Free high speed internet connection",
                  "Code": 222
                }
              ]
            },
            "MealsIncluded": {
              "Breakfast": false,
              "Lunch": false,
              "Dinner": false,
              "MealPlanCode": 14
            },
            "RateInfo": {
              "StartDate": "2021-09-16",
              "EndDate": "2021-09-23",
              "AmountBeforeTax": 903,
              "AmountAfterTax": 1020.39,
              "AverageNightlyRate": 145.77,
              "CurrencyCode": "USD",
              "AdditionalFeesInclusive": false,
              "TaxInclusive": true,
              "Taxes": {
                "Amount": 117.39,
                "CurrencyCode": "USD",
                "TaxGroups": {
                  "TaxGroup": [
                    {
                      "Code": 36,
                      "Amount": 117.39,
                      "CurrencyCode": "USD",
                      "TaxDescription": {
                        "Text": ["VAT"]
                      }
                    }
                  ]
                }
              },
              "Fees": {
                "Amount": 36.12,
                "CurrencyCode": "USD",
                "FeeGroups": {
                  "FeeGroup": [
                    {
                      "Code": 3,
                      "Amount": 18.06,
                      "CurrencyCode": "USD",
                      "FeeDescription": {
                        "Text": ["Tourism fee"]
                      }
                    },
                    {
                      "Code": 3,
                      "Amount": 18.06,
                      "CurrencyCode": "USD",
                      "FeeDescription": {
                        "Text": ["local council tax"]
                      }
                    }
                  ]
                }
              },
              "CancelPenalties": {
                "CancelPenalty": [
                  {
                    "cancelable": true,
                    "Deadline": {
                      "AbsoluteDeadline": "2021-09-16T00:00:00"
                    },
                    "AmountPercent": {
                      "Amount": 129,
                      "CurrencyCode": "USD"
                    },
                    "PenaltyDescription": {
                      "Text": "You may cancel free of charge until 00:00 on the day of arrival. You will be charged the cost of the first night if you cancel after 00:00 on the day of arrival."
                    }
                  }
                ]
              },
              "Guarantee": {
                "GuaranteeType": "GUAR",
                "GuaranteesAccepted": {
                  "GuaranteeAccepted": [
                    {
                      "GuaranteeTypeCode": 5,
                      "PaymentCards": {
                        "PaymentCard": [
                          {
                            "CardCode": "IK",
                            "value": "MASTER CARD"
                          },
                          {
                            "CardCode": "VI",
                            "value": "VISA"
                          },
                          {
                            "CardCode": "MC",
                            "value": "MASTER CARD"
                          },
                          {
                            "CardCode": "AX",
                            "value": "AMERICAN EXPRESS"
                          },
                          {
                            "CardCode": "JC",
                            "value": "JCB CREDIT CARD"
                          },
                          {
                            "CardCode": "VS",
                            "value": "VISA"
                          },
                          {
                            "CardCode": "CA",
                            "value": "MASTERCARD"
                          },
                          {
                            "CardCode": "DC",
                            "value": "DINERS CLUB CARD"
                          },
                          {
                            "CardCode": "DS",
                            "value": "DISCOVER CARD"
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              "AdditionalDetails": {
                "AdditionalDetail": [
                  {
                    "Code": 8,
                    "CurrencyCode": "USD",
                    "Text": [
                      "Guests are required to show a photo identification and credit card upon check-in. Please note that all Special Requests are subject to availability and additional charges may apply. In response to Coronavirus (COVID-19), additional safety and sanitation measures are in effect at this property. Food & beverage services at this property may be limited or unavailable due to Coronavirus (COVID-19)."
                    ]
                  },
                  {
                    "Code": 29,
                    "CurrencyCode": "USD",
                    "Text": ["No prepayment is needed."]
                  }
                ]
              }
            }
          }
        ]
      }
    },
    {
      "RoomIndex": 1,
      "BedTypes": {
        "BedType": [
          {
            "Code": 5,
            "Count": 2
          }
        ]
      },
      "RoomDescription": {
        "Name": "Room, 2 Queen Beds, Non Smoking",
        "Text": [
          "2 Queen Beds / 392 sq feet / Internet - Free WiFi / Entertainment - 32-inch LCD TV with premium channels / Food & Drink - Coffee/tea maker / Sleep - Bed sheets / Bathroom - Private bathroom, a hair dryer, and a shower/tub combination / Practical - Free weekday newspaper, iron/ironing board, and desk; free cribs/infant beds available on request / Comfort - Climate-controlled air conditioning and daily housekeeping / Accessibility - Height-adjustable showerhead, closed-captioned TV, low-height door lock, grab bar in bathtub, lever door handles, low-height electrical outlets in bathroom, transfer shower, visual fire alarm, and low-height view port in door / Non-Smoking / Connecting/adjoining rooms can be requested, subject to availability / "
        ]
      },
      "Amenities": {
        "Amenity": [
          {
            "Code": 2,
            "Description": "Air conditioning"
          },
          {
            "Code": 55,
            "Description": "Iron"
          },
          {
            "Code": 56,
            "Description": "Ironing board"
          },
          {
            "Code": 26,
            "Description": "Cribs"
          },
          {
            "Code": 161,
            "Description": "Accessible room"
          },
          {
            "Code": 107,
            "Description": "Telephone"
          },
          {
            "Code": 28,
            "Description": "Desk"
          },
          {
            "Code": 74,
            "Description": "Non-smoking"
          },
          {
            "Code": 85,
            "Description": "Private bathroom"
          },
          {
            "Code": 19,
            "Description": "Coffee/Tea maker"
          },
          {
            "Code": 227,
            "Description": "Premium movie channels"
          },
          {
            "Code": 22,
            "Description": "Connecting rooms"
          },
          {
            "Code": 251,
            "Description": "TV"
          },
          {
            "Code": 73,
            "Description": "Newspaper"
          },
          {
            "Code": 208,
            "Description": "Maid service"
          },
          {
            "Code": 50,
            "Description": "Hairdryer"
          },
          {
            "Code": 15,
            "Description": "Bathtub/shower combination"
          }
        ]
      },
      "Occupancy": {
        "Max": 4
      },
      "RatePlans": {
        "RatePlan": [
          {
            "RatePlanName": "Room, 2 Queen Beds, Non Smoking",
            "RatePlanType": "13",
            "PrepaidIndicator": false,
            "AvailableQuantity": 5,
            "RateSource": "110",
            "RateKey": "MxPKxNSU7knFI+Sppy5UPU3em0FArHiRbneagFnr0GPGIha+kOT3/PMenIcardZU1mdty5YzOVqX7/SGEjbOijwv4gY0CB/mujn+xzT9JZon6SqLbchfJe6ZPASYy/LUgP4SS+fXh4Vc/EIfhrLMbFhn4ommiRRapnVF3uZk4KBFixmI/Kf2cFtp0Wwqa9PLG2N3Kn+DID/LU416noXultLCEDRss0+Cf4fB/QMueSGGLrftS6neyrPasj/Rii7lxQSKNKhHWh+g1eL4EQJTES40rtHW6un1SCLT/FyVs25Dsqbmcg06Q2DgLNiDxQxdn2VsO5Sj6z1+azQDhhIrSj/MIsyVx7vZqsmkkt7l497j0Q56CIaEYMtf1PkrbKZN7HP/1LD7sDnVlEwqyBW95GiYWopVYoUvkMDgGmtN4SVErI+xngKMH3irRjipLuzHMu4GPiTZqZZkCSC0Wn+cGHbHXsMcUeGFv2JMHcUAHI3JA35qBVcaCdyQOdV6apBUEEQvuNTs6JZAc0xUx31tUHBfNX3An2ADEJ9C4y95tvNvPAap6OUwq5LWFBYy8I+tG2Ni4Y8lqqGdMkrRm2cBx1OKhvRQaDP+Y4VIn5sjyoUc+MEckvqjxHZfWN4VjVsj5cDBzBgu7Jf13vhYR4JSJxiYAqkL+zlXc6nagG9Cu4+aWYcAtyvPdwLJji3/509jsIFIOHTA7smYUZU0MlC9AkWMg11jY7Tx6dGDjHp9jYipzB503VzAxi5uP5tXCywhvEGo4MLJydDkm9OSPuBh7jsRw+Z5PNO6Uk7SRfTged1PiTqpbvbIJWuJ8lf/xJnMbhrwSCxa4RlmwcXrZ4bYcsRqwCAHqxiog+MViaKn06SAHwghifPSBPqwvc1/bfBt",
            "RatePlanDescription": {
              "Text": "Room, 2 Queen Beds, Non Smoking"
            },
            "RatePlanInclusions": {
              "RatePlanInclusionDescription": [
                {
                  "Name": "Free high speed internet connection",
                  "Code": 222
                },
                {
                  "Name": "Complimentary wireless internet",
                  "Code": 286
                }
              ]
            },
            "RateInfo": {
              "StartDate": "2021-09-16",
              "EndDate": "2021-09-23",
              "AmountBeforeTax": 903,
              "AmountAfterTax": 1040.76,
              "AverageNightlyRate": 148.68,
              "CurrencyCode": "USD",
              "AdditionalFeesInclusive": false,
              "TaxInclusive": true,
              "Taxes": {
                "Amount": 137.76,
                "CurrencyCode": "USD",
                "TaxGroups": {
                  "TaxGroup": [
                    {
                      "Code": 201,
                      "Amount": 137.76,
                      "CurrencyCode": "USD",
                      "TaxDescription": {
                        "Text": [
                          "Tax Recovery Charges and Service Fees"
                        ]
                      }
                    }
                  ]
                }
              },
              "CancelPenalties": {
                "CancelPenalty": [
                  {
                    "cancelable": true,
                    "Deadline": {
                      "AbsoluteDeadline": "2021-09-15T23:59:00.000-05:00"
                    },
                    "AmountPercent": {
                      "NmbrOfNights": 1
                    }
                  }
                ]
              },
              "Guarantee": {
                "GuaranteeType": "GUAR",
                "GuaranteesAccepted": {
                  "GuaranteeAccepted": [
                    {
                      "GuaranteeTypeCode": 5,
                      "PaymentCards": {
                        "PaymentCard": [
                          {
                            "CardCode": "VI",
                            "value": "VISA"
                          },
                          {
                            "CardCode": "DC",
                            "value": "DINERS CLUB CARD"
                          },
                          {
                            "CardCode": "DS",
                            "value": "DISCOVER CARD"
                          },
                          {
                            "CardCode": "AX",
                            "value": "AMERICAN EXPRESS"
                          },
                          {
                            "CardCode": "JC",
                            "value": "JCB CREDIT CARD"
                          },
                          {
                            "CardCode": "MC",
                            "value": "MASTER CARD"
                          },
                          {
                            "CardCode": "UP",
                            "value": "UNION PAY"
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              "AdditionalDetails": {
                "AdditionalDetail": [
                  {
                    "Code": 7,
                    "Text": [
                      "If you fail to check-in for this reservation, or if you cancel or change this reservation after check-in, you may incur penalty charges at the discretion of the property of up to 100% of the booking value."
                    ]
                  },
                  {
                    "Code": 8,
                    "Text": [
                      "Special Instructions: Front desk staff will greet guests on arrival.  Due to COVID-19, this property’s hotel facilities or services options may be limited pursuant to local regulations.",
                      "  Extra-person charges may apply and vary depending on property policy / Government-issued photo identification and a credit card, debit card, or cash deposit may be required at check-in for incidental charges / Special requests are subject to availability upon check-in and may incur additional charges; special requests cannot be guaranteed / This property accepts credit cards and cash / Please note that cultural norms and guest policies may differ by country and by property; the policies listed are provided by the property / "
                    ]
                  },
                  {
                    "Code": 9,
                    "Text": [
                      "The following fees and deposits are charged by the property at time of service, check-in, or check-out. / Breakfast fee: between USD 5 and USD 14 per person (approximately) / Self parking fee: USD 7.00 per night / The above list may not be comprehensive. Fees and deposits may not include tax and are subject to change. / "
                    ]
                  },
                  {
                    "Code": 14,
                    "Text": [
                      "  The property has connecting/adjoining rooms, which are subject to availability and can be requested by contacting the property using the number on the booking confirmation. / This property advises that enhanced cleaning and guest safety measures are currently in place. / Disinfectant is used to clean the property. / Guests are provided with hand sanitizer. / This property affirms that it follows the cleaning and disinfection practices of Commitment to Clean (Marriott). / This property welcomes guests of all sexual orientations and gender identities (LGBTQ friendly). / "
                    ]
                  }
                ]
              }
            }
          }
        ]
      }
    },
    {
      "RoomIndex": 1,
      "GuestRoomInfo": 3,
      "BedTypes": {
        "BedType": [
          {
            "Code": 3,
            "Count": 1
          }
        ]
      },
      "RoomDescription": {
        "Name": "Suite, 1 Bedroom, Non Smoking",
        "Text": [
          "1 King Bed / Layout - Bedroom / Internet - Free WiFi / Entertainment - LCD television with premium channels / Food & Drink - Coffee/tea maker / Sleep - Bed sheets / Bathroom - Private bathroom, a hair dryer, and a shower/tub combination / Practical - Free weekday newspaper, iron/ironing board, and desk; free cribs/infant beds available on request / Comfort - Climate-controlled air conditioning and daily housekeeping / Accessibility - Height-adjustable showerhead, closed-captioned TV, low-height door lock, grab bar in bathtub, lever door handles, low-height electrical outlets in bathroom, transfer shower, visual fire alarm, and low-height view port in door / Non-Smoking / Connecting/adjoining rooms can be requested, subject to availability / "
        ]
      },
      "Amenities": {
        "Amenity": [
          {
            "Code": 2,
            "Description": "Air conditioning"
          },
          {
            "Code": 55,
            "Description": "Iron"
          },
          {
            "Code": 56,
            "Description": "Ironing board"
          },
          {
            "Code": 26,
            "Description": "Cribs"
          },
          {
            "Code": 161,
            "Description": "Accessible room"
          },
          {
            "Code": 107,
            "Description": "Telephone"
          },
          {
            "Code": 28,
            "Description": "Desk"
          },
          {
            "Code": 74,
            "Description": "Non-smoking"
          },
          {
            "Code": 85,
            "Description": "Private bathroom"
          },
          {
            "Code": 19,
            "Description": "Coffee/Tea maker"
          },
          {
            "Code": 227,
            "Description": "Premium movie channels"
          },
          {
            "Code": 22,
            "Description": "Connecting rooms"
          },
          {
            "Code": 251,
            "Description": "TV"
          },
          {
            "Code": 73,
            "Description": "Newspaper"
          },
          {
            "Code": 208,
            "Description": "Maid service"
          },
          {
            "Code": 50,
            "Description": "Hairdryer"
          },
          {
            "Code": 15,
            "Description": "Bathtub/shower combination"
          }
        ]
      },
      "Occupancy": {
        "Max": 4
      },
      "RatePlans": {
        "RatePlan": [
          {
            "RatePlanName": "Suite, 1 Bedroom, Non Smoking",
            "RatePlanType": "13",
            "PrepaidIndicator": false,
            "AvailableQuantity": 5,
            "RateSource": "110",
            "RateKey": "UeViXcwMh5H+eAU/4NmpkGxN0UhGqqbXH8J/oIvhHCi6E/51oT2JzLiQ3D9mZV6hjGnYm0dcbDCZU19Jn7WI0GOKbKon2Y/3cXPzSOMzcgYHeVsE8ub4tEqzIHgKOntrJk0airXNpDwMAAwlIXxmsslsGcUZr0usTLgiOoFpzGepy7g55JSaNf+3Sl2Ebjj/9ltSiAUTVCFEVTO1MvdDKof7JxgnOJo6wtAGQO/L5c0gruLbfISJJHN9aQGyd5h+q8XfYyjMaLMM50uodkgAWlTLZ+itVPIPnXmNwQO2SyRIEuFSCThJVczUBIgSwRJ70bc3xWw0Xo9QNASPAWq5uvaYkxsFEFFXr5mT3/ulaGn+ZzqhDmvblgMu/5q6u5VWsksnhg/hL19/BqaxG3aXewuvKqQ7ZRxgR+wQWpxm4EvB2n5kADJc7r4dYo6PNaFSQqwmPH1fxXhjc882iPzB65dJGAIid4GEPlKkc6piodzdjwAYpAwsh37mQbbvGO7c/97Y3Vk7iCfUXkECRwOAvTDbeKZn4fz9SQWQeMpjeP8E8u4MY0bbBR2yp73HosTUZaJN6mfbcwVlrNKZsMouqnABIR8rdMt1H11sefwKHFrjRaYMl7Lh0jixMg6pdIo6dsF/c5yQ78kGjyFmp08oFkt3ztrTupKm0T4fQCPHKlsO6KitVLdae6BhzojR7YhvCNQnu6nj2CEN2FGgpAeTJ3E4jiZ0PDMZ679ZMKnMHnTQIh2TipI8HO1RE70wX2B1QMHoXvpkNWTweMDH1ix24MUB1G0j4oWABihwW4x3dQDrLvW0apZYBdCudbON1uP8+o4Dze75uSyKUAeruMzLDy0v3ov/TJCIqCCkxx5H6mSOS9bxu6Rv8n5LrvxNkKAw",
            "RatePlanDescription": {
              "Text": "Suite, 1 Bedroom, Non Smoking"
            },
            "RatePlanInclusions": {
              "RatePlanInclusionDescription": [
                {
                  "Name": "Free high speed internet connection",
                  "Code": 222
                },
                {
                  "Name": "Complimentary wireless internet",
                  "Code": 286
                }
              ]
            },
            "RateInfo": {
              "StartDate": "2021-09-16",
              "EndDate": "2021-09-23",
              "AmountBeforeTax": 903,
              "AmountAfterTax": 1040.76,
              "AverageNightlyRate": 148.68,
              "CurrencyCode": "USD",
              "AdditionalFeesInclusive": false,
              "TaxInclusive": true,
              "Taxes": {
                "Amount": 137.76,
                "CurrencyCode": "USD",
                "TaxGroups": {
                  "TaxGroup": [
                    {
                      "Code": 201,
                      "Amount": 137.76,
                      "CurrencyCode": "USD",
                      "TaxDescription": {
                        "Text": [
                          "Tax Recovery Charges and Service Fees"
                        ]
                      }
                    }
                  ]
                }
              },
              "CancelPenalties": {
                "CancelPenalty": [
                  {
                    "cancelable": true,
                    "Deadline": {
                      "AbsoluteDeadline": "2021-09-15T23:59:00.000-05:00"
                    },
                    "AmountPercent": {
                      "NmbrOfNights": 1
                    }
                  }
                ]
              },
              "Guarantee": {
                "GuaranteeType": "GUAR",
                "GuaranteesAccepted": {
                  "GuaranteeAccepted": [
                    {
                      "GuaranteeTypeCode": 5,
                      "PaymentCards": {
                        "PaymentCard": [
                          {
                            "CardCode": "VI",
                            "value": "VISA"
                          },
                          {
                            "CardCode": "DC",
                            "value": "DINERS CLUB CARD"
                          },
                          {
                            "CardCode": "DS",
                            "value": "DISCOVER CARD"
                          },
                          {
                            "CardCode": "AX",
                            "value": "AMERICAN EXPRESS"
                          },
                          {
                            "CardCode": "JC",
                            "value": "JCB CREDIT CARD"
                          },
                          {
                            "CardCode": "MC",
                            "value": "MASTER CARD"
                          },
                          {
                            "CardCode": "UP",
                            "value": "UNION PAY"
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              "AdditionalDetails": {
                "AdditionalDetail": [
                  {
                    "Code": 7,
                    "Text": [
                      "If you fail to check-in for this reservation, or if you cancel or change this reservation after check-in, you may incur penalty charges at the discretion of the property of up to 100% of the booking value."
                    ]
                  },
                  {
                    "Code": 8,
                    "Text": [
                      "Special Instructions: Front desk staff will greet guests on arrival.  Due to COVID-19, this property’s hotel facilities or services options may be limited pursuant to local regulations.",
                      "  Extra-person charges may apply and vary depending on property policy / Government-issued photo identification and a credit card, debit card, or cash deposit may be required at check-in for incidental charges / Special requests are subject to availability upon check-in and may incur additional charges; special requests cannot be guaranteed / This property accepts credit cards and cash / Please note that cultural norms and guest policies may differ by country and by property; the policies listed are provided by the property / "
                    ]
                  },
                  {
                    "Code": 9,
                    "Text": [
                      "The following fees and deposits are charged by the property at time of service, check-in, or check-out. / Breakfast fee: between USD 5 and USD 14 per person (approximately) / Self parking fee: USD 7.00 per night / The above list may not be comprehensive. Fees and deposits may not include tax and are subject to change. / "
                    ]
                  },
                  {
                    "Code": 14,
                    "Text": [
                      "  The property has connecting/adjoining rooms, which are subject to availability and can be requested by contacting the property using the number on the booking confirmation. / This property advises that enhanced cleaning and guest safety measures are currently in place. / Disinfectant is used to clean the property. / Guests are provided with hand sanitizer. / This property affirms that it follows the cleaning and disinfection practices of Commitment to Clean (Marriott). / This property welcomes guests of all sexual orientations and gender identities (LGBTQ friendly). / "
                    ]
                  }
                ]
              }
            }
          }
        ]
      }
    }
  ]
}

export default data;