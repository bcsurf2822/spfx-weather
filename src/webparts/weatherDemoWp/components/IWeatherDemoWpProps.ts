import { HttpClient } from "@microsoft/sp-http";
import { SPFI } from "@pnp/sp";
export interface IWeatherDemoWpProps {
  description: string;
  httpClient: HttpClient;
  sp: SPFI;
  locationListId: string;
}

//does it work
