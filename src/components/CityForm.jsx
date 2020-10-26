import React, { useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { Form, Col, Button, Spinner } from 'react-bootstrap';

const spinner = (
  <Spinner animation="border" size="sm" role="status">
    <span className="sr-only">Loading...</span>
  </Spinner>
);

const CityForm = ({ error, loading, onSubmit }) => {
  const [input, setInput] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await onSubmit(input);
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
          <Form.Label className='text-wrap'>Enter city name you want to follow</Form.Label>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col>
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
        <Col className="col-auto">
          <Button
            className="ml-2 text-nowrap"
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
