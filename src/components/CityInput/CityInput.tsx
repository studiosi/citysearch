"use client"

import styles from "./CityInput.module.scss";
import {
  ChangeEventHandler,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import {GeoDBDataCityType} from "@/lib/GeoDBClient";
import {DebouncedState, useDebouncedCallback} from "use-debounce";
import {CitySearchGlobalStateContext} from "@/components/CitySearchGlobalState/CitySearchGlobalState";

const CityInput = (): ReactNode => {
  const [showSuggestions, setShowSuggestions] = useState<boolean>(true);
  const cityInputRef = useRef<HTMLInputElement | null>(null);
  const globalData = useContext(CitySearchGlobalStateContext);


  const composeCityName = (city: GeoDBDataCityType) => {
    return `${city.name}, ${city.region || "N/A"}, ${city.country || "N/A"}`;
  }

  const onSuggestionClick: MouseEventHandler<HTMLDivElement> = (evt) => {
    evt.preventDefault();
    if (cityInputRef.current && globalData.cityData !== null) {
      const cityId = parseInt(evt.currentTarget.dataset?.cityId || "-1");
      const city = globalData.cityData.find((cityData) => cityId === cityData.id);
      if (city?.name !== undefined) {
        cityInputRef.current.value = city.name;
        globalData.setCityId(city.id);
        globalData.setPrefix(city.name);
      }
    }
    setShowSuggestions(false);
  }

  const getSuggestions = async () => {
    if(!cityInputRef.current) return;
    const prefix = cityInputRef.current.value;
    globalData.setPrefix(prefix.trim());
    if(globalData.cityData !== null && globalData.cityData.length > 0) {
      setShowSuggestions(true);
    }
  }

  const onCityInputChange: DebouncedState<ChangeEventHandler<HTMLInputElement>> = useDebouncedCallback(getSuggestions, 800);

  useEffect(() => {
    globalData.setPrefix(null);
    globalData.setCityId(null);
    if(cityInputRef.current !== null) cityInputRef.current.value = "";
  }, [globalData.countryCode]);

  const onInputClick: MouseEventHandler<HTMLInputElement> = useCallback((evt) => {
    evt.preventDefault();
    if(cityInputRef.current !== null && cityInputRef.current.value.length >= 3) {
      setShowSuggestions(true);
    }
  }, [])

  return globalData.countryCode !== null && (
    <div className={styles.cityInput}>
      <label htmlFor="input-city">City</label>
      <input
        onClick={onInputClick}
        onChange={onCityInputChange}
        ref={cityInputRef}
        name="input-city"
        id="input-city"
        type="text"
      />
      {showSuggestions && globalData.cityData && globalData.cityData.length > 0 && (
        <div className={styles.cityInputSuggestionContainer}>
          {globalData.cityData.map((city) => {
            return (
              <div
                onClick={onSuggestionClick}
                className={styles.cityInputSuggestion}
                key={`city-suggestion-${city.id}`}
                data-city-id={city.id}
              >
                <span>{composeCityName(city)}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
}

export default CityInput;