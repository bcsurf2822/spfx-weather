export interface IWeatherData {
    coord: {
        lon: number;
        lat: number;
      };
      weather: Array<{
        id: number;
        main: string;
        description: string;
        icon: string;
      }>;
      base: string;
      main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level?: number;
        grnd_level?: number;
      };
      visibility: number;
      wind: {
        speed: number;
        deg: number;
        gust?: number;
      };
      clouds: {
        all: number;
      };
      dt: number; // Date timestamp (Unix, UTC)
      sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number; // Sunrise timestamp (Unix, UTC)
        sunset: number;  // Sunset timestamp (Unix, UTC)
      };
      timezone: number; // Shift in seconds from UTC
      id: number;
      name: string;
      cod: number;
    }
    
    // Weather display model (processed data ready for display)
    export interface IWeatherDisplayModel {
      location: {
        name: string;
        country: string;
        coordinates: {
          latitude: number;
          longitude: number;
        };
      };
      current: {
        temp: number;
        tempCelsius: number; // Converted from Kelvin
        tempFahrenheit: number; // Converted from Kelvin
        feelsLike: number;
        feelsLikeCelsius: number; // Converted from Kelvin
        feelsLikeFahrenheit: number; // Converted from Kelvin
        humidity: number;
        pressure: number;
        visibility: number;
        description: string;
        icon: string;
        windSpeed: number;
        windDirection: number;
        cloudiness: number;
      };
      sun: {
        sunrise: Date;
        sunset: Date;
        dayLength: number; // in minutes
      };
      lastUpdated: Date;
    }
    
    // Weather service interface
    export interface IWeatherService {
      getWeatherByCoordinates(lat: number, lon: number): Promise<IWeatherResponse>;
      getWeatherByCity(cityName: string): Promise<IWeatherResponse>;
      processWeatherData(data: IWeatherResponse): IWeatherDisplayModel;
    }
    
    // Weather web part properties
    export interface IWeatherWebPartProps {
      apiKey: string;
      defaultLocation: string;
      units: 'metric' | 'imperial';
      refreshInterval: number; // in minutes
      showForecast: boolean;
      colorScheme: 'light' | 'dark' | 'auto';
    }
    
    // Weather component props
    export interface IWeatherComponentProps {
      weatherData: IWeatherDisplayModel | null;
      isLoading: boolean;
      error: string | null;
      onRefresh: () => void;
      onLocationChange: (location: string) => void;
      units: 'metric' | 'imperial';
      colorScheme: 'light' | 'dark' | 'auto';
    }