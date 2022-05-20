export interface Geocoding {
    name: string
    local_names: {[key:string]: string}
    lat: number
    lon: number
    country: string
    state?: string
}

export interface MeteoData extends OneCall { 
    geocoding: Geocoding
}

export interface OneCall {
    lon: number 
    lat: number
    timezone: string
    timezone_offset: number
    current: {
        dt: number
        sunrise: number
        sunset: number
        temp: number
        feels_like: number
        pressure: number
        humidity: number
        dew_point: number
        clouds: number
        uvi: number
        visibility: number
        wind_speed: number
        wind_gust: number
        wind_deg: number
        rain?: {
                '1h'?: number
        }
        snow?: {
            '1h'?: number
        }
        weather: {
            id: number
            main: string
            description: string
            icon: string
        }[]
    }
    minutely: {
        dt: number
        precipitation: number
    }[]
    hourly: {
        dt: number
        temp: number
        feels_like: number
        pressure: number
        humidity: number
        dew_point: number
        uvi: number
        clouds: number
        visibility: number
        wind_speed: number
        wind_gust: number
        wind_deg: number
        pop: number
        rain?: {
                '1h'?: number
        }
        snow?: {
            '1h'?: number
        }
        weather: {
            id: number
            main: string
            description: string
            icon: string
        }[]
    }[]
    daily: {
        dt: number
        sunrise: number
        sunset: number
        moonrise: number
        moonset: number
        moon_phase: number
        temp: {
            morn: number
            day: number
            eve: number
            night: number
            min: number
            max: number
        }
        feels_like: {
            morn: number
            day: number
            eve: number
            night: number
        }
        pressure: number
        humidity: number
        dew_point: number
        wind_speed: number
        wind_gust: number
        wind_deg: number
        clouds: number
        uvi: number
        rain?: number
        snow?: number
        weather: {
            id: number
            main: string
            description: string
            icon: string
        }[]
    }[]
}