import React, { useState } from 'react';
import { Container, Form, Table, Button } from 'react-bootstrap';

const LagrangeInterpolation = () => {
  const [points, setPoints] = useState([]);
  const [newPoint, setNewPoint] = useState({ x: '', y: '' });
  const [valueX, setValueX] = useState('');
  const [result, setResult] = useState(null);

  const addPoint = () => {
    setPoints([...points, { x: parseFloat(newPoint.x), y: parseFloat(newPoint.y) }]);
    setNewPoint({ x: '', y: '' });
  };

  const calculateInterpolation = () => {
    const x = parseFloat(valueX);
    let sum = 0;
    const n = points.length;

    for (let i = 0; i < n; i++) {
      let product = 1;
      for (let j = 0; j < n; j++) {
        if (i !== j) {
          product *= (x - points[j].x) / (points[i].x - points[j].x);
        }
      }
      sum += product * points[i].y;
    }

    setResult(sum);
  };

  return (
    <Container>
      <h1>Lagrange Interpolation</h1>
      <Form>
        <Form.Group>
          <Form.Label>Enter x:</Form.Label>
          <Form.Control
            type="number"
            value={newPoint.x}
            onChange={(e) => setNewPoint({ ...newPoint, x: e.target.value })}
          />
          <Form.Label>Enter y:</Form.Label>
          <Form.Control
            type="number"
            value={newPoint.y}
            onChange={(e) => setNewPoint({ ...newPoint, y: e.target.value })}
          />
          <Button onClick={addPoint} className="mt-3">
            Add Point
          </Button>
        </Form.Group>
      </Form>
      <h2>Points</h2>
      <Table>
        <thead>
          <tr>
            <th>x</th>
            <th>y</th>
          </tr>
        </thead>
        <tbody>
          {points.map((point, index) => (
            <tr key={index}>
              <td>{point.x}</td>
              <td>{point.y}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Form.Group>
        <Form.Label>Enter value of x to interpolate:</Form.Label>
        <Form.Control
          type="number"
          value={valueX}
          onChange={(e) => setValueX(e.target.value)}
        />
      </Form.Group>
      <Button onClick={calculateInterpolation} className="mt-3">
        Calculate Interpolation
      </Button>
      <h2>Result</h2>
      <p>{result !== null ? `Interpolated value at x = ${valueX} is ${result}` : 'No result yet'}</p>
    </Container>
  );
};

export default LagrangeInterpolation;

