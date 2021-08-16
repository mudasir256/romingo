interface ISearch {
  city: string;
  checkIn: string;
  checkOut: string;
  occupants: {
    adults: number;
    children: number;
    dogs: number;
  }
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
}

type SearchState = {
  search: ISearch
}

type SearchAction = {
  type: string
  search: ISearch
}

type UserState = {
  user: IUser,
  authenticated: boolean;
}

type UserAction = {
  type: string
  user: IUser
}

type HotelListState = {
  hotels: IHotel[]
}

type HotelAction = {
  type: string;
  hotels: IHotel[]
}

type DetailState = {
  detail: IHotelDetails
};

type DetailAction = {
  type: string
  detail: IHotelDetails
}

type SearchDispatchType = (args: SearchAction) => SearchAction

type UserDispatchType = (args: UserAction) => UserAction

type HotelListDispatchType = (args: HotelAction) => HotelAction

type HotelDetailDispatchType = (args: DetailAction) => DetailAction