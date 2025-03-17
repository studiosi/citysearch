"use client"

import React, {createContext, Dispatch, ReactNode, useEffect, useState} from "react";
import {GeoDBDataCityType, getSuggestedCitiesByPrefix} from "@/lib/GeoDBClient";
import {SuggestionCache} from "@/lib/SuggestionCache";

interface CitySearchGlobalStateContextType {
  cityData: GeoDBDataCityType[] | null;
  prefix: string | null;
  setPrefix: Dispatch<React.SetStateAction<string | null>>;
  countryCode: string | null;
  setCountryCode: Dispatch<React.SetStateAction<string | null>>;
  cityId: number | null;
  setCityId: Dispatch<React.SetStateAction<number | null>>;
}

const CitySearchGlobalStateContext = createContext<CitySearchGlobalStateContextType>({
  cityData: null,
  prefix: null,
  setPrefix: () => {},
  countryCode: null,
  setCountryCode: () => {},
  cityId: null,
  setCityId: () => {}
});

const CACHE_DURATION_MS: number = 3600000; // 1 hour

const CitySearchGlobalStateProvider = (
  {children} : {children: ReactNode}
): ReactNode => {
  const [cityData, setCityData] = useState<GeoDBDataCityType[] | null>(null);
  const [prefix, setPrefix] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [cityId, setCityId] = useState<number | null>(null);

  useEffect(() => {

    const getSuggestedCityData = async () => {
      if(countryCode === null || prefix === null || prefix.length < 3) {
        setCityData(null);
        return;
      }

      let newCityData;
      let addToCache = false;

      const result = await SuggestionCache.cache
        .where('[countryCode+prefix]')
        .equals([countryCode, prefix])
        .first();

      if(result?.content) {
        newCityData = JSON.parse(result.content);
        if(Date.now() - result.createdAt >= CACHE_DURATION_MS) {
          // The cached data is too old, we delete it
          SuggestionCache.cache.delete(result.id);
          addToCache = true;
        }
      } else {
        // If it does not, request
        newCityData = await getSuggestedCitiesByPrefix(countryCode, prefix);
        addToCache = true;
      }

      if(addToCache) {
        SuggestionCache.cache.add({
          countryCode,
          prefix,
          content: JSON.stringify(newCityData),
          createdAt: Date.now()
        })
      }

      if(newCityData.length === 0) {
        setCityData(null);
      } else {
        setCityData(newCityData);
      }
    }

    void getSuggestedCityData();

  }, [countryCode, prefix]);

  return (
    <CitySearchGlobalStateContext.Provider value={
      {
        cityData,
        prefix,
        setPrefix,
        countryCode,
        setCountryCode,
        cityId,
        setCityId
      }
    }>
      {children}
    </CitySearchGlobalStateContext.Provider>
  )
}

export { CitySearchGlobalStateContext, CitySearchGlobalStateProvider }