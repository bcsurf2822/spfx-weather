import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "WeatherDemoWpWebPartStrings";
import WeatherDemoWp from "./components/WeatherDemoWp";
import { IWeatherDemoWpProps } from "./components/IWeatherDemoWpProps";
import { getSP } from "./services/sp";

export interface IWeatherDemoWpWebPartProps {
  description: string;
  locationListId: string;
}

export default class WeatherDemoWpWebPart extends BaseClientSideWebPart<IWeatherDemoWpWebPartProps> {
  public async onInit(): Promise<void> {
    await super.onInit();
    getSP(this.context);
  }

  public render(): void {
    const element: React.ReactElement<IWeatherDemoWpProps> =
      React.createElement(WeatherDemoWp, {
        description: this.properties.description,
        httpClient: this.context.httpClient,
        sp: getSP(this.context),
        locationListId: this.properties.locationListId || "Locations",
      });

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
                PropertyPaneTextField("locationListId", {
                  label: "Location List ID",
                  value: "Locations",
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
