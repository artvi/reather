export const getLocation = () => {
  return new Promise((res, rej) => navigator.geolocation.getCurrentPosition(res, rej));
}
  
