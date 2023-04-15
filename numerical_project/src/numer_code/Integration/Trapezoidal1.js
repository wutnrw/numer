import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { evaluate, compile } from 'mathjs';
import Plot from 'react-plotly.js';

const TrapezoidalRuleSingleFile = () => {
  const [equation, setEquation] = useState('x * sin(x)');
  const [a, setA] = useState(0);
  const [b, setB] = useState(3.141592653589793);
  const [n, setN] = useState(8);
  const [result, setResult] = useState(null);

  const handleChangeEquation = (e) => {
    setEquation(e.target.value);
  };

  const handleChangeA = (e) => {
    setA(parseFloat(e.target.value));
  };

  const handleChangeB = (e) => {
    setB(parseFloat(e.target.value));
  };

  const handleChangeN = (e) => {
    setN(parseInt(e.target.value));
  };

  const [points, setPoints] = useState([]);

  const calculateTrapezoidal = () => {
    const fn = compile(equation);
    const h = (b - a) / n;
    let sum = 0;
    let newPoints = [];

    for (let i = 1; i < n; i++) {
      sum += fn.evaluate({ x: a + i * h });
    }
    sum += (fn.evaluate({ x: a }) + fn.evaluate({ x: b })) / 2;
    setResult(h * sum);

    for (let i = 0; i <= n; i++) {
      const x = a + i * h;
      const y = fn.evaluate({ x });
      newPoints.push([x, y]);
    }

    setPoints(newPoints);
  };

  return (
    <Container>
      <h1>Trapezoidal Rule</h1>
      <Form>
        <Form.Group>
          <Form.Label>Function f(x):</Form.Label>
          <Form.Control type="text" value={equation} onChange={handleChangeEquation} />
          <Form.Label>a:</Form.Label>
          <Form.Control type="number" value={a} onChange={handleChangeA} />
          <Form.Label>b:</Form.Label>
          <Form.Control type="number" value={b} onChange={handleChangeB} />
          <Form.Label>n:</Form.Label>
          <Form.Control type="number" value={n} onChange={handleChangeN} />
        </Form.Group>
        <Button variant="primary" onClick={calculateTrapezoidal}>
          Calculate
        </Button>
      </Form>
      {result !== null && (
        <div>
          <h3>Result</h3>
          <p>{result}</p>
        </div>
      )}
      {points.length > 0 && (
        <Plot
          data={[
            {
              x: points.map((point) => point[0]),
              y: points.map((point) => point[1]),
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'blue' },
            },
          ]}
          layout={{
            width: 800,
            height: 400,
            title: 'Trapezoidal Rule Graph',
            xaxis: { title: 'X' },
            yaxis: { title: 'f(X)' },
          }}
        />
      )}
    </Container>
  );
};

export default TrapezoidalRuleSingleFile;



