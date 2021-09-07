const GetHotelBySearch = `
    query PropertiesInput(
      $adults: Int!,
      $children: Int!,
      $dogs: Int!,
      $checkIn: Date!,
      $checkOut: Date!,
    ) {
      properties(
        input: {
          adults: $adults,
          children: $children,
          dogs: $dogs,
          cityId: "",
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
        romingoScore
        dogAmenities
        lowestPrice
      }
    }
  `
export { GetHotelBySearch }