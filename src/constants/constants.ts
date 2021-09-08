const GetHotelBySearch = `
    query PropertiesInput(
      $adults: Int!,
      $dogs: Int!,
      $checkIn: Date!,
      $checkOut: Date!,
      $cityId: String!,
      $children: [ChildInput!]!,
    ) {
      properties(
        input: {
          adults: $adults,
          children: $children,
          dogs: $dogs,
          cityId: $cityId,
          checkIn: $checkIn,
          checkOut: $checkOut,
        }
      ) {
        id
        sabreId
        featuredImageURL
        name
        addressLine1
        city {
          id
          name
          state {
            id
            code
            name
            country {
              id
              name
            }
          }
        }
        zipCode
        latitude
        longitude
        neighborhood
        romingoScore
        dogAmenities
        lowestPrice
      }
    }
  `

const GetCities = `
    query{
      cities {
        id
        name
        state {
          id
          code
          name
          country {
            id
            name
          }
        }
      }
    }
  `
export { GetHotelBySearch, GetCities }