import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ICityPickerProps {
  onCitySelected: (city: string, state: string) => void;
  context: WebPartContext;
  locationListId: string;
}
