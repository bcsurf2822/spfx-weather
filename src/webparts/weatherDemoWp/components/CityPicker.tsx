import * as React from "react";
import { ICityPickerProps } from "./ICityPickerProps";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

interface ILocation {
  Id: number;
  Title: string;
  State: string;
  City: string;
}

interface IState {
  locations: ILocation[];
  loading: boolean;
  error: string | null;
  selectedLocation: ILocation | null;
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
      error: null,
      selectedLocation: null,
    };
  }

  public async componentDidMount(): Promise<void> {
    try {
      const response: SPHttpClientResponse =
        await this.props.context.spHttpClient.get(
          `${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Locations')/items?$select=Id,Title,State,City`,
          SPHttpClient.configurations.v1
        );

      if (!response.ok) {
        throw new Error(`Error fetching locations: ${response.statusText}`);
      }

      const data = await response.json();
      this.setState({
        locations: data.value,
        loading: false,
      });
    } catch (error) {
      this.setState({
        error: error.message,
        loading: false,
      });
    }
  }

  private handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedId = parseInt(event.target.value);
    const selectedLocation =
      this.state.locations.find((loc) => loc.Id === selectedId) || null;

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
              {location.Title}
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
