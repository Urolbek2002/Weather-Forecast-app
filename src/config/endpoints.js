const API_KEY = '4bc38e9b01c1b977daeb2f7bce015969';

const ENDPOINTS = {
  forecast: (city) =>
    `/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=uz`,

  citySuggestions: (query) =>
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`,

  cityName: (lat, lon) =>
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`,
};

export default ENDPOINTS;
