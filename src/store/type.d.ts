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

type SearchDispatchType = (args: SearchAction) => SearchAction

type UserDispatchType = (args: UserAction) => UserAction