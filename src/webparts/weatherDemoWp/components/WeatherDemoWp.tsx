import * as React from "react";
import styles from "./WeatherDemoWp.module.scss";
import type { IWeatherDemoWpProps } from "./IWeatherDemoWpProps";
import { GeoCodeService } from "../services/GeoCodeService";
import { WeatherService } from "../services/WeatherService";
import { IGeocodingResponse } from "../models/IGeocodeResponse";
import { IWeatherResponse } from "../models/IWeatherResponse";
import CityPicker from "./CityPicker";

interface IWeatherDemoWpState {
  geocodingData: IGeocodingResponse[];
  weatherData: IWeatherResponse | null;
  selectedCity: string | undefined;
  selectedState: string | undefined;
}

export default class WeatherDemoWp extends React.Component<
  IWeatherDemoWpProps,
  IWeatherDemoWpState
> {
  private geoCodeService: GeoCodeService;
  private weatherService: WeatherService;

  constructor(props: IWeatherDemoWpProps) {
    super(props);
    console.log("WeatherDemoWp component initialized with props:", props);
    this.geoCodeService = new GeoCodeService(props.httpClient);
    this.weatherService = new WeatherService(props.httpClient);
    this.state = {
      geocodingData: [],
      weatherData: null,
      selectedCity: undefined,
      selectedState: undefined,
    };
  }

  private handleLocationSelected = async (
    city: string,
    state: string
  ): Promise<void> => {
    const lowerCity = city.toLowerCase();
    const lowerState = state.toLowerCase();

    this.setState({ selectedCity: lowerCity, selectedState: lowerState });

    try {
      const geoData = await this.geoCodeService.getCoordinates(
        lowerCity,
        lowerState,
        "us"
      );

      if (geoData.length > 0) {
        const { lat, lon } = geoData[0];
        const weatherData = await this.weatherService.getWeather(lat, lon);
        this.setState({ weatherData, geocodingData: geoData });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  public render(): React.ReactElement<IWeatherDemoWpProps> {
    const { weatherData, selectedCity, selectedState } = this.state;

    return (
      <section className={styles.weatherDemoWp}>
        <h1>Weather Demo Web Part</h1>
        <CityPicker
          sp={this.props.sp}
          onCitySelected={this.handleLocationSelected}
        />
        {weatherData && selectedCity && selectedState ? (
          <div>
            <h2>
              Weather for {selectedCity}, {selectedState}
            </h2>
            <div>
              <p>Temperature: {weatherData.main.temp}°F</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Pressure: {weatherData.main.pressure} hPa</p>
            </div>
          </div>
        ) : (
          <p>Select a location to view weather data...</p>
        )}
      </section>
    );
  }
}
