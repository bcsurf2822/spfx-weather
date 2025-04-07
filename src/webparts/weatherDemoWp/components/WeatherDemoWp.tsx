import * as React from "react";
import styles from "./WeatherDemoWp.module.scss";
import type { IWeatherDemoWpProps } from "./IWeatherDemoWpProps";
import { GeoCodeService } from "../services/GeoCodeService";
import { IGeocodingResponse } from "../models/IWeatherDemoGeocodeResponse";
import CityPicker from "./CityPicker";
// import { escape } from '@microsoft/sp-lodash-subset';

interface IWeatherDemoWpState {
  geocodingData: IGeocodingResponse[];
  selectedCity: string | null;
  selectedState: string | null;
}

export default class WeatherDemoWp extends React.Component<
  IWeatherDemoWpProps,
  IWeatherDemoWpState
> {
  private geoCodeService: GeoCodeService;

  constructor(props: IWeatherDemoWpProps) {
    super(props);
    console.log("WeatherDemoWp component initialized with props:", props);
    this.geoCodeService = new GeoCodeService(props.httpClient);
    this.state = {
      geocodingData: [],
      selectedCity: null,
      selectedState: null,
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
      const data = await this.geoCodeService.getCoordinates(
        lowerCity,
        lowerState,
        "us"
      );
      console.log("Geocoding data received:", data);
      this.setState({ geocodingData: data });
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
    }
  };

  public render(): React.ReactElement<IWeatherDemoWpProps> {
    const { geocodingData, selectedCity, selectedState } = this.state;

    return (
      <section className={`${styles.weatherDemoWp}`}>
        <h1>Weather Demo Web Part</h1>
        <CityPicker
          onCitySelected={this.handleLocationSelected}
          context={this.props.context}
          locationListId={this.props.locationListId}
        />
        {geocodingData.length > 0 && selectedCity && selectedState ? (
          <div>
            <h2>
              Geocoding Data for {selectedCity}, {selectedState}
            </h2>
            <pre>{JSON.stringify(geocodingData[0], null, 2)}</pre>
          </div>
        ) : (
          <p>Select a location to view weather data...</p>
        )}
      </section>
    );
  }
}
