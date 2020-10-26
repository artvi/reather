import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Navbar, Col } from 'react-bootstrap';
import CityForm from './features/cities/CityForm';
import CitiesList from './features/cities/CitiesList';
import { selectCities } from './features/cities/citiesSlice';

console.log(process.env.REACT_APP_OPENWEATHER_API_KEY)
const App = () => {
  const cities = useSelector(selectCities);
  const { error, loading, weatherByName } = cities;
  return (
    <div className="App">
      <Navbar bg="light">
        <Navbar.Brand>Weather App</Navbar.Brand>
      </Navbar>
      <Container>
        <CityForm error={error} loading={loading} />
        <Col className='col-10'>
        <CitiesList weatherByName={weatherByName} />
      </Col>
      </Container>
    </div>
  );
}

export default App;
