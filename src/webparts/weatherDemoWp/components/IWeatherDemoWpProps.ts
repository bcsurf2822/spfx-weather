import { HttpClient } from "@microsoft/sp-http";

export interface IWeatherDemoWpProps {
  description: string;
  httpClient: HttpClient;
}
