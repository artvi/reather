import React from 'react';
import { ListGroup, Row, Col } from 'react-bootstrap';

const CitiesList = ({ weatherByName, handleDelete }) => {
  const keys = Object.keys(weatherByName);

  return (
    <ListGroup className="w-100 pt-3">
      {keys.map((key) => {
        const data = weatherByName[key];
        const { id, name, sys } = data;
        return (
          <ListGroup.Item size="sm" className="py-1" id={id}>
            <Row>
              <Col>
                {name}, {sys.country}
              </Col>
              <Col className="col-auto">{data.main.temp} °C</Col>
              <Col className="col-auto">
                <button
                  type="button"
                  class="close"
                  onClick={handleDelete(name)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </Col>
            </Row>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default CitiesList;
