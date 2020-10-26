import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Form, Col, Button, Spinner } from 'react-bootstrap';
import { fetchWeatherData } from './citiesSlice';

const spinner = (
  <Spinner animation="border" size="sm" role="status">
    <span className="sr-only">Loading...</span>
  </Spinner>
);

const CityForm = ({ error, loading }) => {
  const [input, setInput] = useState('');
  
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(fetchWeatherData(input));
      unwrapResult(result);
      setInput('');
    } catch (err) {}
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const isInvalidCityName = error && error.code === '404';

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Col>
          <Form.Label>Enter city name you want to follow</Form.Label>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col className="col-10">
          <Form.Control
            type="text"
            required
            size="sm"
            value={input}
            placeholder="City name"
            onChange={handleChange}
            className={isInvalidCityName && 'is-invalid'}
          />
        </Col>
        <Col className="col-2">
          <Button
            variant="outline-secondary"
            size="sm"
            type="submit"
            disabled={input.length === 0 || loading !== 'idle'}
          >
            {loading === 'pending' ? spinner : 'Add City'}
          </Button>
        </Col>
      </Form.Row>
      {isInvalidCityName && (
        <Form.Row>
          <Col>
            <Form.Text className="text-danger text-truncate">
              City was not found
            </Form.Text>
          </Col>
        </Form.Row>
      )}
    </Form>
  );
};

export default CityForm;
