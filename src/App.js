import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Navbar } from 'react-bootstrap';
import CityForm from './features/cities/CityForm';
import { selectCities } from './features/cities/citiesSlice';

const App = () => {
  const cities = useSelector(selectCities);
  const { error, loading } = cities;
  return (
    <div className="App">
      <Navbar bg="light">
        <Navbar.Brand>Weather App</Navbar.Brand>
      </Navbar>
      <Container>
        <CityForm error={error} loading={loading} />
      </Container>
    </div>
  );
}

export default App;
