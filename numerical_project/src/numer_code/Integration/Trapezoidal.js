import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const TrapezoidalRule = () => {
  const [functionInput, setFunctionInput] = useState('x^2+2');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [n, setN] = useState('');
  const [x, setX] = useState('');
  const [result, setResult] = useState(null);

  const evaluateFunction = (func, xVal) => {
    return Function(`return (${func})`)(xVal);
  };

  const calculateTrapezoidal = () => {
    const func = functionInput;
    const aVal = parseFloat(a);
    const bVal = parseFloat(b);
    const nVal = parseInt(n, 10);
    const xVal = parseFloat(x);

    if (!func || isNaN(aVal) || isNaN(bVal) || isNaN(nVal) || isNaN(xVal)) return;

    const h = (bVal - aVal) / nVal;
    let sum = 0;

    for (let i = 1; i < nVal; i++) {
      sum += evaluateFunction(func, aVal + i * h, xVal);
    }

    const result = (h / 2) * (evaluateFunction(func, aVal, xVal) + 2 * sum + evaluateFunction(func, bVal, xVal));
    setResult(result);
  };

  return (
    <Container>
      <h1>Trapezoidal Rule</h1>
      <Form>
        <Form.Group>
          <Form.Label>Enter function f(x):</Form.Label>
          <Form.Control
            type="text"
            value={functionInput}
            onChange={(e) => setFunctionInput(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Enter a:</Form.Label>
          <Form.Control
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Enter b:</Form.Label>
          <Form.Control
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Enter n:</Form.Label>
          <Form.Control
            type="number"
            value={n}
            onChange={(e) => setN(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Enter x:</Form.Label>
          <Form.Control
            type="number"
            value={x}
            onChange={(e) => setX(e.target.value)}
          />
        </Form.Group>
        <Button onClick={calculateTrapezoidal}>
          Calculate
        </Button>
      </Form>
      <h2>Result</h2>
      <p>{result !== null ? `The result using the trapezoidal rule is ${result}` : 'No result yet'}</p>
    </Container>
  );
};

export default TrapezoidalRule;





