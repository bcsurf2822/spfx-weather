import * as React from "react";
import styles from "./WeatherDemoWp.module.scss";
import type { IWeatherDemoWpProps } from "./IWeatherDemoWpProps";
// import { escape } from '@microsoft/sp-lodash-subset';
import { getRandomString } from "@pnp/core";
import PnPTelemetry from "@pnp/telemetry-js";

export default class WeatherDemoWp extends React.Component<IWeatherDemoWpProps> {
  public render(): React.ReactElement<IWeatherDemoWpProps> {
    const randomString = getRandomString(30);
    const telemetry = PnPTelemetry.getInstance();
    telemetry.trackEvent("WeatherDemoWp", {
      randomString: randomString,
    });
    return (
      <section className={`${styles.weatherDemoWp}`}>
        <h1>Weather Demo Web Part</h1>
        <p>Random String: {randomString}</p>
      </section>
    );
  }
}
