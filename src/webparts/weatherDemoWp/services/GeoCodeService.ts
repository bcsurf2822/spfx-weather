import { HttpClient } from "@microsoft/sp-http";
import { IGeocodingResponse } from "../models/IWeatherDemoGeocodeResponse";
import { environment } from "../../../config/environment";

export class GeoCodeService {
  private readonly apiKey: string = environment.weatherApiKey;
  private readonly getCoordinatesUrl: string =
    "http://api.openweathermap.org/geo/1.0";

  constructor(private httpClient: HttpClient) {
    console.log(
      "GeoCodeService initialized with API Key:",
      this.apiKey ? "Present" : "Missing"
    );
  }

  public async getCoordinates(
    cityName: string,
    stateCode: string,
    countryCode: string
  ): Promise<IGeocodingResponse[]> {
    const url = `${this.getCoordinatesUrl}/direct?q=${cityName},${stateCode},${countryCode}&limit=1&appid=${this.apiKey}`;
    console.log("Making request to URL:", url);
    const response = await this.httpClient.get(
      url,
      HttpClient.configurations.v1
    );
    const data = await response.json();
    console.log("Geocoding response:", data);
    return data;
  }
}
