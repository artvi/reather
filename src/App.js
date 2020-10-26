import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Navbar, Row, Col } from 'react-bootstrap';
import CityForm from './features/cities/CityForm';
import CitiesList from './features/cities/CitiesList';
import { selectCities, removeCity, fetchCityData } from './features/cities/citiesSlice';

const App = () => {
  const cities = useSelector(selectCities);
  const dispatch = useDispatch();

  const handleRemoveCity = (cityName) => () => dispatch(removeCity(cityName));
  const handleAddCity = (cityName) => dispatch(fetchCityData(cityName));

  const { error, loading, weatherByName } = cities;
  return (
    <div className="App">
      <Navbar bg="light">
        <Navbar.Brand>Weather App</Navbar.Brand>
      </Navbar>
      <Container>
        <Row className='pt-3'>
          <Col>
            <CityForm error={error} loading={loading} onSubmit={handleAddCity}/>
            <CitiesList weatherByName={weatherByName} handleDelete={handleRemoveCity} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
