import { Geocoding, MeteoData } from "./openWeather";

export interface MeteoService {
    getWeatherByPosition(lat: number, lon: number, geo?:Geocoding): Promise<MeteoData>;
    getWeatherByCity(city: string): Promise<MeteoData>;
    reverseGeoCode(lat: number, lon: number): Promise<Geocoding>;
}