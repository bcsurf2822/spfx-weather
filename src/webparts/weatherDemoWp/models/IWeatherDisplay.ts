//Response:
// {"coord":{"lon":-74.6449,"lat":39.2668},"weather":[{"id":502,"main":"Rain","description":"heavy intensity rain","icon":"10d"}],"base":"stations","main":{"temp":42.94,"feels_like":38.17,"temp_min":42.03,"temp_max":43.99,"pressure":1008,"humidity":93,"sea_level":1008,"grnd_level":1008},"visibility":6686,"wind":{"speed":8.01,"deg":32,"gust":14},"rain":{"1h":7.49},"clouds":{"all":100},"dt":1744029295,"sys":{"type":2,"id":2006197,"country":"US","sunrise":1744021987,"sunset":1744068463},"timezone":-14400,"id":4503351,"name":"Ocean City","cod":200}

export interface IWeatherDisplay
 {
  temperature: number;
  pressure: number;
  humidity: number;
}
