import { SPFI } from "@pnp/sp";

export interface ICityPickerProps {
  onCitySelected: (city: string, state: string) => void;
  sp: SPFI;
}
