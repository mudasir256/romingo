
import { useState, useEffect } from "react";
import { WatchQueryFetchPolicy, gql, useLazyQuery, useQuery } from "@apollo/client";
import { GetHotelsByLocation } from "../constants/constants";
import moment from 'moment';
import { useHistory } from "react-router-dom";

interface SearchParams {
    search: any,
    maxWaitInSeconds: any,
    childrenAge: any,
}


const useHotelsQuery = (searchParams: SearchParams) => {
    const {
        search,
        maxWaitInSeconds,
        childrenAge,
    } = searchParams;

    const queryParams = {
        adults: search.occupants.adults + '',
        checkIn: parseInt(moment(search.checkIn).format('x')),
        checkOut: parseInt(moment(search.checkOut).format('x')),
        children: childrenAge,
        latitude: search.lat,
        longitude: search.lng,
    }
    const getHotelsQuery = gql`${GetHotelsByLocation({...queryParams, maxWaitInSeconds: 10})}`;
    const getHotelsLimitedQuery = gql`${GetHotelsByLocation({...queryParams, maxWaitInSeconds: maxWaitInSeconds})}`;
    const options: { fetchPolicy: WatchQueryFetchPolicy } = {
        fetchPolicy: 'network-only', // TODO
    }

    const [hotels, setHotels] = useState<Array<any>>([]);
    const [prevHotels, setPrevHotels] = useState<Array<any>>();
    const [sessionId, setSessionId] = useState<string | null>(sessionStorage.getItem('sessionId'));

    const getHotelsLimitedResults = useQuery(getHotelsLimitedQuery, options);
    const [executeQuery, getHotelsFullResults] = useLazyQuery(getHotelsQuery, options);
   
    useEffect(() => {
        if(!getHotelsLimitedResults.loading && getHotelsLimitedResults.data) {
            setSessionId(getHotelsLimitedResults.data.getHotels.sessionId);
            setPrevHotels(getHotelsLimitedResults.data.getHotels.hotels);
            setHotels(getHotelsLimitedResults.data.getHotels.hotels);
            executeQuery();
        }
    }, [getHotelsLimitedResults]);
    
    useEffect(() => {
        if(!getHotelsFullResults.loading && getHotelsFullResults.data) {
            setSessionId(getHotelsFullResults.data.getHotels.sessionId);
            setHotels(getHotelsFullResults.data.getHotels.hotels);
        }
    }, [getHotelsFullResults]);

    return {hotels, loading: getHotelsLimitedResults.loading, loadingMore: getHotelsFullResults.loading, sessionId, prevHotels};
}

export default useHotelsQuery;