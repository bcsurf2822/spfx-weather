import * as React from "react";
import { ICityPickerProps } from "./ICityPickerProps";
import { ComboBoxListItemPicker } from "@pnp/spfx-controls-react/lib/ListItemPicker";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

interface ILocation {
  Id: number;
  Title: string;
  State: string;
  City: string;
}

interface IState {
  locations: ILocation[];
  loading: boolean;
  error: string | undefined;
  selectedLocation: ILocation | undefined;
}

export default class CityPicker extends React.Component<
  ICityPickerProps,
  IState
> {
  constructor(props: ICityPickerProps) {
    super(props);
    this.state = {
      locations: [],
      loading: true,
      error: undefined,
      selectedLocation: undefined,
    };
  }

  public async componentDidMount(): Promise<void> {
    try {
      const items = await this.props.sp.web.lists
        .getByTitle("Locations")
        .items.select("Id", "Title", "State", "City")();

      console.log(" Locations :", items);

      this.setState({
        locations: items,
        loading: false,
      });
    } catch (error: unknown) {
      console.error("Location Error:", error);
      this.setState({
        error: error instanceof Error ? error.message : String(error),
        loading: false,
      });
    }
  }

  private handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedId = parseInt(event.target.value);
    const selectedLocation =
      this.state.locations.find((loc) => loc.Id === selectedId) || undefined;

    this.setState({ selectedLocation });
    if (selectedLocation) {
      this.props.onCitySelected(selectedLocation.City, selectedLocation.State);
    }
  };

  public render(): React.ReactElement<ICityPickerProps> {
    const { locations, loading, error, selectedLocation } = this.state;

    if (loading) {
      return <div>Loading locations...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div>
        <h3>Select a Location</h3>
        <select onChange={this.handleLocationChange}>
          <option value="">Select a location</option>
          {locations.map((location) => (
            <option key={location.Id} value={location.Id}>
              {location.City}, {location.State}
            </option>
          ))}
        </select>
        {selectedLocation && (
          <div>
            <p>City: {selectedLocation.City}</p>
            <p>State: {selectedLocation.State}</p>
          </div>
        )}
      </div>
    );
  }
}
