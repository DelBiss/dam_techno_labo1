import { Geocoding, MeteoData, OneCall } from "@/interface_type/openWeather";
import { MeteoService, ParamsWeatherPosition } from "../interface_type/service";

function encodeDataToURL (url:string,data: { [x: string]: string | number | boolean; }) : string {
    const urlParams = Object
                        .keys(data)
                        .map(value => `${value}=${encodeURIComponent(data[value])}`)
                        .join('&');
    return  `${url}?${urlParams}`;
 }

export class OpenWeatherMap implements MeteoService {
    static apikey = "40e5acf77e565342161ed556173fd482";
    static local = "fr"
    static system = "metric"

    async getWeatherByGeocoding(geocode:Geocoding): Promise<MeteoData> {
        const url = 'https://api.openweathermap.org/data/2.5/onecall';

        const params = {
                lat: geocode.lat,
                lon: geocode.lon,
                appid: OpenWeatherMap.apikey,
                lang: OpenWeatherMap.local,
                units: OpenWeatherMap.system
            };

        const response = await fetch(encodeDataToURL(url,params))
        const data = await response.json() as OneCall
        return {
            geocoding: geocode,
            ...data
        } ;
    }
    async getWeatherByPosition(position: ParamsWeatherPosition): Promise<MeteoData> {
        const geoCode = await this.reverseGeoCode(position);
        return await this.getWeatherByGeocoding(geoCode);
    }

    async getWeatherByLocation(location: string): Promise<MeteoData> {
        const geoCode = await this.geoCode(location);
        return await this.getWeatherByGeocoding(geoCode);
    }

    async geoCode(location: string): Promise<Geocoding> {
        const url = 'http://api.openweathermap.org/geo/1.0/direct';
        
            
        const params = {
            appid: OpenWeatherMap.apikey,
            q: location
        }
        

        const response = await fetch(encodeDataToURL(url,params))
        const data = await response.json() as Geocoding[]
        return data[0];
    }

    async reverseGeoCode(position:ParamsWeatherPosition): Promise<Geocoding> {
        const url = 'http://api.openweathermap.org/geo/1.0/reverse';

        const params = {
                appid: OpenWeatherMap.apikey,
                lat: position.latitude,
                lon: position.longitude,
        };

        const response = await fetch(encodeDataToURL(url,params))
        const data = await response.json() as Geocoding[]
        return data[0];
    }
}

