import { Geocoding, MeteoData, OneCall } from "@/interface_type/openWeather";
import { MeteoService } from "../interface_type/service";


export class OpenWeatherMap implements MeteoService {
    static apikey = "40e5acf77e565342161ed556173fd482";
    static local = "fr"
    static system = "metric"
    getWeatherByPosition(lat: number, lon: number, geo?:Geocoding): Promise<MeteoData> {
        console.log("Get weather for " + lat + " " + lon);
        return new Promise(
            (resolve, reject) => {
                const url = `http://api.openweathermap.org/data/2.5/onecall?appid=${OpenWeatherMap.apikey}&lat=${lat}&lon=${lon}&lang=${OpenWeatherMap.local}&units=${OpenWeatherMap.system}`;
                
                fetch(url)
                .then(
                    (response) => response.json() as Promise<OneCall>
                )
                .then(
                    (data) => {
                        if (geo) {
                            resolve({
                                geocoding: geo,
                                ...data
                            });
                        } else {
                            this.reverseGeoCode(lat, lon)
                            .then(
                                (geocoding) => {
                                    resolve({
                                        geocoding: geocoding,
                                        ...data
                                    });
                                }
                            )
                        }
                    }
                ).catch(
                    (error) => {
                        reject(error);
                    }
                );
            }
        );    
    }
    getWeatherByCity(city: string): Promise<MeteoData> {
        return new Promise((resolve, reject) => {
            console.log("Get weather for " + city);
            this.geoCode(city).then((geocoding) => {
                this.getWeatherByPosition(geocoding.lat, geocoding.lon,geocoding).then((data) => {
                    resolve(data);
                }).catch((error) => {
                    reject(error);
                });
            }).catch((error) => {
                reject(error);
            });
        });
    }

    geoCode(city: string): Promise<Geocoding> {
        return new Promise((resolve, reject) => {
            const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${OpenWeatherMap.apikey}`;

            fetch(url)
            .then(
                (response) => {
                    return response.json() as Promise<Geocoding[]>;
                }
            )
            .then(
                (data) => {
                    resolve(data[0]);
                }
            ).catch((error) => {
              reject(error);
            });
          });
    }

    reverseGeoCode(lat: number, lon: number): Promise<Geocoding> {
        return new Promise((resolve, reject) => {
            const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${OpenWeatherMap.apikey}`;
            fetch(url)
            .then(
                (response) => {
                    return response.json() as Promise<Geocoding[]>;
                }
            )
            .then(
                (data) => {
                    resolve(data[0]);
                }
            ).catch((error) => {
              reject(error);
            });
          });
    }
}

