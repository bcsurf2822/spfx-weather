import { HttpClient, HttpClientResponse } from "@microsoft/sp-http";
import { IGeocodingResponse } from "../models/IWeatherDemoGeocodeResponse";

export class GeoCodeService {
  private readonly apiKey: string;
  private readonly getCoordinatesUrl: string =
    "http://api.openweathermap.org/geo/1.0";

  constructor(private httpClient: HttpClient) {
    this.apiKey = process.env.WEATHER_API_KEY;
  }

  public async getCoordinates(
    cityName: string,
    stateCode: string,
    countryCode: string
  ): Promise<IGeocodingResponse[]> {
    const url = `${this.getCoordinatesUrl}/direct?q=${cityName},${stateCode},${countryCode}&limit=1&appid=${this.apiKey}`;
    const response = await this.httpClient.get(
      url,
      HttpClient.configurations.v1
    );
    return response.json();
  }
}
