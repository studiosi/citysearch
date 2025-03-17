"use server"

export interface GeoDBDataCityType {
  id: number;
  wikiDataId?: string
  type: "CITY"
  city?: string
  name?: string
  country?: string
  countryCode?: string
  region?: string
  regionCode?: string
  regionWdId?: string
  latitude?: number
  longitude?: number
  population?: number
}

interface GeoDBLinkType {
  href: string,
  rel: string,
}

interface GeoDBMetadataType {
  currentOffset: number,
  totalCount: number,
}

interface GeoDBCitiesResponseType {
  links: GeoDBLinkType[];
  data: GeoDBDataCityType[];
  metadata: GeoDBMetadataType;
}

const GeoDBHeaders: Record<string, string | null> = {
  'x-rapidapi-host': process.env?.GEODB_CITIES_HOST || null,
  'x-rapidapi-key': process.env?.GEODB_CITIES_KEY || null,
};

const getBaseHeaders = () => {
  const headers = new Headers();
  for(const [key, value] of Object.entries(GeoDBHeaders)) {
    if(value === null) {
      console.error(`GeoDBClient - getBaseHeaders - ERROR [Configuration error, missing environment variable ${key}]`);
      return null;
    }
    headers.set(key, value);
  }
  return headers;
}

const getSuggestedCitiesByPrefix = async (countryCode: string, prefix: string) => {
  const url = new URL(`${process.env.GEODB_CITIES_BASE_URL}/geo/cities`);
  url.searchParams.append("namePrefix", prefix);
  url.searchParams.append("countryIds", countryCode);
  url.searchParams.append("types", "CITY");
  url.searchParams.append("limit", "10");
  url.searchParams.append("sort", "-population");
  const headers = getBaseHeaders();

  if(headers === null) {
    console.error(`GeoDBClient - getSuggestedCitiesByPrefix - ERROR [Configuration error, missing environment variable]`);
    return [];
  }

  const options: RequestInit = {
    method: 'GET',
    headers,
  };

  let response;

                                                                                                                                                                                                                                                                                                                                                                                          try {
    response = await fetch(url, options);
  } catch (error) {
    if(error instanceof Error) {
      console.error(`GeoDBClient - getSuggestedCitiesByPrefix - ERROR [${error.message}]`);
    }
    return [];
  }

  if(response.ok) {
    const result: GeoDBCitiesResponseType = await response.json();
    return result.data;
  } else {
    console.error(`GeoDBClient - getSuggestedCitiesByPrefix - ERROR [${response.statusText}]`)
    return [];
  }
}


export { getSuggestedCitiesByPrefix }