import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Navbar, Row, Col, Nav } from 'react-bootstrap';
import CityForm from './features/cities/CityForm';
import CitiesList from './features/cities/CitiesList';
import {
  selectCities,
  removeCity,
  fetchCityData,
  setCurrentCityData,
} from './features/cities/citiesSlice';
import { getLocation } from './utils/getLocation';
import { fetchWeatherByLocation } from './utils/fetchers';

const getLocationData = async () => {
  const { coords } = await getLocation();
  const { latitude, longitude } = coords;
  const cityData = await fetchWeatherByLocation(latitude, longitude);
  return cityData;
};

const App = () => {
  useEffect(() => {
    getLocationData().then((data) => dispatch(setCurrentCityData(data)));
  }, []);

  const cities = useSelector(selectCities);
  const dispatch = useDispatch();

  const handleRemoveCity = (cityName) => () => dispatch(removeCity(cityName));
  const handleAddCity = (cityName) => dispatch(fetchCityData(cityName));

  const { error, loading, weatherByName, currentCityData } = cities;

  return (
    <div className="App">
      <Navbar bg="light" className="justify-content-between">
        <Navbar.Brand>Weather App</Navbar.Brand>
        {currentCityData && (
          <Nav>
            {currentCityData.name}, {currentCityData.sys.country}
            <strong className="ml-2">{currentCityData.main.temp} °C</strong>
          </Nav>
        )}
      </Navbar>
      <Container>
        <Row className="pt-3">
          <Col>
            <CityForm
              error={error}
              loading={loading}
              onSubmit={handleAddCity}
            />
            <CitiesList
              weatherByName={weatherByName}
              handleDelete={handleRemoveCity}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
