import React, { useState } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import { evaluate } from 'mathjs';
import Plot from 'react-plotly.js';

const SecantMethod = () => {
  const [equation, setEquation] = useState('x^3 - x^2 - 1');
  const [x0, setX0] = useState(1);
  const [x1, setX1] = useState(2);
  const [error, setError] = useState(0.0001);
  const [points, setPoints] = useState([]);

  const calculateSecant = () => {
    let newPoints = [];
    let xPrev = x0;
    let xCurrent = x1;
    let xNew, fXPrev, fXCurrent;
    let iteration = 0;
    const maxIterations = 50;

    do {
      fXPrev = evaluate(equation, { x: xPrev });
      fXCurrent = evaluate(equation, { x: xCurrent });
      xNew = xCurrent - (fXCurrent * (xCurrent - xPrev)) / (fXCurrent - fXPrev);
      newPoints.push({ xPrev, xCurrent, fXPrev, fXCurrent, xNew });

      xPrev = xCurrent;
      xCurrent = xNew;
      iteration++;
    } while (Math.abs(xCurrent - xPrev) > error && iteration < maxIterations);

    setPoints(newPoints);
  };

  const trueAnswer = points.length > 0 ? points[points.length - 1].xNew : '';

  return (
    <Container>
      <h1>Secant Method</h1>
      <Form>
        <Form.Group>
          <Form.Label>Equation</Form.Label>
          <Form.Control
            type="text"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
          />
          <Form.Label>x0</Form.Label>
          <Form.Control
            type="number"
            value={x0}
            onChange={(e) => setX0(parseFloat(e.target.value))}
          />
          <Form.Label>x1</Form.Label>
          <Form.Control
            type="number"
            value={x1}
            onChange={(e) => setX1(parseFloat(e.target.value))}
          />
          <Form.Label>Error</Form.Label>
          <Form.Control
            type="number"
            value={error}
            onChange={(e) => setError(parseFloat(e.target.value))}
          />
        </Form.Group>
        <Button onClick={calculateSecant}>Calculate</Button>
      </Form>

      <h2>Answer: {trueAnswer !== '' ? trueAnswer.toFixed(4) : ''}</h2>

      <Plot
        data={[
          {
            x: points.map((point, index) => index + 1),
            y: points.map((point) => point.xNew),
            type: 'scatter',
            mode: 'lines+markers',
            name: 'xNew',
            marker: { color: 'red' },
          },
        ]}
        layout={{
          width: 800,
          height: 400,
          title: 'Convergence of Secant Method',
          xaxis: { title: 'Iteration' },
          yaxis: { title: 'xNew' },
        }}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Iteration</th>
            <th>xPrev</th>
            <th>xCurrent</th>
            <th>f(xPrev)</th>
            <th>f(xCurrent)</th>
            <th>xNew</th>
          </tr>
        </thead>
        <tbody>
          {points.map((point, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{point.xPrev.toFixed(4)}</td>
              <td>{point.xCurrent.toFixed(4)}</td>
              <td>{point.fXPrev.toFixed(4)}</td>
              <td>{point.fXCurrent.toFixed(4)}</td>
              <td>{point.xNew.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
export default SecantMethod;





