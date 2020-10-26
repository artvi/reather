import React from 'react';
import { ListGroup } from 'react-bootstrap';

const CitiesList = ({ weatherByName }) => {
  const keys = Object.keys(weatherByName);
  return (
    <ListGroup>
      {keys.map((key) => {
        const data = weatherByName[key];
        const { id, name } = data;
        return <ListGroup.Item size='sm' id={id}>{name}</ListGroup.Item>;
      })}
    </ListGroup>
  );
};

export default CitiesList;
