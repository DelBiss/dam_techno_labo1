import { Position } from "@capacitor/geolocation";
import { Geocoding, MeteoData } from "./openWeather";

export type ParamsWeatherPosition = Pick<Position["coords"], "latitude" | "longitude">;

export interface MeteoService {
    getWeatherByPosition(position: ParamsWeatherPosition): Promise<MeteoData>;
    getWeatherByGeocoding(geocode:Geocoding): Promise<MeteoData>;
    getWeatherByLocation(location: string): Promise<MeteoData>;
    
    geoCode(location:string): Promise<Geocoding>;
    reverseGeoCode(position:ParamsWeatherPosition): Promise<Geocoding>;
}