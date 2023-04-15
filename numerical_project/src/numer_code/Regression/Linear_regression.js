import React, { useState } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import Plot from 'react-plotly.js';

const LinearRegression = () => {
  const [xValues, setXValues] = useState('1\n3\n5');
  const [yValues, setYValues] = useState('2\n4\n6');
  const [slope, setSlope] = useState(0);
  const [intercept, setIntercept] = useState(0);

  const parseData = () => {
    const xData = xValues.split('\n').map(parseFloat);
    const yData = yValues.split('\n').map(parseFloat);
    return xData.map((x, i) => [x, yData[i]]);
  };

  const calculateLinearRegression = () => {
    const parsedData = parseData();
    const n = parsedData.length;
    const sumX = parsedData.reduce((sum, pair) => sum + pair[0], 0);
    const sumY = parsedData.reduce((sum, pair) => sum + pair[1], 0);
    const sumXY = parsedData.reduce((sum, pair) => sum + pair[0] * pair[1], 0);
    const sumXX = parsedData.reduce((sum, pair) => sum + pair[0] * pair[0], 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    setSlope(slope);
    setIntercept(intercept);
  };

  return (
    <Container>
      <h1>Linear Regression</h1>
      <Form>
        <Form.Group>
          <Form.Label>X Values</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={xValues}
            onChange={(e) => setXValues(e.target.value)}
          />
          <Form.Label>Y Values</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={yValues}
            onChange={(e) => setYValues(e.target.value)}
          />
        </Form.Group>
        <Button onClick={calculateLinearRegression}>Calculate</Button>
      </Form>
      <Plot
        data={[
          {
            x: parseData().map((pair) => pair[0]),
            y: parseData().map((pair) => pair[1]),
            mode: 'markers',
            marker: { color: 'blue' },
            name: 'Data points',
          },
          {
            x: parseData().map((pair) => pair[0]),
            y: parseData().map((pair) => slope * pair[0] + intercept),
            mode: 'lines',
            line: { color: 'red' },
            name: 'Regression line',
          },
        ]}
        layout={{
          width: 800,
          height: 400,
          title: 'Linear Regression',
          xaxis: { title: 'X' },
          yaxis: { title: 'Y' },
        }}
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Slope (m)</td>
            <td>{slope.toFixed(4)}</td>
          </tr>
          <tr>
            <td>Intercept (b)</td>
            <td>{intercept.toFixed(4)}</td>
          </tr>
        </tbody>
        </Table>

     
    </Container>
  );
};

export default LinearRegression;


