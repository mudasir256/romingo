const GetHotelBySearch = `
    query PropertiesInput(
      $adults: Int!,
      $checkIn: Date!,
      $checkOut: Date!,
      $cityId: String!,
      $children: [ChildInput!]!,
      $dogs: Int!
      $allows_big_dogs: Int
    ) {
      properties(
        input: {
          adults: $adults,
          children: $children,
          cityId: $cityId,
          checkIn: $checkIn,
          checkOut: $checkOut,
          dogs: $dogs,
          allows_big_dogs:$allows_big_dogs
        }
      ) {
        id
        listingsPagePromoText
        featuredImageURL
        imageURLs
        googlePlaceId
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
        lowestTotalPriceAfterTax
        petFeePolicy {
          maxPets
          maxWeightPerPetInLBS
          desc
          perPet
          perNight
          breakup
          totalFees
        }
        alias
        page_rank
        allows_big_dogs
      }
    }
  `;

const GetHotelRackBySearch = `
    query PropertiesInput(
      $adults: Int!,
      $checkIn: Date!,
      $checkOut: Date!,
      $cityId: String!,
      $children: [ChildInput!]!,
      $dogs: Int!,
      $allows_big_dogs: Int
    ) {
      propertiesByCorporateDiscount(
        input: {
          adults: $adults,
          children: $children,
          cityId: $cityId,
          checkIn: $checkIn,
          checkOut: $checkOut,
          dogs: $dogs,
          allows_big_dogs:$allows_big_dogs
        }
      ) {
        id
        featuredImageURL
        imageURLs
        name
        alias
        page_rank
        allows_big_dogs
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
        lowestTotalPriceAfterTax
        petFeePolicy {
          maxPets
          maxWeightPerPetInLBS
          desc
          perPet
          perNight
          breakup
          totalFees
        }
      }
    }
  `;

const GetCities = `
    query{
      cities {
        id
        name
        zoom
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
      $children: [ChildInput!]!,
      $dogs: Int!,
      $alias: String!,
    ) {
      property(input: {
        propertyId: $id,
        checkIn: $checkIn,
        checkOut: $checkOut,
        adults: $adults,
        children: $children,
        dogs: $dogs,
        alias: $alias,
      })
      {
        id
        detailsPagePromoText
        checkoutPagePromoText
        googlePlaceId
        sabreId
        name
        desc
        alias
        addressLine1
        lowestAveragePrice
        petFeePolicy {
          maxPets
          maxWeightPerPetInLBS
          desc
          perPet
          perNight
          breakup
          totalFees
        }
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
          romingoMatch
          areaInSquareFeet
          featuredImageURL
          imageURLs
          name
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
            amount
            desc
          }
          totalFees
          cancelationPolicy {
            cancelable
            deadlineLocal
            deadlineUnit
            deadlineMultiplier
            deadlineReference
            desc
          }
        }
      }
    }
  `;

const CreatePaymentIntent = `
mutation CreatePaymentIntentMutation(
  $createPaymentIntentInput: CreatePaymentIntentInput!
) {
  createPaymentIntent(input: $createPaymentIntentInput) {
    paymentIntent {
      amount
      clientSecret
    }
    totalPriceAfterTax
    priceDifference
    priceChanged
  }
}
`;

const CreateSetupIntent = `
mutation CreateSetupIntentMutation(
  $createSetupIntentInput: CreateSetupIntentInput!
) {
  createSetupIntent(input: $createSetupIntentInput) {
    clientSecret
    customerId
  }
}
`;

const CreateBooking = `
mutation CreateBookingMutation($createBookingInput: CreateBookingInput!) {
  createBooking(input: $createBookingInput) {
    totalPriceAfterTax
    priceDifference
    priceChanged
    booking {
      id
      sabreConfirmationId
      propertyConfirmationId
      faunaDocId
    }
  }
}
`;

const CreateBooking2 = `
mutation CreateBooking2Mutation($createBooking2Input: CreateBooking2Input!) {
  createBooking2(input: $createBooking2Input) {
    priceChanged
    priceDifference
    totalPriceAfterTax
    booking {
      id
      sabreConfirmationId
      propertyConfirmationId
      faunaDocId
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

export {
  GetHotelBySearch,
  GetHotelRackBySearch,
  GetCities,
  GetHotelDetail,
  CreatePaymentIntent,
  CreateSetupIntent,
  CreateBooking,
  CreateBooking2,
  GetStripeClientSecret,
};
