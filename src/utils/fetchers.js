export const fetchWithParams = async (urlStr, params) => {
  const url = new URL(urlStr);
  url.search = new URLSearchParams(params).toString();

  const res = await fetch(url).then((res) => res.json());
  return res;
};

export const fetchCityWeather = async (cityName) => {
  const url = 'http://api.openweathermap.org/data/2.5/weather';

  const params = {
    appid: process.env.REACT_APP_OPENWEATHER_API_KEY,
    q: cityName,
    lang: 'en',
    units: 'metric',
  };

  const res = await fetchWithParams(url, params);

  if (res.cod === 200) {
    return res;
  } else {
    const err = { code: res.cod, message: res.message };
    throw err;
  }
};
