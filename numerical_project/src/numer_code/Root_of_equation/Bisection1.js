import React, { useState } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import { evaluate } from 'mathjs';
import Plot from 'react-plotly.js';

const BisectionMethod = () => {
  const [equation, setEquation] = useState('(x^4)-13');
  const [a, setA] = useState(0);
  const [b, setB] = useState(2);
  const [error, setError] = useState(0.00001);
  const [points, setPoints] = useState([]);

  const calculateBisection = () => {
    let newPoints = [];
    let aTemp = a;
    let bTemp = b;
    let c, fa, fb, fc;

    while (Math.abs(bTemp - aTemp) > error) {
      c = (aTemp + bTemp) / 2;
      fa = evaluate(equation, { x: aTemp });
      fb = evaluate(equation, { x: bTemp });
      fc = evaluate(equation, { x: c });

      if (fa * fc < 0) {
        bTemp = c;
      } else {
        aTemp = c;
      }

      newPoints.push({ x: aTemp, y: bTemp, c: c });
    }
    setPoints(newPoints);
  };

  const trueAnswer = points.length > 0 ? points[points.length - 1].c : '';

  return (
    <Container>
      <h1>Bisection Method</h1>
      <Form>
        <Form.Group>
          <Form.Label>Equation</Form.Label>
          <Form.Control
            type="text"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
          />
          <Form.Label>Interval A</Form.Label>
          <Form.Control
            type="number"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value))}
          />
          <Form.Label>Interval B</Form.Label>
          <Form.Control
            type="number"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value))}
          />
          <Form.Label>Error</Form.Label>
          <Form.Control
            type="number"
            value={error}
            onChange={(e) => setError(parseFloat(e.target.value))}
          />
        </Form.Group>
        <Button onClick={calculateBisection}>Calculate</Button>
      </Form>

      <h2>True Answer: {trueAnswer.toFixed(4)}</h2>

      <Plot
        data={[
          {
            x: points.map((point) => point.c),
            y: points.map((point, index) => index + 1),
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
          },
        ]}
        layout={{
          width: 800,      
          height: 400,
          title: 'Convergence of Bisection Method',
          xaxis: { title: 'Iteration' },
          yaxis: { title: 'x' },
        }}
      />
    
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Iteration</th>
            <th>A</th>
            <th>B</th>
            <th>C</th>
          </tr>
        </thead>
        <tbody>
          {points.map((point, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{point.x.toFixed(4)}</td>
              <td>{point.y.toFixed(4)}</td>
              <td>{point.c.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    );
  };
  
  export default BisectionMethod;

       



