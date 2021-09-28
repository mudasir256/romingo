const GetHotelBySearch = `
    query PropertiesInput(
      $adults: Int!,
      $checkIn: Date!,
      $checkOut: Date!,
      $cityId: String!,
      $children: [ChildInput!]!,
    ) {
      properties(
        input: {
          adults: $adults,
          children: $children,
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
        location {
          latitude
          longitude
        }
        neighborhood
        romingoScore
        dogAmenities
        lowestAveragePrice
      }
    }
  `;

const GetCities = `
    query{
      cities {
        id
        name
        center {
          latitude
          longitude
        }
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
  `;

const GetHotelDetail = `
    query (
      $id: String!,
      $checkIn: Date!,
      $checkOut: Date!,
      $adults: Int!,
      $children: [ChildInput!]!
    ) {
      property(input: {
        propertyId: $id,
        checkIn: $checkIn,
        checkOut: $checkOut,
        adults: $adults,
        children: $children
      })
      {
        id
        sabreId
        name
        desc
        addressLine1
        city {
          id
          name
          center {
            latitude
            longitude
          }
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
        location {
          latitude
          longitude
        }
        neighborhood
        romingoScore
        dogAmenities
        amenities {
          code
          desc
          value
          free
        }
        featuredImageURL
        imageURLs
        sabreImageURLs
        lowestAveragePrice,
        nearbyActivities {
          id
          activityType {
            id
            name
          }
          name
          overview
          desc
          addressLine1
          location {
            latitude
            longitude
          }
          price
          distanceInMeters
        }
        rooms {
          type
          nonSmoking
          beds {
            code
            desc
            count
          }
          desc
          amenities {
            code
            desc
            value
            accessible
            free
          }
          maxOccupants
          priceKey
          breakfastIncluded
          lunchIncluded
          dinnerIncluded
          averagePrice
          totalPrice
          averagePriceAfterTax
          totalPriceAfterTax
          feesIncluded
          fees {
            totalAmount
            fees {
              amount
              desc
            }
          }
          cancellationPolicy {
            refundable
            cutOffAt
            cutOffUnit
            cutOffMultiplier
            cutOffReference
            desc
          }
        }
      }
    }
  `;

const GetStripeClientSecret = `
  query(
    $amount: Float!
  ){
    stripePaymentIntentClientSecret(input: {amount: $amount})
  }
`;

export { GetHotelBySearch, GetCities, GetHotelDetail, GetStripeClientSecret };
