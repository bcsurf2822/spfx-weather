import * as React from "react";
import styles from "./WeatherDemoWp.module.scss";
import type { IWeatherDemoWpProps } from "./IWeatherDemoWpProps";
import { GeoCodeService } from "../services/GeoCodeService";
import { IGeocodingResponse } from "../models/IWeatherDemoGeocodeResponse";
// import { escape } from '@microsoft/sp-lodash-subset';

export default class WeatherDemoWp extends React.Component<IWeatherDemoWpProps> {
  private geoCodeService: GeoCodeService;
  public state: {
    geocodingData: IGeocodingResponse[];
  };

  constructor(props: IWeatherDemoWpProps) {
    super(props);
    console.log("WeatherDemoWp component initialized with props:", props);
    this.geoCodeService = new GeoCodeService(props.httpClient);
    this.state = {
      geocodingData: [],
    };
  }

  public async componentDidMount(): Promise<void> {
    console.log("WeatherDemoWp component mounted, fetching geocoding data...");
    try {
      const data = await this.geoCodeService.getCoordinates(
        "marmora",
        "nj",
        "us"
      );
      console.log("Geocoding data received:", data);
      this.setState({ geocodingData: data });
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
    }
  }

  public render(): React.ReactElement<IWeatherDemoWpProps> {
    const { geocodingData } = this.state;

    return (
      <section className={`${styles.weatherDemoWp}`}>
        <h1>Weather Demo Web Part</h1>
        {geocodingData.length > 0 ? (
          <div>
            <h2>Geocoding Data for Marmora, NJ</h2>
            <pre>{JSON.stringify(geocodingData[0], null, 2)}</pre>
          </div>
        ) : (
          <p>Loading geocoding data...</p>
        )}
      </section>
    );
  }
}
