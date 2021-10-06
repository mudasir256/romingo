const data = {
  hotel: {
    featuredImageURL:
      "http://vcmp-hotels.cert.sabre.com/image/upload/f_auto,q_auto:best,t_vcmp_medium/hotel/i/48961/kaoe46zlotylxgsevuxe.jpg",
    name: "Staybridge Suites Las Colinas",
    addressLine1: "1201 Executive Circle, Irving, TX",
    score: 5,
    price: 139.99,
    amenities: ["dog park nearby", "pet friendly rooftop"],
  },
  bookingDetails: {
    checkIn: "8/1/2021",
    checkOut: "8/9/2021",
    guests: {
      adults: 2,
      dogs: 1,
      children: 3,
    },
    roomType: "King Suite",
  },
  priceDetails: [
    { label: "Price", amount: 419.97 },
    { label: "State Tax", amount: 25.2 },
    { label: "City Tax", amount: 25.2 },
    { label: "Total", amount: 470.37 },
  ],
  checkinDescription: {
    title: "Check in Instruction",
    description:
      "Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos at vix ad putent delectus delicata usu. Vidit dissentiet eos cu eum an brute copiosae hendrerit. Eos erant dolorum an. Per facer affert ut. Mei iisque mentitum moderatius cu. Sit munere facilis accusam eu dicat falli consulatu at vis. Te facilisis mnesarchum qui posse omnium mediocritatem est cu. Modus argumentum ne qui tation efficiendi in eos. Ei mea falli legere efficiantur et tollit aliquip debitis mei.",
  },
  finePrint: {
    title: "Fine Print",
    description:
      "Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos at vix ad putent delectus delicata usu. Vidit dissentiet eos cu eum an brute copiosae hendrerit. Eos erant dolorum an. Per facer affert ut. Mei iisque mentitum moderatius cu. Sit munere facilis accusam eu dicat falli consulatu at vis. Te facilisis mnesarchum qui posse omnium mediocritatem est cu. Modus argumentum ne qui tation efficiendi in eos. Ei mea falli legere efficiantur et tollit aliquip debitis mei.",
  },
  room: {
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
                  "Cancelable": true,
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
  }
};

export default data;
