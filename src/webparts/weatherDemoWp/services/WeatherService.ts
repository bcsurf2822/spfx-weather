import { HttpClient } from "@microsoft/sp-http";
import { IWeatherResponse } from "../models/IWeatherResponse";

export class WeatherService {
  private readonly apiKey: string;
  private readonly getWeatherUrl: string =
    "https://api.openweathermap.org/data/2.5/weather";

  constructor(private httpClient: HttpClient) {
    this.apiKey = process.env.SPFX_WEATHER_API_KEY || "";
    console.log(
      "WeatherService initialized with API Key:",
      this.apiKey ? "Present" : "Missing"
    );
  }

  public async getWeather(
    cityName: string,
    stateCode: string,
    countryCode: string
  ): Promise<IWeatherResponse[]> {
    const url = `${this.getWeatherUrl}?q=${cityName},${stateCode},${countryCode}&appid=${this.apiKey}`;
    console.log("Making request to URL:", url);
    const response = await this.httpClient.get(
      url,
      HttpClient.configurations.v1
    );
    const data = await response.json();
    console.log("Weather response:", data);
    return data;
  }
}
