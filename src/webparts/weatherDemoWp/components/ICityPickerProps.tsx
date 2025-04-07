import { SPFI } from "@pnp/sp";
// comment
export interface ICityPickerProps {
  onCitySelected: (city: string, state: string) => void;
  sp: SPFI;
}
