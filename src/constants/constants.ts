const GetHotelBySearchNew = `
  query SearchHotelsInput(
    $checkInDate: String!
    $checkOutDate: String! 
    $latitude: String!
    $longitude: String!
    $adults: Int!
    $children: Int!
  ) {
    getHotels(
      input: {
        adults: $adults,
        children: $children,
        checkInDate: $checkInDate,
        checkOutDate: $checkOutDate,
        latitude: $latitude,
        longitude: $longitude
      }
    ) {
      sessionId
      hotels {
        Address
        GeoLocation
        ID
        StarRating
        address
        DisplayName
        DefaultImage
        zipCode
        name
      }
    }
  }
`

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
        amenities {
          code
          desc
        }
        starRating
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

const createBookingTravolutionary = `
mutation createBookingTravolutionary(
  $createBookingInputTravolutionary: createBookingInputTravolutionary!
) {
  createBookingUsingTravolutionary(input: $createBookingInputTravolutionary) {
    response
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

const GetPropertyDetails = `
  query GetPropertyDetailInput($alias: String!) {
    getPropertyDetails(input: { alias: $alias }) {
      addressLine1        
      alias          
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
      checkoutPagePromoText
      desc              
      detailsPagePromoText 
      dogAmenities    
      featuredImageURL 
      googlePlaceId      
      id             
      imageURLs      
      name             
      romingoScore
      listingsPagePromoText
      page_rank          
      allows_big_dogs
      hotelEmail    
      hotelAlternativeEmail
      sabreId
      zipCode
      lowestAveragePrice
      petFeePolicy {
        maxPets
        maxWeightPerPetInLBS
        desc
        perPet
        perNight
        breakup
      }
    }
  }
`

const GetSabreRoomReservations = `
  query GetAvailableRoomsInput(
    $alias: String!,
    $adults: Int!,
    $checkIn: Date!,
    $checkOut: Date!,
    $children: [ChildInput!]!,
    $dogs: Int!
  ) {
    getSabreRoomReservationAvailabilty(
      input: {
        alias: $alias,
        adults: $adults,
        children: $children,
        checkIn: $checkIn,
        checkOut: $checkOut,
        dogs: $dogs,
      }
    ) {
      id
      sabreId
      alias
      name
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
`


const GetReservationDetails =`
  query GetReservationDetailsInput (
    $email: String!
    $propertyConfirmationId: String!
  ) {
    getReservationDetails (
      input: {
        email: $email
        propertyConfirmationId: $propertyConfirmationId
      }
    ) {
      response
    }
  }
`;

const CancelBooking = `
  mutation cancelBookingUsingTravolutionary($cancelBookingInput: CancelBookingTravolutionaryInput!) {
    cancelBookingUsingTravolutionary(input: $cancelBookingInput) {
      response
    }
  }
`;

const GetBookingDetails = `
  query GetBookingDetailsInput ($id: String) {
    getBookingDetails (input: {id: $id}) {
      id
      propertyId
      paymentIntentId
      cardId
      sabreConfirmationId
      propertyConfirmationId
      faunaDocId
      firstName
      lastName
      email
      mobileNumber
      mobileCountryCallingCode
      checkInAtLocal
      checkOutAtLocal
      deadlineLocal
      data
      captured
      cancellationFeePrice
      intentType
      setupIntentObject
      customerId
      reservationStatus
    }
  }
`;

const ModifyBookingDetails = `
  mutation ModifyBooking  (
    $cancelBookingInput: CancelBookingInput!
    $createBooking2Input: CreateBooking2Input!
  ) {
    cancelBooking(input: $cancelBookingInput) {
      status
    }

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
`

const GetSabrePropertyDetails = `
    query (
      $alias: String!
    ) {
      getSabrePropertyDetails(input: {
        alias: $alias,
      })
      {
        alias
        sabreId
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
        amenities {
          code
          desc
        }
        addressLine1
        location {
          latitude
          longitude
        }
    }
  }
`;

const GetHomePageProperty = `
  query GetHomePagePropertiesThree {
    getHomepagePropertiesThree {
      hotelName
      fullAddressLine
      alias
      description
      petPolicyDescription
      amenities
      lat
      lng
      images
      petsAllowed
      petFee
      petFeeValue
      petFeeDetail
      petSize
      petAllowance
      unattendedPets
      petAmenities
      petReliefArea
      catPolicy
      starRating
      numberOfReviews
      travolutionaryId
      city
      state
    }
  }
`

const LocationProperties = `
  query  (
    $cityId: String!
  ) {
    propertiesByLocation(input: {
      cityId: $cityId,
    }) {
      id
      addressLine1        
      alias          
      featuredImageURL 
      googlePlaceId      
      id             
      imageURLs      
      name             
      romingoScore
      allows_big_dogs
      hotelEmail    
      hotelAlternativeEmail
      sabreId
      zipCode
      lowestAveragePrice
      listingsPagePromoText
      petFeePolicy {
        maxPets
        maxWeightPerPetInLBS
        desc
        perPet
        perNight
        breakup
      }
    }
  }
`

const TripReviews = `
  query TripReviews(
    $hotel_id: String
  ) {
    tripReviews(input: {
      hotel_id: $hotel_id
    }) {
      name
      pic
      description
      date
      rating
    }
  }
`

const TripHotelList = `
  query TripHotelList(
    $hotel_ids: String!,
    $hotel_id_type: String,
    $checkIn: Date!,
    $checkOut: Date!,
    $num_adults: String,
    $num_rooms: String,
    $currency: String
  ) {
  tripHotelList(input: {
    hotel_ids: $hotel_ids,
    hotel_id_type: $hotel_id_type,
    checkIn: $checkIn,
    checkOut: $checkOut,
    num_adults: $num_adults,
    num_rooms: $num_rooms,
    currency: $currency
  }) {
    success
    error_msg
    data {
      requestId
      results {
        hotelId
        strikeThroughDisplayPrice
        availability
        offers {
          availability
          displayName
          displayPrice
          price
          logo
          clickUrl
        }
      }
      pricingType
      isComplete
      invalidHotelIds
    }
  }
}
`

const UserProfile = `
  query(
    $email: String!
    $id: String
  ) {
    getUserProfile(input: {
      email: $email, 
      id: $id
    }) {
      email
      name
      pets {
        petName
        petDescription
        breedType
      }
    }
  }
`

const GetHotelsByLocation = (adults: number, checkIn: number, checkOut: number, children: number, latitude: number, longitude: number, hotelIds = []) => { return `query {
  getHotels(input: {adults: ${adults},
  checkInDate: "${checkIn}",
  checkOutDate: "${checkOut}",
  children: "${children}",
  latitude: "${latitude}",
  longitude: "${longitude}",
  hotelIds: "${hotelIds}"
}) {
    sessionId
    hotels {
      ID
      Address 
      DefaultImage
      DisplayName
      GeoLocation
      StarRating
      SuppliersLowestPackagePrices
      description
      petsAllowed
      petFee
      petFeeValue
      petFeeDetail
      petSize
      petAllowance
      unattendedPets
      petAmenities
      petReliefArea
      catPolicy
      starRating
      numberOfReviews
      city
      state
      zipcode
      amenities
      alias
      images
      addressLine
    }
  }
}
`}

const getPackages = (adults: number, checkIn: number, checkOut: number, children: number, latitude: number, longitude: number, hotelIds = []) => {
  return `query {
    getHotelDetails(input: {adults: ${adults},
      checkInDate: "${checkIn}",
      checkOutDate: "${checkOut}",
      children: "${children}",
      latitude: "${latitude}",
      longitude: "${longitude}",
      hotelIds: "${hotelIds}"}) {
      hotelDetails
      Result
      RoomsContent
      sessionId
    }
  }
  `
}

const getHotelDetailById = (hotelId) => {
  return `query {
    getHotelDetailById(input: {
      hotelId: "${hotelId}",
    }) {
      hotelName
      fullAddressLine
      description
      petPolicyDescription
      amenities
      lat
      lng
      images
      petsAllowed
      petFee
      petFeeValue
      petFeeDetail
      petSize
      petAllowance
      unattendedPets
      petAmenities
      petReliefArea
      catPolicy
      starRating
      numberOfReviews
      travolutionaryId
      tripAdvisorId
      city
      state
    }
  }`
}

const getCancellationPolicy = (hotelId: number, sessionId: string, packageId: string) => {
  return `query {
    getCancellationPolicyMultiPackages(input: {
      hotelId: "${hotelId}",
      sessionId: "${sessionId}",
      packageId: "${packageId}"
    }) {
      BookingRemarks
      CancellationPolicies
    }
  }`
}

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
  GetPropertyDetails,
  GetSabreRoomReservations,
  GetReservationDetails,
  CancelBooking,
  GetBookingDetails,
  ModifyBookingDetails,
  GetSabrePropertyDetails,
  GetHomePageProperty,
  LocationProperties,
  UserProfile,
  TripHotelList,

  //v2
  GetHotelBySearchNew,
  GetHotelsByLocation,
  getPackages,
  createBookingTravolutionary,
  getHotelDetailById,
  getCancellationPolicy,
  TripReviews,
};
