// import { HttpClient, HttpClientResponse } from "@microsoft/sp-http";
// export class WeatherService implements IWeatherService {
//   private readonly apiKey: string;

//   private readonly getWeatherUrl: string =
//     "http://api.openweathermap.org/data/2.5/weather";

//   constructor() {
//     this.apiKey = process.env.WEATHER_API_KEY;
//   }

// Example:  https://api.openweathermap.org/data/2.5/weather?lat=39.2667819&lon=-74.644881&units=imperial&appid=8eef0dd91e33a7ff8a4e2c68df0dd20e

//Response:
// {"coord":{"lon":-74.6449,"lat":39.2668},"weather":[{"id":502,"main":"Rain","description":"heavy intensity rain","icon":"10d"}],"base":"stations","main":{"temp":42.94,"feels_like":38.17,"temp_min":42.03,"temp_max":43.99,"pressure":1008,"humidity":93,"sea_level":1008,"grnd_level":1008},"visibility":6686,"wind":{"speed":8.01,"deg":32,"gust":14},"rain":{"1h":7.49},"clouds":{"all":100},"dt":1744029295,"sys":{"type":2,"id":2006197,"country":"US","sunrise":1744021987,"sunset":1744068463},"timezone":-14400,"id":4503351,"name":"Ocean City","cod":200}
//   public async getWeather(
//     lat: number,
//     lon: number
//   ): Promise<HttpClientResponse> {
//     const url = `${this.getWeatherUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
//     return await this.httpClient.get(url);
//   }
// }
