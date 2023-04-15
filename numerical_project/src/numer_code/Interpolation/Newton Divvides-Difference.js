import React, { useState } from 'react';
import { Container, Form, Table, Button } from 'react-bootstrap';

const NewtonDividedDifference = () => {
  const [points, setPoints] = useState([]);
  const [newPoint, setNewPoint] = useState({ x: '', y: '' });
  const [interpolationTable, setInterpolationTable] = useState([]);

  const addPoint = () => {
    setPoints([...points, { x: parseFloat(newPoint.x), y: parseFloat(newPoint.y) }]);
    setNewPoint({ x: '', y: '' });
  };

  const calculateDividedDifference = () => {
    const n = points.length;
    const tempTable = new Array(n).fill(0).map(() => new Array(n).fill(null));

    for (let i = 0; i < n; i++) {
      tempTable[i][0] = points[i].y;
    }

    for (let j = 1; j < n; j++) {
      for (let i = 0; i < n - j; i++) {
        tempTable[i][j] = (tempTable[i + 1][j - 1] - tempTable[i][j - 1]) / (points[i + j].x - points[i].x);
      }
    }

    setInterpolationTable(tempTable);
  };

  return (
    <Container>
      <h1>Newton's Divided Difference</h1>
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
      <Button onClick={calculateDividedDifference} className="mt-3">
        Calculate Divided Difference
      </Button>
      <h2>Interpolation Table</h2>
      <Table>
        <thead>
          <tr>
            {points.map((_, index) => (
              <th key={index}>f[{index}]</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {interpolationTable.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((value, colIndex) => (
                <td key={colIndex}>{value !== null ? value.toFixed(4) : ''}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default NewtonDividedDifference;
