interface ISearch {
  city: string;
  checkIn: string;
  checkOut: string;
  occupants: {
    adults: number;
    children: number;
    dogs: number;
  };
}

interface IUser {
  id: string;
  token: string;
  email: string;
}

interface IHotel {
  image: string;
  name: string;
  location: string;
  score: number;
  price: number;
  amenities: string[];
}

interface IRoom {
  RoomIndex: number;
  BedTypes: {
    BedType: {
      Code: number;
      Count: number;
    }[]
  };
  RoomDescription: {
    Name: string;
    Text: string[];
  };
  Amenities: {
    Amenity: {
      Code: number;
      Description: string;
    }[]
  };
  Occupancy: {
    Max: number
  };
  RatePlans: {
    RatePlan: {
      RatePlanName: string;
      RatePlanType?: string;
      PrepaidIndicator: boolean;
      AvailableQuantity: number;
      RateSource: string;
      RateKey: string;
      RatePlanDescription: {
        Text: string;
      };
      RatePlanInclusions: {
        RatePlanInclusionDescription: {
          Name: string;
          Code: number
        }[]
      };
      RateInfo: {
        StartDate: string;
        EndDate: string;
        AmountBeforeTax: number;
        AmountAfterTax: number;
        AverageNightlyRate: number;
        CurrencyCode: string;
        AdditionalFeesInclusive: boolean;
        TaxInclusive: boolean;
        Rates?: {
          Rate: {
            StartDate: string;
            EndDate: string;
            AmountBeforeTax: number;
            AmountAfterTax: number;
            CurrencyCode: string;
          }[]
        },
        Taxes: {
          Amount: number;
          CurrencyCode: string;
          Tax?: {
            StartDate: string;
            EndDate: string;
            Amount: number;
            CurrencyCode: string
          }[];
          TaxGroups: {
            TaxGroup: {
              Code: number;
              Amount: number;
              CurrencyCode: string;
              TaxDescription: {
                Text: string[]
              }
            }[]
          };
        }
        CancelPenalties: {
          CancelPenalty: {
            Refundable: boolean;
            Deadline: {
              AbsoluteDeadline: string;
            };
            AmountPercent: {
              NmbrOfNights?: number;
              Amount?: number;
              CurrencyCode?: string;
            }
          }[]
        };
        Guarantee: {
          GuaranteeType: string;
          GuaranteesAccepted: {
            GuaranteeAccepted: {
              GuaranteeTypeCode: number;
              PaymentCards?: {
                PaymentCard: {
                  CardCode: string;
                  value: string;
                }[]
              }
            }[]
          };
          GuaranteeDescription?: {
            Text: string[];
          };
        }
        AdditionalDetails: {
          AdditionalDetail: {
            Code: number;
            Text: string[];
          }[]
        }
      }
    }[]
  }
}

interface IHotelDetails {
  name: string;
  mainImg: string;
  location: {
    lat: string;
    lon: string;
    address: string;
  };
  gallery: string[];
  score: number;
  defaultDescription?: string;
  cancellation?: boolean;
  cancelPenalty?: {
    refundable: boolean;
    deadline: { absoluteDeadline: string };
    amountPercent: { amount: number; currencyCode: string };
  }[];
  dogAmenitiesTitle: string;
  roomList: {
    value: number;
    description: string;
  }[];
  amenitiesTitle: string;
  amenities?: {
    code: number;
    description: string;
    value: string;
  }[];
  nearby: { text: string; distance: number }[];
  rooms: IRoom[]
}

interface ICheckout {
  hotel: IHotel;
  bookingDetails: {
    checkIn: string;
    checkOut: string;
    guests: {
      adults: number;
      children: number;
      dogs: number;
    };
    roomType: string;
  };
  priceDetails: { label: string; amount: number }[];
  checkinDescription: { title: string; description: string };
  finePrint: { title: string; description: string };
  room: IRoom
}

type SearchState = {
  search: ISearch;
};

type SearchAction = {
  type: string;
  search: ISearch;
};

type UserState = {
  user: IUser;
  authenticated: boolean;
};

type UserAction = {
  type: string;
  user: IUser;
};

type HotelListState = {
  hotels: IHotel[];
};

type HotelAction = {
  type: string;
  hotels: IHotel[];
};

type DetailState = {
  detail: IHotelDetails;
};

type DetailAction = {
  type: string;
  detail: IHotelDetails;
};

type CheckoutState = {
  checkout: ICheckout;
};

type CheckoutAction = {
  type: string;
  checkout: ICheckout;
};

type SearchDispatchType = (args: SearchAction) => SearchAction;

type UserDispatchType = (args: UserAction) => UserAction;

type HotelListDispatchType = (args: HotelAction) => HotelAction;

type HotelDetailDispatchType = (args: DetailAction) => DetailAction;

type CheckoutDispatchType = (args: CheckoutAction) => CheckoutAction;
