import React, { useState } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import { evaluate } from 'mathjs';
import Plot from 'react-plotly.js';

const FalsePosition = () => {
  const [equation, setEquation] = useState('x^3 - x^2 + 2');
  const [a, setA] = useState(-200);
  const [b, setB] = useState(300);
  const [iterations, setIterations] = useState(10);
  const [points, setPoints] = useState([]);

  const calculateFalsePosition = () => {
    let newPoints = [];
    let tempA = a;
    let tempB = b;
    let scope;
    let c, fa, fb, fc;

    for (let i = 0; i < iterations; i++) {
      scope = { x: tempA };
      fa = evaluate(equation, scope);
      scope = { x: tempB };
      fb = evaluate(equation, scope);

      c = (tempA * fb - tempB * fa) / (fb - fa);
      scope = { x: c };
      fc = evaluate(equation, scope);

      newPoints.push({ x: i + 1, y: c });

      if (fa * fc < 0) {
        tempB = c;
      } else if (fa * fc > 0) {
        tempA = c;
      } else {
        break;
      }
    }
    setPoints(newPoints);
  };

  return (
    <Container>
      <h1>False Position Method</h1>
      <Form>
        <Form.Group>
          <Form.Label>Equation</Form.Label>
          <Form.Control
            type="text"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
          />
          <Form.Label>XL</Form.Label>
          <Form.Control
            type="number"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value))}
          />
          <Form.Label>XR</Form.Label>
          <Form.Control
            type="number"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value))}
          />
          <Form.Label>Iterations</Form.Label>
          <Form.Control
            type="number"
            value={iterations}
            onChange={(e) => setIterations(parseInt(e.target.value))}
          />
        </Form.Group>
        <Button onClick={calculateFalsePosition}>Calculate</Button>
      </Form>

      <Plot
        data={[
          {
            x: points.map((point) => point.x),
            y: points.map((point) => point.y),
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
          },
        ]}
        layout={{
          width: 800,
          height: 400,
          title: 'Convergence of False Position Method',
          xaxis: { title: 'Iteration' },
          yaxis: { title: 'x' },
        }}
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Iteration</th>
            <th>x</th>
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
    </Container>
    );
  };
  export default FalsePosition;







           
